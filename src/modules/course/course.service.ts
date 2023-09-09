import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseBasic } from './dto';
import { CategoryService } from '../category/category.service';
import { compareDates } from 'src/common/util/compareDates';

@Injectable()
export class CourseService {
    constructor(
        @Inject(courseRepositry)
        private CourseRepositry: typeof Course,

        private categoryService : CategoryService
    ) {}

    async createCourse(dto:CourseBasic):Promise<{message:string}>
    {
        if(!compareDates(dto.endDate,dto.startDate))
        {
            throw new BadRequestException('end date shoud be greater than start date')
        }
        await this.categoryService.checkCategory(dto.categoryId)
        await this.CourseRepositry.create({...dto})
        return {message:"course has been created"}
    }
}
