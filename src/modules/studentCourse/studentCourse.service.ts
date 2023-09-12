import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { studentCourseRepositry } from 'src/constants/entityRepositry';
import { StudentCourse } from './studentCourse.entity';

@Injectable()
export class StudentCourseService {
    constructor(
        @Inject(studentCourseRepositry)
        private StudentCourseRepositry: typeof StudentCourse,
    ) {}

    async isStudentRegister(courseId:number,studentId:number)
    {
        const registerCourse = await this.StudentCourseRepositry.findOne({where:{courseId,studentId}})
        if(!registerCourse)
        {
            throw new BadRequestException('you are not regitsered in course')
        }
        return ;
    }
}
