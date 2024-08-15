  import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UserService } from '../user/user.service';
  import { User } from 'src/user/entities/user.entity';
  import * as bcrypt from 'bcryptjs';
  import { CreateUserDto } from 'src/user/dto/create-user.dto';
  import { ConfigService } from '@nestjs/config';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { EmailService } from 'src/email/email.service';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';

  @Injectable()
  export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private userService: UserService,
      private jwtService: JwtService,
      private emailService: EmailService,
      private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async register(createUserDto: CreateUserDto) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const token = await this.generateVerificationToken(createUserDto.email);
    
      // `emailVerificationTokenExpires` uchun `Date` obyekti yarating
      const emailVerificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 soat
    
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          emailVerificationToken: token,
          emailVerificationTokenExpires: emailVerificationTokenExpires,
          password: hashedPassword,
          isActive: false, 
        },
      });
    
      await this.emailService.sendVerificationEmail(user.email, token);
    
      return {
        message: 'You have successfully signed up. Please check your email for verification instructions.',
        username: user.username,
        email: user.email,
      };
    }
    

    async login(user: any) {
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }

    async resetPassword(email: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<string> {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        throw new Error("Invalid Password");
      }
      if (newPassword !== confirmNewPassword) {
        throw new Error("Passwords not matched.")
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(user.id, hashedPassword); // Update here
      return "Password updated";
    }

    async refresh(refreshToken: string) {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      return this.login(user);
    }

    async confirmPassword(token: string, password: string, newPassword: string): Promise<string> {
      const { email } = this.jwtService.verify(token)
      const existingEmail = await this.userService.findByEmail(email);
      if (!existingEmail) {
        throw new ConflictException("Email doesn't exist");
      }
      if (password !== newPassword) {
        throw new Error("Password didn't match. Try again.");
      }
      await this.userService.confirmPassword(email, (await bcrypt.hash(password, 10)));
      return "Password updated";
    }

    async findUserById(id: string): Promise<User> {
      return this.userService.findById(id);
    }

    async generateVerificationToken(email: string): Promise<string> {
      const payload = { email };
      const token = this.jwtService.sign(payload, { expiresIn: '1h' }); 
      return token;
    }

    async forgotPassword(email: string): Promise<string> {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      const token = this.jwtService.sign({ email }, { expiresIn: '10m' });
      await this.emailService.sendVerificationEmailForgotPass(user.email, token);
      return token;
    }

    async verifyEmail(token: string, email: string): Promise<void> {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid token or email');
      }
    
      if (user.emailVerificationToken !== token) {
        throw new UnauthorizedException('Invalid token or email');
      }
    
      const tokenExpiresDate = new Date(user.emailVerificationTokenExpires);
      if (new Date() > tokenExpiresDate) {
        throw new UnauthorizedException('Verification token expired');
      }
    
      await this.prisma.user.update({
        where: { email },
        data: {
          emailVerificationToken: null,
          emailVerificationTokenExpires: null,
          emailVerified: true,
        },
      });
    }
    
    async getMe(userId: string): Promise<Omit<User, 'password'>> {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const { password, ...userData } = user;
      return userData as Omit<User, 'password'>;
    }
    
    
    async verifyAndConfirmEmail(token: string): Promise<string> {
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });

        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
          throw new ConflictException('User not found');
        }
        if (user.emailVerificationToken !== token) {
          throw new ConflictException('Invalid or expired verification token');
        }
        if (new Date() > new Date(user.emailVerificationTokenExpires)) {
          throw new ConflictException('Verification token expired');
        }

        await this.prisma.user.update({
          where: { email: payload.email },
          data: {
            emailVerificationToken: null,
            emailVerificationTokenExpires: null,
            isActive: true, // Activate the user
          },
        });

        return "Your account has been confirmed and activated.";
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired verification token');
      }
    }

    async verifyEmailToken(token: string): Promise<string | null> {
      try {
        const { email } = this.jwtService.verify(token);
        return email;
      } catch (error) {
        return null;
      }
    }

    async changePassword(
      userId: string,
      updatePasswordDto: UpdatePasswordDto,
    ): Promise<string> {  // 'void' o'rniga 'string' qaytarish turi
      const { oldPassword, newPassword } = updatePasswordDto;
    
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new BadRequestException('Old password is incorrect');
      }
    
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(userId, { newPassword: hashedPassword, oldPassword: '' });

      return "Password updated";  // endi bu return turi mos keladi
    }
    
  

    async renewTokens(user: any) {
      const payload = { full_name: user.full_name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }

    async logout(refreshToken: string): Promise<void> {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      if (user) {
      }
    }
  }
