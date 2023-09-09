import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { dayRepositry } from 'src/constants/entityRepositry';
import { Day } from './day.entity';

@Injectable()
export class DayService {
    constructor(
        @Inject(dayRepositry)
        private DayRepositry: typeof Day,
    ) {}

    getAllDays():Promise<Day[]>
    {
        return this.DayRepositry.scope('withoutTimeStamps').findAll()
    }

    async checkDay(id:number):Promise<Day>
    {
        const day = await this.DayRepositry.findByPk(id)
        if(!day)
        {
            throw new BadRequestException('day is not found')
        }
        return day
    }
}
