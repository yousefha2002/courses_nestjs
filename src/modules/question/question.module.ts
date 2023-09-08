import { Module } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';

@Module({
    controllers: [],
    providers: [
        {
        provide: questionRepositry,
        useValue: Question,
        },
    ],
})
export class QuestionModule {}
