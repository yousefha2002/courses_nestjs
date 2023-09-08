import { Module } from '@nestjs/common';
import { studentQuizRepositry } from 'src/constants/entityRepositry';
import { StudentQuiz } from './studentQuiz.entity';

@Module({
    controllers: [],
    providers: [
        {
        provide: studentQuizRepositry,
        useValue: StudentQuiz,
        },
    ],
})
export class StudentQuizModule {}
