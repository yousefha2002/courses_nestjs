import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { LessonBasic } from './dto/lesson.dto';

@Controller('lesson')
export class LessonController {
    constructor(private adminService: LessonService) {}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Put('update')
    updateLesson(@Body() dto:LessonBasic)
    {
        return this.adminService.updateLesson(dto)
    }
}
