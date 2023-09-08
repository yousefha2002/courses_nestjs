import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { CategoryBasic } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Post('create')
    createCategory(@Body() dto:CategoryBasic)
    {
        return this.categoryService.addCategory(dto)
    }

    @Get('all')
    getAllCategories()
    {
        return this.categoryService.getAllCategories()
    }
}
