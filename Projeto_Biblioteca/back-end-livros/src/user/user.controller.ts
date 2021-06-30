import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    //CREATE
    @Post()
    async creatUser( @Body() user: User ): Promise<any>{
        var result = await this.userService.createUser(user);
        return {id: result};
    }
    //READ

    @Get()
    readAllUsers(): Promise<any>{
        return this.userService.readUsers();
    }

    @Get(':id')
    readUserById(@Param('id') id:string): Promise<any>{
        return this.userService.readUserById(id);
    }

    //LOGIN
    @Post('/login')
    login(@Body() user:User): Promise<any>{
        return this.userService.login(user.username, user.password);
    }

}
