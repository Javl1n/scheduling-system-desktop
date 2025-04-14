import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import { CheckCircle2Icon, LoaderCircle } from "lucide-react";
import InputError from "../input-error";
import { toast } from "sonner";
import { useState } from "react";
import { dialog } from "electron";

type SubjectForm = {
     code: string;
     title: string;
     years: string[];
};

export default function CreateSubject () {
     const years = ["First", "Second", "Third", "Fourth"];

     const [dialogState, setDialogState] = useState(false);

     const {data, setData, post, processing, reset, errors} = useForm<SubjectForm>({
          code: '',
          title: '',
          years: [],
     });

     const toggleYear = (year: string) => {
          console.log(1);
          if (data.years.includes(year)) {
               setData('years', [...data.years.filter((item) => item != year)]);
          } else {
               setData('years', [...data.years, year]);
          }
     }

     const yearIsIncluded = (year: string) => data.years.includes(year);
     
     const submit = () => {
          post(route("subject.store"), {
               onSuccess: () => {
                    // toast("Subject Created Successfully!", {
                    //      description: `${data.code} - ${data.title}`,
                    //      // icon: <CheckCircle2Icon className="me-2" />,
                    //      // type: "success",
                    // });
                    reset();
                    setDialogState(false);
               },
               only: ['subjects']
          });
     }

     return (
          <Dialog open={dialogState} onOpenChange={setDialogState}>
               <DialogTrigger asChild>
                    <Button className="" variant={"default"}>Add Subject</Button>
               </DialogTrigger>
               <DialogContent >
                    <DialogHeader>
                         <DialogTitle>Add Subject</DialogTitle>
                         <DialogDescription>
                              Create another subject here. Click save changes when you are done.
                         </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                         <Label htmlFor="code">Course Code</Label>
                         <Input
                              type="text"
                              name="code"
                              value={data.code}
                              onChange={(e) => setData('code', e.target.value)}
                              placeholder="Enter course code here"
                         />
                         <InputError message={errors.code} />
                    </div>
                    <div className="grid gap-2">
                         <Label htmlFor="title">Descriptive Title</Label>
                         <Input
                              type="text"
                              name="title"
                              value={data.title}
                              onChange={(e) => setData('title', e.target.value)}
                              placeholder="Enter descriptive title here"
                         />
                         <InputError message={errors.title} />
                         {/* <Textarea name="title" placeholder="Course Title " /> */}
                    </div>
                    <div className="grid gap-2">
                         <Label>Subject Year</Label>
                         <div className="grid grid-cols-4 gap-2">
                              {years.map((year) => (
                                   <div onClick={() => toggleYear(year)} key={year} className={`${yearIsIncluded(year) ? 'border-green-400 bg-green-600/20' : 'border-sidebar-border'} select-none aspect-video border  rounded-xl text-sm text-center flex flex-col justify-center`}>
                                        {year} Year
                                   </div>
                              ))}
                         </div>
                         <InputError message={errors.years} />
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                              <Button onClick={() => reset()} variant={"outline"}>Cancel</Button>
                         </DialogClose>
                         <Button onClick={submit} type="submit" disabled={processing}>
                              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                              Save
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}