import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { LoginDto, RegisterDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    console.log(dto);
    return this.authServiceService.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authServiceService.login(dto.email, dto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: { user: { userId: string } }) {
    return this.authServiceService.getProfile(req.user.userId);
  }
}
