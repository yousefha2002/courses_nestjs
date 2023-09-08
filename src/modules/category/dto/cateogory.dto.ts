import { IsNotEmpty } from "class-validator";
import {Transform} from 'class-transformer'

export class CategoryBasic { 
    @Transform(({ value }) => value.toLowerCase().trim())
    @IsNotEmpty()
    title:string
}