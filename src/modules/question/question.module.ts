import { Module } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuizModule } from '../quiz/quiz.module';
import { AnswerModule } from '../answer/answer.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [QuestionController],
    providers: [
        {
        provide: questionRepositry,
        useValue: Question,
        },
        QuestionService
    ],
    imports:[QuizModule,AnswerModule,DatabaseModule]
})
export class QuestionModule {}
