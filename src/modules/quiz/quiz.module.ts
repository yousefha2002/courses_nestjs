import { Module } from '@nestjs/common';
import { quizRepositry } from 'src/constants/entityRepositry';
import { Quiz } from './quiz.entity';
import { CourseModule } from '../course/course.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { StudentCourseModule } from '../studentCourse/studentCourse.module';

@Module({
  controllers: [QuizController],
  providers: [
    {
      provide: quizRepositry,
      useValue: Quiz,
    },
    QuizService
  ],
  imports:[CourseModule,StudentCourseModule],
  exports:[QuizService]
})
export class QuizModule {}
