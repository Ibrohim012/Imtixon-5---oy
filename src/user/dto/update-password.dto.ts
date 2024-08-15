import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'OldP@ssw0rd', description: 'Eski parol' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'NewP@ssw0rd!', description: 'Yangi parol' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  newPassword: string;
}
