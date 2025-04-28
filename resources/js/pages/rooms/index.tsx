import { CenterRoom, WingRoom } from '@/components/rooms/room-tile';
import { CenterGroundStairs, CenterStairs, EmergencyStairs } from '@/components/rooms/stairs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
// import { useSidebar } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rooms',
        href: route('room.index'),
    },
];

export default function RoomIndex({rooms}: {rooms: Room[]}) {
    const [floor, setFloor] = useState<string>("1");

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms"/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className='absolute z-50 p-4 select-none'>
                    <h1 className='text-2xl font-semibold'>Floor {floor}</h1>
                </div>
                <TransformWrapper initialScale={1.2} wheel={{ smoothStep: 0.0021, step: 0.4 }} disablePadding centerOnInit smooth={true}>
                    <TransformComponent>
                        <TransformContent rooms={rooms} floor={floor} />
                    </TransformComponent>
                    <RoomControl floor={floor} setFloor={setFloor} />
                </TransformWrapper>
                
            </div>
        </AppLayout>
    );
}

function RoomControl({floor, setFloor}: {floor: string, setFloor: any}) {

    const {instance, resetTransform, ...rest} = useControls();
    
    return (
        <div className='absolute w-full bottom-10 flex justify-center'>
            <Tabs onValueChange={(value) => setFloor(value)} defaultValue={floor}>
                <TabsList className='grid w-full h-full p-2 grid-cols-4 dark:bg-black border select-none'>
                    <TabsTrigger value="1">Floor 1</TabsTrigger>
                    <TabsTrigger value="2">Floor 2</TabsTrigger>
                    <TabsTrigger value="3">Floor 3</TabsTrigger>
                    <TabsTrigger value="4">Floor 4</TabsTrigger>
                </TabsList>
            </Tabs>
            {/* <div onClick={() => resetTransform()}>
                Reset
            </div> */}
        </div>
    )
}

function TransformContent({rooms, floor}: {rooms: Room[], floor: string}) {
    const { sidebarOpen } = usePage().props;

    const {instance, zoomToElement, ...rest} = useControls();

    return(
        <div className={`scale-75 ${sidebarOpen ? 'h-[calc(100vh-5rem)] w-[calc(100vw-16rem)]' :  'h-[calc(100vh-4rem)] w-[calc(100vw-4rem)]'} flex flex-col justify-center`}>
        {/* <div className={`scale-75 flex flex-col justify-center`}> */}
            <div className="flex mx-auto">
                <div>
                    {rooms.filter(room => room.placement == "left" && room.floor == floor).map((room, i, {length}) => (
                        <RoomInformation last={ i + 1 == length} variant='wing' key={`left-${room.number}`} room={room}/>
                    ))}
                    <EmergencyStairs inverse={true} />
                </div>
                <div className="flex flex-col">
                    <div className='flex'>
                        {rooms.filter(room => room.placement == "center" && room.floor == floor).map((room, i, {length}) => (
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
                    {rooms.filter(room => room.placement == "right" && room.floor == floor).map((room, i, {length}) => (
                        <RoomInformation last={ i + 1 == length} variant='wing' key={`right-${room.number}`} room={room}/>
                    ))}
                    <EmergencyStairs inverse={false} />
                </div>
            </div>
        </div>
    )
}

function RoomInformation({room, variant, last}: {room: Room, variant: "wing" | "center", inverse?: boolean, last?: boolean}) {
    return (
        <Dialog>
            <DialogTrigger>
                {variant === "wing" ?
                    <WingRoom
                        last={last}
                        room={room}/>
                :
                    <CenterRoom
                        last={last}
                        room={room}/>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{room.code}</DialogTitle>
                    <DialogDescription>
                        {room.description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <span>Location</span>: Floor {room.floor}, <span className='capitalize'>{room.placement}</span> Room {room.number}
                </div>
                <div>
                    <span>Class</span>: {room.available ? "Available" : "Not Available"}
                </div>
                <div>
                    <span>Room Type</span>: {room.type}
                </div>
                <div>
                    <span>Room Span</span>: x{room.span}
                </div>
            </DialogContent>
        </Dialog>
    );
}