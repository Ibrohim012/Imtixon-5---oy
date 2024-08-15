import { Controller, Post, Body, Request, UseGuards, Get, Query, ConflictException, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user details' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Details of the current user',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMe(@Request() req) {
    return this.authService.getMe(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password successfully changed',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async changePassword(
    @Req() req: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.id;
    return this.authService.changePassword(userId, updatePasswordDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Initiate forgot password process' })
  @ApiBody({
    description: 'User email to reset password',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset process initiated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async forgotPassword(@Body() body) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }

  @Post('verifypass')
  @ApiOperation({ summary: 'Verify and reset password' })
  @ApiBody({
    description: 'Password verification and reset details',
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        newPassword: { type: 'string' },
      },
    },
  })
  @ApiQuery({
    name: 'token',
    description: 'Password reset token',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Password successfully reset',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async verifyPassword(@Body() body, @Query() param) {
    const { password, newPassword } = body
    const { token } = param
    return this.authService.confirmPassword(token, password, newPassword);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify user email' })
  @ApiQuery({ name: 'token', description: 'Email verification token', type: 'string' })
  @ApiQuery({ name: 'email', description: 'User email', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    const { token, email } = verifyEmailDto;
    await this.authService.verifyEmail(token, email);
    return { message: 'Email verified successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('renew-tokens')
  @ApiOperation({ summary: 'Renew authentication tokens' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Tokens successfully renewed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async renewTokens(@Request() req) {
    return this.authService.renewTokens(req.user);
  }
}
