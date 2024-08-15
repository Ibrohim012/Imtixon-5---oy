import { IsOptional, IsString, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john_doe', description: 'Foydalanuvchining yangilangan username' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'NewP@ssw0rd!', description: 'Foydalanuvchining yangilangan paroli' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.FEMALE, description: 'Foydalanuvchining yangilangan jinsi' })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ enum: Role, example: Role.Admin, description: 'Foydalanuvchining yangilangan roli' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: '+123456789', description: 'Foydalanuvchining yangilangan telefon raqami' })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
