import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { QuizBasic } from './dto';

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
}
