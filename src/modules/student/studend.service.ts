import { Injectable,Inject, BadRequestException} from '@nestjs/common';
import { studentRepositry } from 'src/constants/entityRepositry';
import { Student } from './student.entity';
import { StudentBasic, StudentCourseAssign, StudentLoginInfo } from './dto';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { Role } from 'src/common/types/role.enum';
import { CourseService } from '../course/course.service';

@Injectable()
export class StudentService {
    constructor(
        @Inject(studentRepositry)
        private StudentRepositry : typeof Student,

        private readonly courseService : CourseService
    ){}
    async register(dto:StudentBasic,file:Express.Multer.File):Promise<string>
    {
        const {password,email,name,country} = dto
        if(!file)
        {
            throw new BadRequestException('you have to send image')
        }
        const student = await this.StudentRepositry.findOne({where:{email}})
        if(student)
        {
            throw new BadRequestException('email is found')
        }
        const hasPassword = await hashPassword(password)
        await this.StudentRepositry.create({image:file.filename,password:hasPassword,email,name,country})
        return "your account has been created"
    }

    async login(dto:StudentLoginInfo):Promise<{ msg: string; student:Student; token: string }> 
    {
        const {email} = dto
        const student = await this.StudentRepositry.findOne({where: { email}});
        if (!student) {
            throw new BadRequestException('Email is wrong');
        }
        const isMatch = await VerifyPassword(dto.password, student.password);
        if (!isMatch) {
            throw new BadRequestException('password is wrong');
        }
        const payload = { userId: student.id, role: Role.User };
        const access_token = generateToken(payload);
        const {password,...other} = student.toJSON()
        return { msg: 'تم تسجيل الدخول بنجاح', student: other, token: access_token };
    }

    async assignCourse(dto:StudentCourseAssign,studentId:number):Promise<string>
    {
        const {courseId} = dto
        const [student,course] = await Promise.all([
            this.findStudent(studentId),
            this.courseService.checkCourse(courseId)
        ])
        const currentStudentCount = await course.$count('students');

        if (currentStudentCount >= course.maxStudents) {
            throw new BadRequestException('The course is full. Cannot register.');
        }
        const isRegistered = await student.$has('course', course);
        if (isRegistered) {
            throw new BadRequestException('You are already registered in this course.');
        }
        await student.$add('course',course)
        return "student has register the course"
    }

    async findStudent(id:number)
    {
        const student = await this.StudentRepositry.findByPk(id)
        if(!student)
        {
            throw new BadRequestException('student is not found')
        }
        return student
    }
}