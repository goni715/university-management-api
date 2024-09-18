import { TSchedule } from "./offeredCourse.interface";





export const hasTimeConflict = (assignedSchedules: TSchedule[], newSchedule: TSchedule) => {

    //using for-of loop or for-loop//because forEach loop can not break the loop
    for(const cv of assignedSchedules){
        const existingStartTime = new Date(`2024-01-01T${cv.startTime}:00`);
        const existingEndTime = new Date(`2024-01-01T${cv.endTime}:00`);
        const newStartTime = new Date(`2024-01-01T${newSchedule.startTime}:00`);
        const newEndTime = new Date(`2024-01-01T${newSchedule.endTime}:00`);

        //existing=> 10:30 - 12:30
        //new=> 09:30 - 11:30
        if( newStartTime < existingEndTime && newEndTime > existingStartTime ){
            return true
        }
    }


    return false;

}