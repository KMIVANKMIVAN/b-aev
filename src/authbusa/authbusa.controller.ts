import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthBusaGuard } from './authbusa.guard';
import { AuthbusaService } from './authbusa.service';

@Controller('authbusa')
export class AuthbusaController {
  constructor(private readonly authbusaService: AuthbusaService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authbusaService.signIn(signInDto.ci, signInDto.contrasenia);
  }

  @UseGuards(AuthBusaGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
