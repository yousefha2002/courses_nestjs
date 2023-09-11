import { CourseService } from './../course/course.service';
import { Injectable,Inject} from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { HintBasic } from './dto/hint.dto';

@Injectable()
export class HintService {
    constructor(
        @Inject(hintRepositry)
        private HintRepositry : typeof Hint,
        private courseService :CourseService
    ){}

    async createHint(dto:HintBasic):Promise<Hint>
    {
        await this.courseService.checkCourse(dto.courseId)
        return this.HintRepositry.create({...dto})
    }
}