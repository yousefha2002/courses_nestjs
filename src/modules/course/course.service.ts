import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseBasic, CourseDayBasic } from './dto';
import { CategoryService } from '../category/category.service';
import { compareDates } from 'src/common/util/compareDates';
import { DayService } from '../day/day.service';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class CourseService {
    constructor(
        @Inject(courseRepositry)
        private CourseRepositry: typeof Course,

        private categoryService : CategoryService,
        private dayService : DayService,
        private lessonService : LessonService
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

    async addCourseDay(dto:CourseDayBasic):Promise<{message:string}>
    {
        const {courseId,dayId} = dto
        const [course,day] = await Promise.all([
            this.checkCourse(courseId),
            this.dayService.checkDay(dayId)
        ])
        const existingDays = await course.$get('days', {where: {id: dayId}});
        if (existingDays.length > 0) {
            throw new BadRequestException('Day has already been added to the course');
        }
        await course.$add('day',day,{through:{...dto}})

        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);
        // Generate lessons for selected days (e.g., Sunday and Monday)
        while (startDate <= endDate) {
            if (startDate.toLocaleDateString('en-US', { weekday: 'long' }) === day.title) {
                await this.lessonService.createLesson(courseId,startDate);
            }
            startDate.setDate(startDate.getDate() + 1); // Move to the next day
        }
        return {message:"day has been added to course"}
    }

    async checkCourse(id:number)
    {
        const course = await this.CourseRepositry.findByPk(id)
        if(!course)
        {
            throw new BadRequestException('course is not found')
        }
        return course
    }
}
