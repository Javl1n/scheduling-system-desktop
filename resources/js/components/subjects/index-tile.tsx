import { Subject } from "@/types/models";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function SubjectTile({subject}: {subject: Subject}) {
     return (
          <Dialog>
               <DialogTrigger asChild>
                    <DialogButton subject={subject} />
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

function DialogButton({subject, ...props}: {subject: Subject}) {
     const years = ["First", "Second", "Third", "Fourth"];

     const includedYear = (year: string | "First" | "Second" | "Third" | "Fourth") => {
          return subject.years.map((year) => year.year).includes(year);
     }

     return (
          <TooltipProvider>
               <Tooltip>
                    <TooltipTrigger asChild>
                         <div {...props} className="cursor-pointer p-4 shadow border-sidebar-border dark:shadow-none dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                              {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                              <div className="flex gap-2 h-10">
                                   <h1 className='text-2xl font-bold my-auto'>{subject.code}</h1>
                                   <Separator orientation='vertical' />
                                   <p className='flex-1 my-auto'>{subject.title}</p>
                              </div>
                              <div className='mt-4'>
                                   {/* <h2 className='text-sm'>Year Level:</h2> */}
                                   <div className='grid grid-cols-4 mt-2 gap-2'>
                                        {years.map((year ) => (
                                             <div key={year} className={`${includedYear(year) ? 'border-green-400 bg-green-600/20' : 'border-sidebar-border'} aspect-video border  rounded-xl text-sm text-center flex flex-col justify-center`}>
                                                  {year} Year
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                         <p>Click to edit this ubject</p>
                    </TooltipContent>
               </ Tooltip>
          </TooltipProvider>
     )
}