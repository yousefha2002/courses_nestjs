import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { QuestionBasic } from './dto';

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
}