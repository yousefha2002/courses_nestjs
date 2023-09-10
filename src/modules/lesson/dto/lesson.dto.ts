import { IsNotEmpty, IsUrl, MinLength } from "class-validator";

export class LessonBasic {
    @IsNotEmpty()
    id:number

    @IsNotEmpty()
    @IsUrl()
    link:string

    @IsNotEmpty()
    @MinLength(3)
    title:string
}