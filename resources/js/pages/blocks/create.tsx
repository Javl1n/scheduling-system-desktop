import InputError from "@/components/input-error";
import { CenterRoom, WingRoom } from "@/components/rooms/room-tile";
import { EmergencyStairs } from "@/components/rooms/stairs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Room } from "@/types/models";
import { Head, useForm } from "@inertiajs/react";
import { createContext, useContext } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const breadcrumbs: BreadcrumbItem[] = [
     {
          title: 'Blocks',
          href: route('block.index'),
     },
     {
          title: 'Add Block',
          href: route('block.create'),
     },
];

type BlockForm = {
     block_number: string,
     year: string | "1" | "2" | "3" | "4",
     // subjects: number[],
     // days: string[]
}

// const BlockContext = createContext(null);

export default function BlocksCreate({rooms}: {rooms: Room[]}) {

     const {data, setData, post, processing, reset, errors} = useForm<BlockForm>({
          block_number: '',
          year: "1",
          // subjects: [],
          // days: []
     });


     return (
          <AppLayout breadcrumbs={breadcrumbs}>
               <Head title="Subject" />
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                         <div className="flex justify-between">
                              <div className="">
                                   <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Block</h1>
                                   <p className="text-sm">
                                        Add another block here. Click save changes when you are done.
                                   </p>
                              </div>
                              <div className="my-auto">
                                   {/* <Button onClick={() => post(route("instructor.store"))}>Save</Button> */}
                              </div>
                         </div>
                         <div className="grid gap-6 mt-4">
                              <div className="grid gap-4 border rounded-2xl p-4 shadow dark:shadow-none">
                                   <h3 className="font-semibold">Basic Information</h3>
                                   <div className="grid gap-2 grid-cols-2">
                                        <div className="grid gap-2">
                                             <div className="flex gap-2">
                                                  <Label className="my-auto" htmlFor="school_id">Block Number</Label>
                                                  <InputError className="m-0" message={errors.block_number} />
                                             </div>
                                             <Input
                                                  name="school_id"
                                                  value={data.block_number}
                                                  onChange={(e) => setData("block_number", e.target.value)}
                                                  placeholder="10, 1, 3..."
                                             />
                                        </div>
                                        <div className="grid gap-2">
                                             <div className="flex gap-2">
                                                  <Label className="my-auto" htmlFor="name">School Year</Label>
                                                  <InputError className="p-0" message={errors.year} />
                                             </div>
                                             <Select onValueChange={(value) => setData("year", value)} defaultValue="1">
                                                  <SelectTrigger className="">
                                                       <SelectValue placeholder="Select school year" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       <SelectGroup>
                                                            <SelectLabel>Select Year Level</SelectLabel>
                                                            {["1st Year", "2nd Year", "3rd Year", "4th Year",].map((text, i) => (
                                                                 <SelectItem value={(i + 1).toString()}>{text}</SelectItem>
                                                            ))}
                                                       </SelectGroup>
                                                  </SelectContent>
                                             </Select>
                                        </div>
                                   </div>
                              </div>
                              <div>
                                   <div className="grid gap-4 border rounded-2xl p-4 shadow dark:shadow-none">
                                        <h3 className="font-semibold">Set Schedule</h3>
                                        <div className="grid gap-4 grid-cols-2">
                                             <div className="grid gap-4 border rounded-2xl p-4 shadow dark:shadow-none">
                    
                                             </div>
                                             <div className="grid gap-4 border rounded-2xl p-4 shadow dark:shadow-none">
                    
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
          </AppLayout>
     )
}