import { Module } from '@nestjs/common';
import { answerRepositry } from 'src/constants/entityRepositry';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@Module({
    controllers: [],
    providers: [
        {
        provide: answerRepositry,
        useValue: Answer,
        },
        AnswerService
    ],
    exports:[AnswerService]
})
export class AnswerModule {}
