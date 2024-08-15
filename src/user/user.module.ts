import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service'; 

@Module({
  imports: [], 
  providers: [UserService, PrismaService, JwtService, EmailService],
  exports: [UserService],
})
export class UserModule {}
