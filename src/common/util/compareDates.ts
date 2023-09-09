export const compareDates = (date1:Date,date2:Date):boolean=>
{
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    return startDate.getTime() > endDate.getTime();
}