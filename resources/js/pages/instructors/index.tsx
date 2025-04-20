import CreateInstructor from '@/components/instructors/create';
import { InstructorTile } from '@/components/instructors/index-tile';
import { SearchBar } from '@/components/search-bar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Instructor } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instructors',
        href: '/instructor',
    },
];

export default function Instructors({ 
    instructors 
}: {
    instructors: Instructor[]
}) {
    const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([...instructors]);

    const searchInstructor = (item: string) => {
        item = item.toLowerCase()
        setFilteredInstructors([
            ...instructors.filter((instructor) => 
                instructor.school_id.includes(item)
                || instructor.name.toLowerCase().includes(item)
                || instructor.days.map(object => object.day).toString().toLowerCase().includes(item)
                || instructor.subjects.map(subject => 
                        subject.code 
                        + subject.title 
                        + subject.years.map(object => object.year).toString()
                    ).toString().toLowerCase().includes(item)
            )
        ])
    } 

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Instructors" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-end gap-4'>
                    {/* <div><SelectYear setSubjects={setFilteredSubjects} subjects={subjects} /></div> */}
                    {/* <SearchBar 
                        reset={() => setFilteredSubjects([...subjects])}
                        search={searchSubject}
                        placeholder='Search for code, title, year level'
                    /> */}
                    {/* <CreateInstructor /> */}
                    <SearchBar search={searchInstructor} reset={() => setFilteredInstructors([...instructors])} placeholder='Search for instructors here' />
                    <Link href={route("instructor.create")}>
                        <Button className="" variant={"default"}>Add Instructor</Button>
                    </Link>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {filteredInstructors.map(instructor => (
                        <InstructorTile key={instructor.school_id} instructor={instructor}/>
                    ))}
                    
                </div>
        </div>
        </AppLayout>
    );
}
