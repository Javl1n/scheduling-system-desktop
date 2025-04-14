import CreateSubject from '@/components/subjects/create';
import { SearchBar, SelectYear } from '@/components/subjects/filters';
import SubjectTile from '@/components/subjects/index-tile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Subject } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ChangeEvent, ChangeEventHandler, SetStateAction, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subjects',
        href: '/',
    },
];

export default function Index({
    subjects
}: {
    subjects: Subject[]
}) {
    const [filteredSubjects, setFilteredSubjects] = useState([...subjects]);

    useEffect(() => {
        setFilteredSubjects([...subjects]);
    }, [subjects]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subject" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-end gap-4'>
                    {/* <div><SelectYear setSubjects={setFilteredSubjects} subjects={subjects} /></div> */}
                    <div><SearchBar setSubjects={setFilteredSubjects} subjects={subjects} /></div>
                    <CreateSubject />
                </div>
                <div className="grid auto-rows-min gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                    {filteredSubjects.map((subject) => (
                        <SubjectTile key={subject.id} subject={subject} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
