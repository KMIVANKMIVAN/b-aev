import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  newEndpoint(): string {
    return 'SOY NUEVO ENDPOINT';
  }
}
