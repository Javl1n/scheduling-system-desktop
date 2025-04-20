import { Instructor } from "@/types/models";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

export function InstructorTile ({instructor, ...props}: {instructor: Instructor}) {
     return (
          <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
               <h2 className='text-sm text-white/40 font-bold'>{instructor.school_id}</h2>
               <h1 className='text-xl font-bold'>{instructor.name}</h1>
               <div className="mt-1">
                    <Label className='font-light'>Preferred Days:</Label>
                    <div className='flex gap-2 mt-1'>
                         {instructor.days.map((dayObject) => (
                              <Badge variant='secondary'>{dayObject.day}</Badge>
                         ))}
                    </div>
               </div>
               <div className="mt-1">
                    <Label className='font-light'>Subjects:</Label>
                    <div className='flex gap-2 mt-1'>
                         {instructor.subjects.map((subject) => (
                              <Badge variant='secondary'>{subject.code}</Badge>
                         ))}
                    </div>
               </div>
          </div>
     )
}