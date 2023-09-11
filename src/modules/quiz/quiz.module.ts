import { Module } from '@nestjs/common';
import { quizRepositry } from 'src/constants/entityRepositry';
import { Quiz } from './quiz.entity';
import { CourseModule } from '../course/course.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  controllers: [QuizController],
  providers: [
    {
      provide: quizRepositry,
      useValue: Quiz,
    },
    QuizService
  ],
  imports:[CourseModule],
  exports:[QuizService]
})
export class QuizModule {}
