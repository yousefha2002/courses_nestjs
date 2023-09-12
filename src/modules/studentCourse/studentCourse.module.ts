import { Module } from '@nestjs/common';
import { studentCourseRepositry } from 'src/constants/entityRepositry';
import { StudentCourse } from './studentCourse.entity';
import { StudentCourseService } from './studentCourse.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: studentCourseRepositry,
      useValue: StudentCourse,
    },
    StudentCourseService
  ],
  exports:[StudentCourseService]
})
export class StudentCourseModule {}
