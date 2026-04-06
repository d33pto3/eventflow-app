import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SERVICES_PORTS } from '@app/common';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `http://localhost:${SERVICES_PORTS.AUTH_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async register(data: { email: string; password: string; name: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/register`, data),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/login`, data),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getProfile(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/profile`, {
          headers: {
            Authorization: token,
          },
        }),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(error: any): never {
    const err = error as {
      response?: { data: string | object; status: number };
    };

    if (err.response) {
      throw new HttpException(err.response.data, err.response.status);
    }

    throw new HttpException('Something went wrong', 503);
  }
}
