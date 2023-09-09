import { IsDate, IsNotEmpty, Matches, Min, MinLength} from "class-validator";
import {Transform} from 'class-transformer'

export class CourseBasic {
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    title:string

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @MinLength(8)
    description:string

    @IsNotEmpty()
    categoryId:number

    @IsNotEmpty()
    @Min(1)
    price:number

    @IsNotEmpty()
    @Min(1)
    maxStudents:number

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    endDate: Date;
}

export class CourseDayBasic {
    @IsNotEmpty()
    courseId:number

    @IsNotEmpty()
    dayId:number

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9])$/)
    startHour:string

    @IsNotEmpty()
    @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9])$/)
    endHour:string
}