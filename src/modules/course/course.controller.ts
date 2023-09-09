import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { CourseService } from './course.service';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { CourseBasic } from './dto';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Post('create')
    createCourse(@Body() dto:CourseBasic)
    {
        return this.courseService.createCourse(dto)
    }
}
