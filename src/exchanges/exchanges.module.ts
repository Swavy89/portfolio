import { BinanceApiService } from './../binance_api/binance.api.service';
import { BinanceApiModule } from './../binance_api/binance.api.module';
import { ExchangeConnectionSchema, ExchangeConnection } from './../schemas/exchange.connection.schema';
import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeSchema, Exchange } from 'src/schemas/exchange.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name : Exchange.name , schema: ExchangeSchema},{ name : ExchangeConnection.name , schema: ExchangeConnectionSchema}]), HttpModule, BinanceApiModule],
  providers: [ExchangesService, BinanceApiService],
  controllers: [ExchangesController]
})
export class ExchangesModule {}
