import { BinanceApiModule } from './binance_api/binance.api.module';
import { ExchangesController } from './exchanges/exchanges.controller';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExchangesModule } from './exchanges/exchanges.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/sawm'), AuthModule, UsersModule, ExchangesModule, HttpModule, BinanceApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
