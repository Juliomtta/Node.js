import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    // C - CREATE
    async createUser(user: User){
        const userModel = new this.userModel(
            {
                username: user.username,
                password: user.password,
                livro: user.livro
            }
        );
        const result = await userModel.save();
        return result.id;
    }

    // R - READ
    async readUsers(){
        const user = await this.userModel.find().exec();
        return user.map(user =>({
            id: user._id,
            username: user.username,
            password: user.password,
            livro: user.livro
        }) );
    }

    async readUserById(id: string): Promise<any>{
        const user = await this.userModel.findOne({_id: id});
        if(!user){
            throw new NotFoundException('User not found. check the ID')
        }
        return {
            id: user._id,
            username: user.username,
            password: user.password,
            livro: user.livro
        }
    }

    async login(username:string, password: string){
        const user = await this.userModel.findOne({username: username});
        if(!user){
            throw new NotFoundException('User not found. check the ID')
        }
        if(user.password == password){
            return user._id;
        }else{
            return null;
        }

    }
}
