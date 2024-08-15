import { IsEmail, IsString, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchining email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+123456789', description: 'Foydalanuvchining telefon raqami' })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: 'john_doe', description: 'Foydalanuvchining username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'Foydalanuvchining paroli' })
  @IsString()
  password: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE, description: 'Foydalanuvchining jinsi' })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ enum: Role, example: Role.User, description: 'Foydalanuvchining roli' })
  @IsEnum(Role)
  role: Role;
}
