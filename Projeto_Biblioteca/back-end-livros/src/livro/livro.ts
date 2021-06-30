import * as mongoose from 'mongoose';

export const LivroSchema = new mongoose.Schema(
    {
        id: {type: String, required: false},
        title: {type: String, required: true},
        author: {type: String, required: true},
        genre: {type: String, required: false},
        image: {type: String, required: false},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
    }
)

export interface Livro extends mongoose.Document {
    id: string;
    title: string;
    author: string;
    genre: string;
    image: string;
    user: string;

}