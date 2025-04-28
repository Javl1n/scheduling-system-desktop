import { Room } from "@/types/models";
import { FC, MouseEventHandler, ReactNode } from "react";

const height = "h-[100px]";
const width = "w-[100px]";

const wSpan: any = {
     "0.5": "w-[60px]",
     "1": "w-[120px]",
     "1.5": "w-[180px]",
     "2": "w-[240px]",
     "3": "w-[360px]",
     "square": "w-[100px]"
};

const hSpan: any = {
     "0.5": "h-[60px]",
     "1": "h-[120px]",
     "1.5": "h-[160px]",
     "2": "h-[240px]",
     "3": "h-[360px]",
     "square": "h-[100px]",
     "1 square": "h-[220px]",
     "full wing": "h-[580px]"
};

interface RoomView {
     room: Room;
     last?: boolean;
     indicator?: string
}


export const CenterRoom: FC<RoomView> = ({room, last = false, indicator = ''}) => {
     const available = !room.available ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500' : 'dark:bg-neutral-950';

     return (
          <div  className={`border-5 border-l-0 ${indicator!} ${last ? 'border-r-0': ''} ${height} ${wSpan[room.span]} ${available}`}>
               <h5 className='text-xs text-center flex flex-col justify-center h-full px-1'>{room.code}</h5>
          </div>
     )
}

export const WingRoom: FC<RoomView> = ({room, last = false, indicator = ''}) => {
     const available = !room.available ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500' : 'dark:bg-neutral-950';

     return (
          <div className={`border-5 ${indicator} ${last ? 'border-b-5' : 'border-b-0'} ${hSpan[room.span]} ${width} ${available}`}>
               <h5 className='text-xs text-center flex flex-col justify-center h-full px-2'>{room.code}</h5>
          </div>
     )
};