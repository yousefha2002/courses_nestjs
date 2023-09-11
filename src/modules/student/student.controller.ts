import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from './studend.service';
import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { StudentBasic, StudentCourseAssign, StudentLoginInfo } from './dto';
import { CustomStorage } from 'src/common/util/custom.storage';
import { User } from 'src/common/decorator/user.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Post('register')
    @UseInterceptors(FileInterceptor('file',{storage:CustomStorage.storage}))
    register(@Body() dto:StudentBasic,@UploadedFile() file: Express.Multer.File)
    {
        return this.studentService.register(dto,file)
    }

    @Post('login')
    login(@Body() dto:StudentLoginInfo)
    {
        return this.studentService.login(dto)
    }

    @UseGuards(AuthGuard)
    @Roles(Role.User)
    @Post('course-assign')
    assignCourse(@Body() dto:StudentCourseAssign,@User() user:any)
    {
        return this.studentService.assignCourse(dto,user.userId)
    }
}