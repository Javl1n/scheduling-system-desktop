import InputError from "@/components/input-error";
import { SearchBar } from "@/components/search-bar";
import { SubjectTile } from "@/components/subjects/index-tile";
import ToggleTile from "@/components/toggle-tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { type Subject } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instructors',
        href: '/instructor',
    },
    {
          title: 'Add Instructor',
          href: '/instructor',
     },
];

type InstructorForm = {
     school_id: string,
     name: string,
     subjects: number[],
     days: string[]
}

export default function Create({subjects}: {subjects: Subject[]}) {
     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([...subjects]);

     const {data, setData, post, processing, reset, errors} = useForm<InstructorForm>({
          school_id: '',
          name: '',
          subjects: [],
          days: []
     });

     const subjectSelected = (subject: Subject) => {
          return data.subjects.includes(subject.id);
     }

     const daySelected = (day: string) => {
          return data.days.includes(day);
     }

     const toggleDay = (day: string) => {
          if (data.days.includes(day)) {
               setData('days', [...data.days.filter((item) => item != day)]);
          } else {
               setData('days', [...data.days, day]);
          }
     }

     const toggleSubjecet = (subject: Subject) => {
          if (data.subjects.includes(subject.id)) {
               setData('subjects', [...data.subjects.filter((item) => item != subject.id)]);
          } else {
               setData('subjects', [...data.subjects, subject.id]);
          }
     }

     const searchSubject = (item: string) => {
          setFilteredSubjects([
              ...subjects.filter((subject) => 
                  subject.code.toLowerCase().includes(item) 
                  || subject.title.toLowerCase().includes(item) 
                  || subject.years.map(year => year.year.toLowerCase() + " year").toString().includes(item)
              )
          ]);
     }

     return (
          <AppLayout breadcrumbs={breadcrumbs}>
               <Head title="Add Instructor" />
               <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                    <div className="flex justify-between">
                         <div className="">
                              <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Instructor</h1>
                              <p className="text-sm">
                                   Add another instructor here. Click save changes when you are done.
                              </p>
                         </div>
                         <div className="my-auto">
                              <Button onClick={() => post(route("instructor.store"))}>Save</Button>
                         </div>
                    </div>

                    <div className="grid gap-6 mt-4">
                         <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-4 border rounded-2xl p-4 shadow dark:shadow-none">
                                   <h3 className="font-semibold">Basic Information</h3>
                                   <div className="grid gap-2">
                                        <div className="flex gap-2">
                                             <Label className="my-auto" htmlFor="school_id">School ID</Label>
                                             <InputError className="m-0" message={errors.school_id} />
                                        </div>
                                        <Input 
                                             name="school_id" 
                                             value={data.school_id} 
                                             onChange={(e) => setData("school_id", e.target.value)} 
                                             placeholder="2025-00360"
                                        />
                                   </div>
                                   <div className="grid gap-2">
                                        <div className="flex gap-2">
                                             <Label className="my-auto" htmlFor="name">Name</Label>
                                             <InputError className="p-0" message={errors.name} />
                                        </div>
                                        <Input 
                                             name="name"
                                             value={data.name} 
                                             onChange={(e) => setData("name", e.target.value)} 
                                             placeholder="Frank Sinatra" 
                                        />
                                   </div>
                              </div>
                              <div className="grid gap-2 border p-4 rounded-xl shadow dark:shadow-none">
                                   <div className="flex gap-2">
                                        <h3 className="font-semibold my-auto">Preferred Schedule Days</h3>
                                        <InputError className="my-auto" message={errors.days} />
                                   </div>
                                   <div className="grid grid-cols-6 gap-2">
                                        {days.map((day) => (
                                             <div key={`create-insctructor-${day}`} onClick={() => toggleDay(day)} className="cursor-pointer" >
                                                  <ToggleTile aspect={'aspect-square'} text={day} toggle={daySelected(day)} />
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                         <div className="grid gap-4">
                              {/* <Label>Select Subjects</Label> */}
                              <div className="flex justify-between">
                                   <div className="flex gap-2">
                                        <h3 className="font-semibold my-auto">Basic Information</h3>
                                        <InputError className="my-auto" message={errors.subjects} />
                                   </div>
                                   <div>
                                        <SearchBar search={searchSubject} reset={() => setFilteredSubjects([...subjects])} placeholder="Search for subjects here" />
                                   </div>
                              </div>

                              <div className="grid grid-cols-4 gap-4">
                                   {filteredSubjects.map(subject => (
                                        <div key={subject.code} onClick={() => toggleSubjecet(subject)} className={subjectSelected(subject) ? 'ring-2 ring-green-400 rounded-xl' : ''}>
                                             <SubjectTile subject={subject} />
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </AppLayout>
     );
} 