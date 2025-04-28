import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DayOptions, TimeOptions24, YearOptions } from "@/lib/model-constants";
import { BlockContext, MapContext, RoomContext } from "@/pages/blocks/create";
import { DayType, Time24Type } from "@/types/models";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function BasicInformation() {
     const {data, setData, errors} = useContext(BlockContext)!;

     return (
          <div className="grid gap-4 p-4">
               <h3 className="font-semibold">Basic Information</h3>
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
                         <Label className="my-auto" htmlFor="year">School Year</Label>
                         <InputError className="p-0" message={errors.year} />
                    </div>
                    <Select onValueChange={(value) => setData("year", value)} defaultValue={YearOptions[0]}>
                         <SelectTrigger>
                              <SelectValue placeholder="Select school year" />
                         </SelectTrigger>
                         <SelectContent>
                              <SelectGroup>
                                   <SelectLabel>Select Year Level</SelectLabel>
                                   {YearOptions.map((text) => (
                                        <SelectItem key={uuidv4()} value={text}>{text} Year</SelectItem>
                                   ))}
                              </SelectGroup>
                         </SelectContent>
                    </Select>
               </div>
          </div>
     )
}

export function Scheduling() {
     const {data, setData, errors} = useContext(BlockContext)!;

     const {state, dispatch} = useContext(MapContext);

     const selectDateTime = ({day, time}: {day: DayType, time: Time24Type}) => {
          dispatch({type: "SET_DATETIME", payload: {day, time}});
     }

     const active = (day: DayType, time: Time24Type) => state.day == day && state.time == time;
     return (
          <div className="">
               <div className="grid gap-4 p-4">
                    <h3 className="font-semibold">Select Time</h3>
                    <div className="flex border max-w-100 overflow-x-auto select-none">
                         <div className="flex flex-col">
                              <div className="border">
                                   <div className="opacity-0">Mon</div>
                              </div>
                              {TimeOptions24.map((time) => (
                                   <div key={uuidv4()} className="border text-center px-2 py-1">{time}</div>
                              ))}
                         </div>
                         <div className="flex-1">
                              <div className="flex">
                                   {DayOptions.map((day) => (
                                        <div key={uuidv4()} className="border flex-1 text-center">{day.substring(0,3)}</div>
                                   ))}
                              </div>
                              {TimeOptions24.map(time => (
                                   <div className="flex">
                                        {DayOptions.map(day => (
                                             <div
                                                  onClick={() => selectDateTime({day, time})}
                                                  className={`cursor-pointer flex-1 border px-2 py-1 ${active(day, time) ? 'dark:bg-neutral-900 bg-neutral-300': ''} transition`}
                                             >
                                                  <div className="text-black/0">y</div>
                                             </div>
                                        ))}
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
}

export function SubjectInstructorCard() {
     const {state, dispatch} = useContext(MapContext);
     const { room } = useContext(RoomContext)!;

     return (
          <Card className="absolute top-20 right-10 w-120 z-50 bg-white/20 dark:bg-black/10 backdrop-blur-xl">
               <CardContent>
                    {/* <div className="">
                         <span className="font-medium">Room</span>: 10, <span className="font-medium">DateTime</span>: {state.day} {state.time}
                    </div> */}
                    <div className="grid grid-cols-5">
                         <div className="col-span-2">
                              <Label>Room</Label>
                              <div className="text-2xl">{room?.code ?? "Select Room"}</div>
                         </div>
                         <div className="col-span-3">
                              <Label>Day & Time</Label>
                              <div className="text-2xl">{state.day} {state.time}</div>
                         </div>
                    </div>
               </CardContent>
               <CardHeader>
                    <CardTitle>Select Subject</CardTitle>
                    <CardDescription>Add another block here. Click save changes when you are done.</CardDescription>
               </CardHeader>
               <CardContent>

               </CardContent>
          </Card>
     );
}