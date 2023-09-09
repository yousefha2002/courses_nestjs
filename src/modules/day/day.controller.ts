import { Controller, Get} from '@nestjs/common';
import { DayService } from './day.service';

@Controller('day')
export class DayController {
    constructor(private dayService: DayService) {}

    @Get('all')
    getAllDays()
    {
        return this.dayService.getAllDays()
    }
}
