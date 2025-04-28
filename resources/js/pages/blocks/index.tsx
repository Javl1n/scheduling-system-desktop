import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blocks',
        href: route('block.index'),
    },
];

export default function BlocksIndex() {
     return (
          <AppLayout breadcrumbs={breadcrumbs}>
               <Head title="Subject" />
               <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className='flex justify-end gap-4'>
                    {/* <div><SelectYear setSubjects={setFilteredSubjects} subjects={subjects} /></div> */}
                    {/* <SearchBar 
                         reset={() => setFilteredSubjects([...subjects])}
                         search={searchSubject}
                         placeholder='Search for code, title, year level'
                    /> */}
                    <Button onClick={() => router.get(route("block.create"))}>Add a Block</Button>
                    </div>
                    <div className="grid auto-rows-min gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                    {/* {filteredSubjects.map((subject) => (
                         <SubjectTile key={subject.id} subject={subject} />
                    ))} */}
                    </div>
               </div>
          </AppLayout>
     )
}