import { Body, Controller, Get, Post, UseGuards,Param} from '@nestjs/common';
import { CourseService } from './course.service';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { CourseBasic, CourseDayBasic } from './dto';
import { User } from 'src/common/decorator/user.decorator';

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
    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Post('add-day')
    addCourseDay(@Body() dto:CourseDayBasic)
    {
        return this.courseService.addCourseDay(dto)
    }

    @Get('all')
    findAllCourses()
    {
        return this.courseService.getCourses()
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard)
    @Get(':id')
    getSingleCourse(@Param('id') id:number,@User() user:any)
    {
        return this.courseService.getSingelCourse(id,user.userId)
    }
}
