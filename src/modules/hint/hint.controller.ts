import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { HintService } from './hint.service';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { HintBasic } from './dto/hint.dto';

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
}