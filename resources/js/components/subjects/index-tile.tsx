import { Subject } from "@/types/models";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ToggleTile from "../toggle-tile";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

export default function DialogSubjectTile({subject}: {subject: Subject}) {
     return (
          <Dialog>
               <DialogTrigger asChild>
                    <TooltipTile subject={subject}/>
                    {/* <DialogButton subject={subject} /> */}
               </DialogTrigger>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Edit Subject</DialogTitle>
                         <DialogDescription>
                              Make changes to {subject.code} here. Click save when you're done.
                         </DialogDescription>
                    </DialogHeader>
                    <div>
                         
                    </div>
               </DialogContent>
          </Dialog>
     );
}

function TooltipTile({subject, ...props}: {subject: Subject}) {
     return (
          <TooltipProvider>
               <Tooltip>
                    <TooltipTrigger asChild>
                         <SubjectTile {...props} subject={subject} />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                         <p>Click to edit this ubject</p>
                    </TooltipContent>
               </ Tooltip>
          </TooltipProvider>
     )
}

export function SubjectTile ({subject, ...props}: {subject: Subject}) {
     const years = ["First", "Second", "Third", "Fourth"];

     const includedYear = (year: string | "First" | "Second" | "Third" | "Fourth") => {
          return subject.years.map((year) => year.year).includes(year);
     }
     return (
          <div {...props} className="cursor-pointer p-4 shadow border-sidebar-border dark:shadow-none dark:border-sidebar-border relative overflow-hidden rounded-xl border">
               
               <div className="flex gap-2 h-10 mt-2">
                    <h1 className='text-2xl font-bold my-auto'>{subject.code}</h1>
                    <Separator orientation='vertical' />
                    <p className='flex-1 my-auto'>{subject.title}</p>
               </div>
               {/* <div className='mt-4'>
                    <h2 className='text-sm'>Year Level:</h2>
                    <div className='grid grid-cols-4 mt-2 gap-2'>
                         {years.map((year ) => (
                              <ToggleTile key={`list-subject-${subject.id}-${year}-year-tile`} text={`${year} Year`} toggle={includedYear(year)} />
                         ))}
                    </div>
               </div> */}
               <div className="mt-1">
                    <Label className='font-light'>Year Level:</Label>
                    <div className="flex gap-2 mt-1">
                         {subject.years.map((year) => (
                              <Badge key={`subject-${subject.id}-${year.year}`} variant={"secondary"}>{year.year} Year</Badge>
                         ))}
                    </div>
               </div>
          </div>
     )
}