import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
import { PostsModule } from './posts/posts.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule,
    MongooseModule.forRoot(process.env.NODE_ENV === 'development'
      ? 'mongodb://localhost/test'
      : process.env.MANGODB_CONNECTION_STRING ?? (() => {
      throw new Error('MONGODB_CONNECTION_STRING is not defined!');
    })()),
    EmailModule,
    PostsModule,
    PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

// when integrating with typeOrm only support basic stuff and doesn't have a good support to mangodb
// TypeOrmModule.forRoot({
//     type: 'mongodb',
//     url: 'mongodb://localhost/nest',
//     synchronize: true,
//     logging: true,
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
// })],
