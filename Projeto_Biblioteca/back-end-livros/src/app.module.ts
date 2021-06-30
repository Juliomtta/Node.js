import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivroModule } from './livro/livro.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LivroSchema } from './livro/livro';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/user';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://julio:8ZkTxegcLROnyL2G@livro.4n6lq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    LivroModule,
    MongooseModule.forFeature([{name: 'Livro', schema: LivroSchema}]),
    UserModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


