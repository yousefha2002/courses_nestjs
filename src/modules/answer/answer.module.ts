import { Module } from '@nestjs/common';
import { answerRepositry } from 'src/constants/entityRepositry';

@Module({
    controllers: [],
    providers: [
        {
        provide: answerRepositry,
        useValue: AnswerModule,
        },
    ],
})
export class AnswerModule {}
