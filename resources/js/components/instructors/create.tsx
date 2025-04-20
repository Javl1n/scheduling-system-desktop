import { useEffect } from "react";
import ToggleTile from "../toggle-tile";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CreateInstructor () {
     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     return (
          <Drawer>
               <DrawerTrigger asChild>
                    <Button className="" variant={"default"}>Add Instructor</Button>
               </DrawerTrigger>
               <DrawerContent>
                    <div className="px-40">
                         <DrawerHeader>
                              <DrawerTitle>Add Instructor</DrawerTitle>
                              <DrawerDescription>
                                   Add another instructor here. Click save changes when you are done.
                              </DrawerDescription>
                         </DrawerHeader>
                         <div className="grid grid-cols-3 gap-2 px-4">
                              <div className="grid gap-4">
                                   <div className="grid gap-2">
                                        <Label htmlFor="school_id">School ID</Label>
                                        <Input name="school_id" placeholder="2025-00360" />
                                   </div>
                                   <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input name="name" placeholder="Frank Sinatra" />
                                   </div>
                                   <div className="grid gap-2">
                                        <Label>Preferred Schedule Day</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                             {days.map((day) => (
                                                  <div key={`create-insctructor-${day}`}>
                                                       <ToggleTile text={day} toggle={true} />
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                              <div className="col-span-2">
                                   <Label>Select Subjects</Label>
                                   
                              </div>
                         </div>
                         <DrawerFooter>
                         </DrawerFooter>
                    </div>
               </DrawerContent>
          </Drawer>
     )
}
