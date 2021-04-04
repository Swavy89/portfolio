import { LoginUserDto } from './../dto/login-user-dto';
import { CreateUserDto } from './../dto/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Post, Get, Body, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import {User, UserDocument} from '../schemas/user.schema';
import {Response} from 'express';
import ExchangeConnectionDto from 'src/dto/exchange-connection-info.dto';
import { ExchangeConnection } from 'src/schemas/exchange.connection.schema';



@Controller('users')
export class UsersController {

constructor(private usersService : UsersService){}

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }


    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.create(createUserDto);
    }


    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) res : Response): any {
      return this.usersService.login(loginUserDto).then(r => {
        console.log('No controller recebi: ', r);
        if(r.length > 0) {
          res.status(HttpStatus.OK);
          return r;
        } else {
          res.status(HttpStatus.UNAUTHORIZED);
          return 'Email - password combination does not exist in the database';
        }
      })
    }


    @Post(':id/connectToExchange')
    async connectExchange(@Param('id') id: string,@Body() exchangeConnectionInfo: ExchangeConnectionDto) {
      console.log('ExchangeInfo: ', exchangeConnectionInfo);
      return this.usersService.connectUserToExchange(id, exchangeConnectionInfo).then(r=> 'New exchange associated', err => 'Error: ' + err);
    }

    @Delete(':id/removeConnection/:connectionId')
    async removeExchange(@Param('id') id: string, @Param('connectionId') connectionId: string) {

      return this.usersService.removeExchange(id,connectionId);
    }

    @Get(':id/connections')
    async getExchangeConnectionsForUser(@Param('id') id: string)  {
        return this.usersService.findConnectionsForUser(id);
    }



}
