import { CenterStairs, EmergencyStairs } from '@/components/rooms/stairs';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rooms',
        href: route('room.index'),
    },
];

export default function RoomIndex({rooms}: {rooms: Room[]}) {
    const wSpan: any = {
        "1": "w-24",
        "1.5": "w-36",
        "2": "w-44",
    };

    const hSpan: any = {
        "1": "h-24",
        "1.5": "h-36",
        "2": "h-44"
    };

    const { sidebarOpen } = usePage().props;
    // const { state } = useSidebar();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms"/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="text-center absolute w-full flex justify-center pt-4 z-50">
                    <div className="dark:bg-background/40 w-96 p-10 rounded-2xl backdrop-blur-2xl">
                        <h1 className='text-2xl font-semibold text-center'>Floor 3</h1>
                        <div className="flex gap-2 justify-center h-6 mt-2">
                            <h2>MONDAY</h2>
                            <Separator orientation='vertical'/>
                            <h2>2:30 PM - 4:00 PM</h2>
                        </div>
                    </div>
                </div>
                <TransformWrapper smooth={true}>
                    <TransformComponent>
                        <div className={` ${sidebarOpen ? 'h-[calc(100vh-5rem)] w-[calc(100vw-16rem)]' :  'h-[calc(100vh-4rem)] w-[calc(100vw-4rem)]'} flex flex-col justify-center`}>
                            <div className="flex mx-auto">
                                <div>
                                    {rooms.filter(room => room.placement == "left").map(room => (
                                        <div className={`border-5 border-b-0 ${hSpan[room.span]} w-20`}>
                                            <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.code}</h5>
                                        </div>
                                    ))}
                                    <EmergencyStairs inverse={true} />
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex'>
                                        {rooms.filter(room => room.placement == "center").map(room => room.code == "Stairs" ? <CenterStairs/> :(
                                            <div className={`border-5 border-l-0 last:border-r-0 h-20 ${wSpan[room.span]}`}>
                                                <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.code}</h5>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='w-full flex-1 flex pt-8'>
                                        <div className='w-8 border-b-5' />
                                        <div className='flex-1 border-5 rounded-t-2xl border-b-0' />
                                        <div className='w-8 border-b-5' />
                                    </div>
                                </div>
                                <div className=''>
                                    {rooms.filter(room => room.placement == "right").map(room => (
                                        <div className={`border-5 border-b-0 ${hSpan[room.span]} w-20`}>
                                            <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.code}</h5>
                                        </div>
                                    ))}
                                    <EmergencyStairs inverse={false} />
                                </div>
                            </div>
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </AppLayout>
    );
}
