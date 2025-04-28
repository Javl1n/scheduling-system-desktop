export type RoomType = "Library" | "Classroom" | "Laboratory" | "Comfort Room" | "Office" | "Misc." | "Structure";
export type FloorType = string | "1" | "2" | "3" | "4";
export type YearType = string | "First" | "Second" | "Third" | "Fourth";
export type DayType = string | "Monday" | "Tuesday" | "Wednesday" | "Thursday"| "Friday" | "Saturday" | "Sunday";
export type Time24Type = string | "07:00" | "08:30" | "10:00" | "11:30" | "13:00" | "14:30" | "16:00" | "17:30" | "19:00";
export interface Subject {
     id: number;
     code: string;
     title: string;
     years: Year[];
}

export interface Year {
     year: YearType;
}

export interface Instructor {
     school_id: string;
     name: string;
     days: Day[];
     subjects: Subject[];
}

export interface Day {
     day: DayType
}

export interface Room {
     code: string;
     description: string;

     span: string;

     placement: "right" | "center" | "left";
     floor: FloorType;
     number: number;

     type: RoomType;

     available: boolean;
}

