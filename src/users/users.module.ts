import { BinanceApiModule } from './../binance_api/binance.api.module';
import { ExchangesService } from './../exchanges/exchanges.service';
import { Exchange, ExchangeSchema } from './../schemas/exchange.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { Module, HttpModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { ExchangesModule } from 'src/exchanges/exchanges.module';
import { ExchangeConnection, ExchangeConnectionSchema } from 'src/schemas/exchange.connection.schema';

@Module({
  imports: [ExchangesModule,HttpModule,BinanceApiModule ,MongooseModule.forFeature([{ name : User.name , schema: UserSchema}, {name: Exchange.name, schema: ExchangeSchema}, ,{ name : ExchangeConnection.name , schema: ExchangeConnectionSchema}])],
  controllers: [UsersController],
  providers: [UsersService, ExchangesService],
  exports: [UsersService]
})
export class UsersModule {}
