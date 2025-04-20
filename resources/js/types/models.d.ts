export interface Subject {
     id: number;
     code: string;
     title: string;
     years: Year[];
}

export interface Year {
     year: string | "First" | "Second" | "Third" | "Fourth";
}

export interface Instructor {
     school_id: string;
     name: string;
     days: Day[];
     subjects: Subject[];
}

export interface Day {
     day: string | "Monday" | "Tuesday" | "Wednesday" | "Thursday"| "Friday" | "Saturday" | "Sunday"
}

export interface Room {
     code: string;
     description: string;

     span: string;

     placement: "right" | "center" | "left";
     floor: "1" | "2" | "3" | "4";
     number: number;

     type:  "Library" | "Classroom" | "Laboratory" | "Comfort Room" | "Office" | "Misc." | "Structure";

     available: boolean;
}