import * as mongoose from 'mongoose';
import { Livro } from 'src/livro/livro';


export const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        livros: [
            {type: mongoose.Schema.Types.ObjectId, ref:'Livro'}
        ]
    }
)

export interface User extends mongoose.Document {
    username: string;
    password: string;
    livro: [Livro]
}