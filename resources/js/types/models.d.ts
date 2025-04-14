export interface Subject {
     id: number;
     code: string;
     title: string;
     years: Year[];
}

export interface Year {
     year: string | "First" | "Second" | "Third" | "Fourth";
}