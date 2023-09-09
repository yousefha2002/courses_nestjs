import { IsDate, IsNotEmpty, Min, MinLength} from "class-validator";
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