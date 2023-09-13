import { Body, Controller, Post, UseGuards, Get,Param } from '@nestjs/common';
import { HintService } from './hint.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { HintBasic } from './dto/hint.dto';
import { User } from 'src/common/decorator/user.decorator';

@Controller('hint')
export class HintController {
    constructor(private hintService: HintService) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Post('create')
    createHint(@Body() dto:HintBasic)
    {
        return this.hintService.createHint(dto)
    }

    @UseGuards(AuthGuard)
    @Roles(Role.User)
    @Get('all/:courseId')
    findAllHints(@Param('courseId') courseId:number,@User() user:any)
    {
        return this.hintService.getHints(user.userId,courseId)
    }
}