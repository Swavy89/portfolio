import { LoginUserDto } from './../dto/login-user-dto';
import { ExchangesService } from './../exchanges/exchanges.service';
import { ExchangeConnection, ExchangeConnectionDocument } from './../schemas/exchange.connection.schema';
import { ExchangeDocument, Exchange } from './../schemas/exchange.schema';
import { Model } from 'mongoose';
import { Injectable} from '@nestjs/common';
import {User, UserDocument} from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './../dto/create-user.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
     @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
          private exchangesService: ExchangesService) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);    
        return createdUser.save();
    }

    async login(userDto: LoginUserDto) : Promise<any[]> {
        return this.userModel.find({email: userDto.email, password: userDto.password})
        //.populate('exchangeConnections')
        .populate({
            path: 'exchangeConnections',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'exchange' }})
        //.populate({ path: 'exchangeConnections', select: 'exchanges' })
        .then(r => {
            console.log('Query returned: ', r);
            return r;
        })
    }    


    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(username: string) : Promise<User> {
        return this.userModel.findOne({'username' : username}).exec();
    }



    async findById(id: string) : Promise<User> {
        return (await this.userModel.findById(id)).execPopulate();
    }

    async findConnectionsForUser(id: string) {
        return this.userModel.findById(id)
        .populate({path: 'exchangeConnections',
        populate:{
            path: 'exchange',
            model: 'Exchange'
        }})
        .exec();
    }




    async connectUserToExchange(userId: string, exchangeConnectionInfo: any) {
        console.log('Recebi exchangeinfo: ', exchangeConnectionInfo);
        this.exchangeModel.findById(exchangeConnectionInfo.exchange).then(exchange=>{
            console.log('Encontrei exchange: ', exchange);
            try{
                this.userModel.findById(userId).then(async user => {
                    try{
                        let newConnection = await this.exchangesService.createConnection(exchange,exchangeConnectionInfo);
                        user.exchangeConnections.push(newConnection);
                        user.save();
                        return user;
                    }catch(err) {
                        console.log('Erro: ', err);
                    }
                   
                });
            }
            catch(err) {
                throwError(err);
            }
            
        })
        
    }

    async removeExchange(userId: string, exchangeId: string) {

        return this.userModel.findByIdAndUpdate(userId, 
            {$pull: {exchangeConnections: exchangeId}},
            {new: true});
       
    }


}
