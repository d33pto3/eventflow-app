import { SERVICES_PORTS } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  private readonly eventServiceUrl = `http://localhost:${SERVICES_PORTS.EVENTS_SERVICE}`;

  constructor(private readonly httpService: HttpService) { }

  async create(data: object, userId: string, userRole: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.eventServiceUrl}/create`, data, {
          headers: { 'x-user-id': userId, 'x-user-role': userRole },
        }),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.eventServiceUrl),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async findMyEvents(userId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}/my-events`),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}/${id}`),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async update(id: string, data: object, userId: string, userRole: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.eventServiceUrl}/${id}`, data, {
          headers: { 'x-user-id': userId, 'x-user-role': userRole },
        }),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async publish(id: string, userId: string, userRole: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.eventServiceUrl}/${id}/publish`,
          {},
          {
            headers: { 'x-user-id': userId, 'x-user-role': userRole },
          },
        ),
      );

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async cancel(id: string, userId: string, userRole: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.eventServiceUrl}/${id}/cancel`,
          {},
          {
            headers: { 'x-user-id': userId, 'x-user-role': userRole },
          },
        ),
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
