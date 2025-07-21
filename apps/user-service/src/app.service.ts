import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  connectDB(): string {
    return 'Hello World!';
  }
}
