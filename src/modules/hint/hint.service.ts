import { CourseService } from './../course/course.service';
import { Injectable,Inject} from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { HintBasic } from './dto/hint.dto';
import { StudentCourseService } from '../studentCourse/studentCourse.service';

@Injectable()
export class HintService {
    constructor(
        @Inject(hintRepositry)
        private HintRepositry : typeof Hint,
        private courseService :CourseService,
        private studentCourseSerivce : StudentCourseService
    ){}

    async createHint(dto:HintBasic):Promise<Hint>
    {
        await this.courseService.checkCourse(dto.courseId)
        return this.HintRepositry.create({...dto})
    }

    async getHints(userId:number,courseId:number):Promise<Hint[]>
    {
        await this.studentCourseSerivce.isStudentRegister(courseId,userId)
        return this.HintRepositry.findAll({where:{courseId}})
    }
}