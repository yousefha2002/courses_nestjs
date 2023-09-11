import { Module } from '@nestjs/common';
import { studentRepositry } from 'src/constants/entityRepositry';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './studend.service';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [StudentController],
  providers: [
    {
      provide: studentRepositry,
      useValue: Student,
    },
    StudentService
  ],
  imports:[CourseModule]
})
export class StudentModule {}
