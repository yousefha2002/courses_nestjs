import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { QuizBasic } from './dto';
import { User } from 'src/common/decorator/user.decorator';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Post('create')
    createQuiz(@Body() dto:QuizBasic)
    {
        return this.quizService.createQuiz(dto)
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard)
    @Get(':quizId')
    findQuiz(@Param('quizId') quizId:number,@User() user:any)
    {
        return this.quizService.getQuiz(quizId,user.userId)
    }
}
