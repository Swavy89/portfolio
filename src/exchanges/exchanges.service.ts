
// import * from CryptoJS as crypto;
import { ExchangeConnection, ExchangeConnectionDocument } from './../schemas/exchange.connection.schema';
import { ExchangeDocument } from './../schemas/exchange.schema';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange } from 'src/schemas/exchange.schema';
import { Model } from 'mongoose';
import { BinanceApiService } from './../binance_api/binance.api.service';


@Injectable()
export class ExchangesService {

    constructor(@InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
    @InjectModel(ExchangeConnection.name) private exchangeConnectionModel: Model<ExchangeConnectionDocument>,
    private httpService: HttpService, private binanceApiService: BinanceApiService) {}

    async create(exchange: any): Promise<Exchange> {
        const createdUser = new this.exchangeModel(exchange);    
        return createdUser.save();
    }

    async createConnection(exchange: any, connectionInfo: any) : Promise<ExchangeConnection> {
        const exchangeConnectionObj = {exchange: exchange, apiKey: connectionInfo.apiKey, secretKey: connectionInfo.secretKey}
        const createdConnection = new this.exchangeConnectionModel(exchangeConnectionObj);
        return createdConnection.save();
    }


    async findAll(): Promise<Exchange[]> {
        return this.exchangeModel.find().exec();
    }

    async findById(id): Promise<Exchange> {
        return this.exchangeModel.findById(id);
    }

    async getAccountWalletForExchange(exchangeConnectionId) {
        return this.exchangeConnectionModel.findById(exchangeConnectionId)
        .populate('exchange')
        .then(exchangeConnection => {
            return this.binanceApiService.getSpotAccountBalance(exchangeConnection);
        }, err => console.log('Apanhei erro: ', err));
    }


   

}
