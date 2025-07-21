import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // ConfigurableModuleBuilder.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/user-service'),
  ],
})
export class DatabaseModule {}
