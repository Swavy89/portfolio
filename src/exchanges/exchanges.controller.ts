import { ExchangeConnection } from './../schemas/exchange.connection.schema';
import { ExchangesService } from './exchanges.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Exchange } from 'src/schemas/exchange.schema';

@Controller('exchanges')
export class ExchangesController {

    constructor(private exchangesService: ExchangesService){}


    @Get()
    async getExchanges() : Promise<Exchange[]> {
        return this.exchangesService.findAll();
    }

    



    @Get('wallet/:connectionId')
    async getAccountBalanceForConnection(@Param('connectionId') connectionId : string) : Promise<any> {
        return this.exchangesService.getAccountWalletForExchange(connectionId);
    }


}
