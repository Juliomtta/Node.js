import { Injectable, NotFoundException } from '@nestjs/common';
import { Livro } from './livro';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LivroService {
    constructor(@InjectModel('Livro') private readonly livroModel: Model<Livro>){}

     // C - CREATE
     async createLivro(livro: Livro){
        const livroModel = new this.livroModel(
            {
                title: livro.title,
                author: livro.author,
                genre: livro.genre,
                image: livro.image,
                user: livro.user

            }
        );
        const result = await livroModel.save();
        return result.id;
    }

    // R - READ
    async readLivro(){
        const livro = await this.livroModel.find().exec();
        return livro.map(livro =>({
            id: livro._id,
            title: livro.title,
            author: livro.author,
            genre: livro.genre,
            image: livro.image,
            user: livro.user
        }) );
    }

    async readLivroByUser(userID:string){
        const livro = await this.livroModel.find({user: userID}).exec();
        return livro.map(livro =>({
            id: livro._id,
            title: livro.title,
            author: livro.author,
            genre: livro.genre,
            image: livro.image,
            user: livro.user
        }) );
    }

    async readLivroById(id: string): Promise<any>{
        const livro = await this.livroModel.findOne({_id: id});
        if(!livro){
            throw new NotFoundException('Book not found. check the ID')
        }
        return {
            id: livro._id,
            title: livro.title,
            author: livro.author,
            genre: livro.genre,
            image: livro.image,
            user: livro.user
        }
    }

    // U - UPDATE
    async updateLivro(livro: Livro){
        const livro_old  = await this.livroModel.findOne({_id: livro._id});
        if(!livro_old){
            throw new NotFoundException('Book not found. check the ID')
        }
        if(livro.title != null){
            livro_old.title = livro.title;
        }
        if(livro.author != null){
            livro_old.author = livro.author;
        }
        if(livro.genre != null){
            livro_old.genre = livro.genre;
        }
        if(livro.image != null){
            livro_old.image = livro.image;
        }
        if(livro.user != null){
            livro_old.user = livro.user;
        }
        livro_old.save();
        return{
            id: livro_old._id,
            title: livro_old.title,
            author: livro_old.author,
            genre: livro_old.genre,
            image: livro_old.image,
            user: livro_old.user
        }

    }

     // D- DELETE
     async deleteLivro(id: string){
        const result = await this.livroModel.deleteOne({_id: id}).exec();
        if(!result){
            throw new NotFoundException('Could not delete Book, check the id!')
        }
        
    }



}
