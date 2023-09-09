import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { categoryRepositry } from 'src/constants/entityRepositry';
import { Category } from './category.entity';
import { CategoryBasic } from './dto';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(categoryRepositry)
        private Categoryepository: typeof Category,
    ) {}

    async addCategory(dto:CategoryBasic):Promise<{message:string}>
    {
        const {title} = dto
        const category = await this.Categoryepository.findOne({where:{title}})
        if(category)
        {
            throw new BadRequestException('category has been found')
        }
        await this.Categoryepository.create({title})
        return {message:"category has been created"}
    }

    getAllCategories():Promise<Category[]>
    {
        return this.Categoryepository.scope('withoutTimeStamps').findAll()
    }

    async checkCategory(id:number):Promise<Category>
    {
        const category  = await this.Categoryepository.findByPk(id)
        if(!category)
        {
            throw new BadRequestException('category has been not found')
        }
        return category
    }
}
