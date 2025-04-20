import { ArrowBigDown, ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Stairs() {
     return (
          <div className="h-20 border-t-5 border-r-5 w-32">
               <div className="grid grid-cols-4 h-15 pt-4">
                    <div className="grid gap-2 py-1 border-r-2">
                         {/* <ArrowDown className="absolute ms-1 mt-1 stroke-border"/> */}
                         <div className="absolute w-7 pt-1">
                              <div className="border-2 w-px h-11 mx-auto dark:border-white">
                              </div>
                         </div>
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                    </div>
                    <div className="border-r-2 border-dashed grid gap-2 my-1">
                         <div className="absolute grid ">
                              <ArrowUp className="ms-1 mt-1 stroke-border dark:stroke-white"/>
                              <div className="border w-px h-5 mx-auto border-white"></div>
                         </div>
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                    </div>
                    <div className="grid gap-2 py-1">
                         <ArrowDown className="absolute ms-1 mt-1 stroke-black/50 dark:stroke-white"/>
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                    </div>
                    <div className="grid gap-2 py-1 border-l-2">
                         <ArrowUp className="absolute ms-1 mt-1 stroke-border"/>
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                         <Separator />
                    </div>
               </div>
               <div className="grid grid-cols-2">
                    <div className="ps-3 pe-4">
                         <div className="border mt-2 dark:border-white"></div>
                    </div>
                    <div className="ps-3 pe-4">
                         <Separator className="mt-2" />
                    </div>
               </div>
          </div>
     )
}