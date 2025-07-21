// import { Injectable, OnModuleInit } from '@nestjs/common';

// @Injectable()
// export class DatabaseService implements OnModuleInit {
//   async onModuleInit() {
//     // This method can be used to perform any initialization logic
//     console.log('DatabaseService initialized');
//   }

//   connectDB(): string {
//     return 'Database connected successfully!';
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    const state = this.connection.readyState;

    const stateMessage = {
      0: '🔴 Disconnected',
      1: '🟢 Connected',
      2: '🟡 Connecting',
      3: '🔵 Disconnecting',
    };

    console.log(`DatabaseService initialized`);
    console.log(`MongoDB Connection Status: ${stateMessage[state]}`);
  }

  connectDB(): string {
    return 'Database connected successfully!';
  }
}
