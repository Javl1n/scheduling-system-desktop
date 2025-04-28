import { BasicInformation, Scheduling, SubjectInstructorCard } from "@/components/blocks/create-forms";
import { RoomControl, TransformContent } from "@/components/blocks/create-map";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import mapReducer, { MapState } from "@/reducer/map-reducer";
import { BreadcrumbItem } from "@/types";
import { Room, YearType } from "@/types/models";
import { Head, InertiaFormProps, useForm } from "@inertiajs/react";
import { createContext, useReducer, useState } from "react";
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
     year: YearType,
     // subjects: number[],
     // days: string[]
}

export const BlockContext = createContext<InertiaFormProps<BlockForm> | null>(null);
export const MapContext = createContext<any>(null);
export const RoomContext = createContext<any>(null);

export default function BlockCreate({rooms}: {rooms: Room[]}) {
     const form = useForm<BlockForm>({
          block_number: '',
          year: "1",
          // subjects: [],
          // days: []
     });

     const mapInitialState: MapState = {
          floor: "3",
          day: "Monday",
          time: "7:00",
     };

     const [mapState, dispatch] = useReducer(mapReducer, mapInitialState);
     const [room, setRoom] = useState<Room | null>(null);

     return (
          <AppLayout breadcrumbs={breadcrumbs}>
               <Head title="Create Block" />
                    <RoomContext.Provider value={{ room, setRoom }}>
                         <MapContext.Provider value={{ state: mapState, dispatch: dispatch }}>
                              <BlockContext.Provider value={ form }>
                                   <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">

                                        <Card className="absolute top-20 left-10 w-120 z-50 bg-white/20 dark:bg-black/10 backdrop-blur-xl">
                                             <CardHeader>
                                                  <CardTitle>Add Block</CardTitle>
                                                  <CardDescription>Add another block here. Click save changes when you are done.</CardDescription>
                                             </CardHeader>
                                             <CardContent>
                                                  <Tabs defaultValue="Sched">
                                                       <TabsList className='select-none w-full'>
                                                            <TabsTrigger value="Info">Basic Information</TabsTrigger>
                                                            <TabsTrigger value="Sched">Set Up Schedule</TabsTrigger>
                                                       </TabsList>
                                                       <TabsContent value="Info">
                                                            <BasicInformation />
                                                       </TabsContent>
                                                       <TabsContent value="Sched">
                                                            <Scheduling />
                                                       </TabsContent>
                                                  </Tabs>
                                             </CardContent>
                                             <CardFooter className="flex justify-between">
                                                  <Button variant="outline">Cancel</Button>
                                                  <Button>Add</Button>
                                             </CardFooter>
                                        </Card>

                                        <SubjectInstructorCard />
                                        
                                        <TransformWrapper initialScale={1.8} wheel={{ smoothStep: 0.0021, step: 0.4 }} disablePadding centerOnInit smooth={true}>
                                             <TransformComponent>
                                                  <TransformContent rooms={rooms}  />
                                             </TransformComponent>
                                        </TransformWrapper>

                                        <RoomControl />
                                   </div>
                              </BlockContext.Provider>
                         </MapContext.Provider>
                    </RoomContext.Provider>
          </AppLayout>
     )
}