import { DatabaseService } from './database.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ], //  ConfigModule.forRoot({isGlobal: true}) this is makes config available in the whole app
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
