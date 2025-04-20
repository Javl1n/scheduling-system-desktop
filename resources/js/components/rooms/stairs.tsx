import { ArrowBigDown, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Separator } from "../ui/separator";

export function CenterStairs() {
     const stairs = () => {
          return (
               <>
                    {Array.from({length: 5}, () => (
                         <Separator />
                    ))}
               </>
          )
     }

     return (
          <div className="h-20 border-t-5 border-r-5 w-32">
               <div className="grid grid-cols-4 h-full py-4">
                    <div className="grid gap-2 py-1 border-r-2">
                         <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
                    <div className="border-r-2 border-dashed grid gap-2 my-1">
                         <ArrowUp className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
                    <div className="grid gap-2 py-1">
                         <ArrowDown className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
                    <div className="grid gap-2 py-1 border-l-2">
                         <ArrowUp className="absolute ms-1 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
               </div>
          </div>
     )
}

export function EmergencyStairs({inverse} : {inverse: boolean}) {
     const stairs = () => {
          return (
               <>
                    {Array.from({length: 6}, () => (
                         <Separator orientation="vertical" />
                    ))}
               </>
          )
     }

     return (
          <div className={`border-5 ${inverse ? "border-r-0" : "border-l-0"} border-b-5 h-20 w-20`}>
               <div className={`grid h-full ${inverse ? 'ps-4' : 'pe-4'}`}>
                    <div className="flex justify-between px-1">
                         <ArrowLeft className="absolute ms-3 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
                    <div className="flex justify-between px-1 border-t-2">
                         <ArrowRight className="absolute ms-3 mt-1 stroke-border dark:stroke-gray-600"/>
                         {stairs()}
                    </div>
               </div>
          </div>
     )
}