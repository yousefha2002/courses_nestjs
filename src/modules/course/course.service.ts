import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseBasic, CourseDayBasic } from './dto';
import { CategoryService } from '../category/category.service';
import { compareDates } from 'src/common/util/compareDates';
import { DayService } from '../day/day.service';
import { LessonService } from '../lesson/lesson.service';
import { Sequelize } from 'sequelize';

@Injectable()
export class CourseService {
    constructor(
        @Inject(courseRepositry)
        private CourseRepositry: typeof Course,

        private categoryService : CategoryService,
        private dayService : DayService,
        private lessonService : LessonService,
        
        @Inject('SEQUELIZE')
        private sequelize : Sequelize
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

    async addCourseDay(dto: CourseDayBasic): Promise<{ message: string }> {
        const { courseId, dayId } = dto;
        const [course, day] = await Promise.all([
            this.checkCourse(courseId),
            this.dayService.checkDay(dayId),
        ]);
        const existingDays = await course.$get('days', { where: { id: dayId }});
        if (existingDays.length > 0) {
            throw new BadRequestException('Day has already been added to the course');
        }
        const transaction = await this.sequelize.transaction()
        try {
            await course.$add('day', day, { through: { ...dto }, transaction });
            const startDate = new Date(course.startDate);
            const endDate = new Date(course.endDate);
    
            while (startDate <= endDate) {
                if (startDate.toLocaleDateString('en-US', { weekday: 'long' }) === day.title) {
                    await this.lessonService.createLesson(courseId, startDate, { transaction });
                }
                startDate.setDate(startDate.getDate() + 1);
            }
    
            await transaction.commit();
    
            return { message: 'Day has been added to the course' };
        } catch (error) {
            // If an error occurs, rollback the transaction
            await transaction.rollback();
    
            // Handle the error here, you can log it or take other actions as needed
            console.error('Error adding day to course:', error);
    
            throw error; // Optionally rethrow the error to propagate it further if needed
        }
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
