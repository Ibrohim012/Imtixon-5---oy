import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('users')
@ApiBearerAuth() // JWT autentifikatsiya
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 403, description: 'Ruxsat etilmagan.' })
  @Roles(Role.Admin, Role.Superadmin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Foydalanuvchilar ro\'yxatini olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli olingan.' })
  @ApiResponse({ status: 403, description: 'Ruxsat etilmagan.' })
  @Roles(Role.Admin, Role.Superadmin)
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli olingan.' })
  @ApiResponse({ status: 403, description: 'Ruxsat etilmagan.' })
  @Roles(Role.Admin)
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Foydalanuvchini ID orqali olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli olingan.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi IDsi' })
  @Roles(Role.Admin, Role.Superadmin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi IDsi' })
  @ApiBody({ type: UpdateUserDto, description: 'Yangilangan foydalanuvchi ma\'lumotlari' })
  @Roles(Role.Admin, Role.Superadmin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'Foydalanuvchining rolini yangilash' })
  @ApiResponse({ status: 200, description: 'Rol muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi IDsi' })
  @ApiBody({ schema: { type: 'object', properties: { role: { type: 'string', example: 'admin' } } } })
  @Roles(Role.Admin)
  async updateUserRole(@Param('id') userId: string, @Body('role') role: Role) {
    return this.userService.updateUserRole(userId, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Foydalanuvchini o\'chirish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi muvaffaqiyatli o\'chirildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi IDsi' })
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
