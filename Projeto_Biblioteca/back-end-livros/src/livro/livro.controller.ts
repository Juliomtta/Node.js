import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Livro } from './livro';
import { LivroService } from './livro.service';

@Controller('livro')
export class LivroController {

    constructor(private readonly livroService: LivroService){}

    @Get()
    readAllLivro(): Promise<any>{
        return this.livroService.readLivro();
    }

    @Get(':id')
    readLivroByUser( @Param('id') id:string){
        return this.livroService.readLivroByUser(id);
    }


    @Post()
    async creatLivro( @Body() livro: Livro ): Promise<any>{
        var result = await this.livroService.createLivro(livro);
        return {id: result};
    }

    //Update

    @Patch()
    async updateLivro( @Body() livro: Livro) : Promise<any>{
        return await this.livroService.updateLivro(livro);
    }

    // Delete

    @Delete(':id')
    async deleteTaskById( @Param('id') id: string){
        await this.livroService.deleteLivro(id);
    }


    


}
