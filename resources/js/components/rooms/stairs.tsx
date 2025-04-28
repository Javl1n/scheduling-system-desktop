import { ArrowBigDown, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Separator } from "../ui/separator";
import { v4 as uuidv4 } from "uuid";

const centerSteps = (steps: number = 8) => {
     return (
          <>
               {Array.from({length: steps}, () => (
                    <Separator key={uuidv4()} className="mt-1 first:mt-0" />
               ))}
          </>
     )
}

export function CenterStairs() {
     return (
          <div className="h-[100px] border-t-5 border-r-5 w-[120px]">
               <div className="grid grid-cols-4 pt-7">
                    <div className=" border-r-2">
                         {/* <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                         {centerSteps()}
                    </div>
                    <div className="h-[10px] grid col-span-2">
                         {/* <ArrowUp lassName="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                         {centerSteps(4)}
                         <div className="absolute mt-1 z-50 border ms-1 h-6 w-12" />
                         {/* <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                    </div>
                    <div className=" border-l-2">
                         {/* <ArrowUp className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                         {centerSteps()}
                    </div>
               </div>
          </div>
     )
}

export function CenterGroundStairs() {
     return (
          <div className="h-[100px] border-t-5 border-r-5 w-[120px]">
               <div className="grid grid-cols-2">
                    <div className="grid grid-cols-2 pt-7 border-r-4">
                         <div className="border-r-2">
                              {/* <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {centerSteps(4)}
                         </div>
                         <div className="">
                              {/* <ArrowUp className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {centerSteps()}
                         </div>
                    </div>
                    <div className="grid grid-cols-2 pt-7">
                         <div className="">
                              {/* <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {centerSteps()}
                         </div>
                         <div className="border-l-2">
                              {/* <ArrowUp className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {centerSteps(4)}
                         </div>
                    </div>
               </div>
          </div>
     )
}

export function EmergencyStairs({inverse} : {inverse: boolean}) {
     const steps = (steps: number = 7) => {
          return (<>
               {Array.from({length: steps}, (i, k) => (
                    <Separator key={uuidv4()} orientation="vertical" />
               ))}
          </>)
     }

     return (
          <div className={`flex ${inverse ? "justify-end" : ""}`}>
               <div className={`border-5 border-t-0 ${inverse ? "border-r-0" : "border-l-0"} border-b-5 h-[40px] w-[60px]`}>
                    <div className={`grid h-full divide-y-2 ${inverse ? 'ps-4' : 'pe-4'}`}>
                         <div className="flex justify-between">
                              {/* <ArrowLeft className="absolute ms-3 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {steps()}
                         </div>
                         <div className="flex justify-between">
                              {/* <ArrowRight className="absolute ms-3 mt-1 stroke-border dark:stroke-gray-600"/> */}
                              {steps()}
                         </div>
                    </div>
               </div>
          </div>
     )
}