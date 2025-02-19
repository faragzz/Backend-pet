import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UsersModule,
        MongooseModule.forRoot('mongodb://localhost/test')],
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
