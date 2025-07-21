import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.usersService.findAll(req.user);
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: string,
    @Request() req,
  ) {
    return this.usersService.updateRole(+id, role, req.user);
  }
}
