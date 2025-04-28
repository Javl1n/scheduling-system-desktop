import { CenterRoom, WingRoom } from "@/components/rooms/room-tile";
import { CenterGroundStairs, CenterStairs, EmergencyStairs } from "@/components/rooms/stairs";
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from "@/components/ui/menubar";
import { DayOptions, FloorOptions, TimeOptions24 } from "@/lib/model-constants";
import { MapContext, RoomContext } from "@/pages/blocks/create";
import { Room } from "@/types/models";
import { usePage } from "@inertiajs/react";
import { useContext } from "react";
import { useControls } from "react-zoom-pan-pinch";
import { v4 as uuidv4 } from "uuid";


export function RoomControl() {

     // const {instance, resetTransform, ...rest} = useControls();
     
     const { state, dispatch} = useContext(MapContext)!;

     return (
          <div className='absolute w-full bottom-10 flex justify-center'>
               <Menubar>
                    <MenubarMenu>
                         <MenubarTrigger><div className="min-w-20">Floor {state.floor}</div></MenubarTrigger>
                         <MenubarContent>
                              <MenubarRadioGroup onValueChange={(value) => dispatch({ type: "SET_FLOOR", payload: {floor: value} })} value={state.floor} >
                                   {FloorOptions.map(floor => (
                                        <MenubarRadioItem key={uuidv4()} value={floor}>Floor {floor}</MenubarRadioItem>
                                   ))}
                              </MenubarRadioGroup>
                         </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                         <MenubarTrigger><div className="min-w-22 text-center">{state.day}</div></MenubarTrigger>
                         <MenubarContent>
                              <MenubarRadioGroup onValueChange={(value) => dispatch({ type: "SET_DAY", payload: {day: value} })} value={state.day} >
                                   {DayOptions.map(day => (
                                        <MenubarRadioItem key={uuidv4()} value={day}>{day}</MenubarRadioItem>
                                   ))}
                              </MenubarRadioGroup>
                         </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                         <MenubarTrigger><div className="min-w-22 text-center">{state.time}</div></MenubarTrigger>
                         <MenubarContent>
                              <MenubarRadioGroup onValueChange={(value) => dispatch({ type: "SET_TIME", payload: {time: value} })} defaultValue={state.time} value={state.time} >
                                   {TimeOptions24.map(time => (
                                        <MenubarRadioItem key={uuidv4()} value={time}>{time}</MenubarRadioItem>
                                   ))}
                              </MenubarRadioGroup>
                         </MenubarContent>
                    </MenubarMenu>
               </Menubar>
          </div>
     )
 }
 
export function TransformContent({rooms}: {rooms: Room[]}) {
     const { sidebarOpen } = usePage().props;
     
     const {state: mapState} = useContext(MapContext)!;
     
     const {instance, zoomToElement, ...rest} = useControls();
 
     return(
         <div className={`scale-50 ${sidebarOpen ? 'h-[calc(100vh-5rem)] w-[calc(100vw-16rem)]' :  'h-[calc(100vh-4rem)] w-[calc(100vw-4rem)]'} flex flex-col justify-center`}>
             <div className="flex mx-auto">
                 <div>
                     {rooms.filter(room => room.placement == "left" && room.floor == mapState.floor).map((room, i, {length}) => (
                         <RoomInformation last={ i + 1 == length} variant='wing' key={`left-${room.number}`} room={room}/>
                     ))}
                     <EmergencyStairs inverse={true} />
                 </div>
                 <div className="flex flex-col">
                     <div className='flex'>
                         {rooms.filter(room => room.placement == "center" && room.floor == mapState.floor).map((room, i, {length}) => (
                             room.code == "Stairs" ? 
                                 room.floor == "1" ? <CenterGroundStairs key={`center-${room.number}`}/> : <CenterStairs key={`center-${room.number}`} /> 
                                 // : <CenterRoom key={`center-${room.number}`} room={room}/>
                                 : <RoomInformation last={i + 1 == length} variant='center' key={`center-${room.number}`} room={room}/>
                         ))}
                     </div>
                     <div className='w-full flex-1 flex pt-8'>
                         <div className='w-8 border-b-5' />
                         <div className='flex-1 border-5 rounded-t-[70px] border-b-0' />
                         <div className='w-8 border-b-5' />
                     </div>
                 </div>
                 <div className=''>
                     {rooms.filter(room => room.placement == "right" && room.floor == mapState.floor).map((room, i, {length}) => (
                         <RoomInformation last={ i + 1 == length} variant='wing' key={`right-${room.number}`} room={room}/>
                     ))}
                     <EmergencyStairs inverse={false} />
                 </div>
             </div>
         </div>
     )
}
 
function RoomInformation({room, variant, last}: {room: Room, variant: "wing" | "center", inverse?: boolean, last?: boolean}) {
     const {room: selectedRoom, setRoom} = useContext(RoomContext);

     const selectRoom = () => {
          if (room.available) {
               setRoom(room)
          }
     }

     const indicator = () => selectedRoom == room ? "bg-green-100" : ""

     // return 
     return (
          <div onClick={selectRoom}>
               {variant === "wing"
                    ? <WingRoom indicator={indicator()} last={last} room={room}/> 
                    : <CenterRoom indicator={indicator()} last={last} room={room}/>}
          </div>
     );
}