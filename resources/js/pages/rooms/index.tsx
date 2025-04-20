import Stairs from '@/components/rooms/stairs';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/models';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rooms',
        href: route('room.index'),
    },
];

export default function RoomIndex({rooms}: {rooms: Room[]}) {
    const wSpan: any = {
        "1": "w-24",
        "1.5": "w-30",
        "2": "w-40"
    };

    const hSpan: any = {
        "1": "h-24",
        "1.5": "h-30",
        "2": "h-40"
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms"/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="text-center">
                    <h1 className='text-2xl font-semibold text-center'>Floor 3</h1>
                    <div className="flex gap-2 justify-center h-6 mt-2">
                        <h2>MONDAY</h2>
                        <Separator orientation='vertical'/>
                        <h2>2:30 PM - 4:00 PM</h2>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex mx-auto">
                        <div>
                            {rooms.filter(room => room.placement == "left").map(room => (
                                <div className={`border-5 border-b-0 last:border-b-5 ${hSpan[room.span]} w-20`}>
                                    <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.code}</h5>
                                </div>
                            ))}
                        </div>
                        <div className='flex'>
                            {rooms.filter(room => room.placement == "center").map(room => room.code == "Stairs" ? <Stairs/> :(
                                <div className={`border-5 border-l-0 last:border-r-0 h-20 ${wSpan[room.span]}`}>
                                    <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.type}</h5>
                                </div>
                            ))}
                        </div>
                        <div>
                            {rooms.filter(room => room.placement == "right").map(room => (
                                <div className={`border-5 border-b-0 last:border-b-5 ${hSpan[room.span]} w-20`}>
                                    <h5 className='text-xs text-center flex flex-col justify-center h-full'>{room.code}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
