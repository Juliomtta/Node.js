import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { LivroSchema } from './livro';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Livro', schema: LivroSchema}])
    ],
  controllers: [LivroController],
  providers: [LivroService]
})
export class LivroModule {}
