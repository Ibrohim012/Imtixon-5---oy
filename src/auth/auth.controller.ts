import { Controller, Post, Body, Request, UseGuards, Get, Query, ConflictException, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Admin } from 'typeorm';
import { Roles } from 'src/common/decorators/roles.decorator';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard) // Foydalanuvchini tekshirish uchun JWT guvardan foydalanamiz
  @Get('me')
  async getMe(@Request() req) {
    return this.authService.getMe(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() req: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.id;
    return this.authService.changePassword(userId, updatePasswordDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }

  @Post('verifypass')
  async verifyPassword(@Body() body, @Query() param) {
    const { password, newPassword } = body
    const { token } = param
    return this.authService.confirmPassword(token, password, newPassword);
  }


  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    const { token, email } = verifyEmailDto;
    await this.authService.verifyEmail(token, email);
    return { message: 'Email verified successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('renew-tokens')
  async renewTokens(@Request() req) {
    return this.authService.renewTokens(req.user);
  }
}
