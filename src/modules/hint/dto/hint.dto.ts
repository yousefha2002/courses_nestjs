import { IsNotEmpty } from "class-validator";

export class HintBasic {
    @IsNotEmpty()
    courseId:number

    @IsNotEmpty()
    content:number
}