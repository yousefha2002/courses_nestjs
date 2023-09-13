import { Body, Controller, Post, UseGuards,Param,Get} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { QuestionBasic } from './dto';
import { User } from 'src/common/decorator/user.decorator';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Post('create')
    createQuestion(@Body() dto:QuestionBasic)
    {
        return this.questionService.createQuestion(dto)
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard)
    @Get(':quizId')
    findQuestions(@Param('quizId') quizId:number,@User() user:any)
    {
        return this.questionService.getQuizQuestions(quizId,user.userId)
    }
}