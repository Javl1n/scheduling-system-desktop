import { SetStateAction } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Subject } from "@/types/models";
import { Input } from "../ui/input";

export function SelectYear({setSubjects, subjects}: {setSubjects: SetStateAction<any>, subjects: Subject[]}) {
    const filterYear = (year: string) => {
        if (year == "all") {
            setSubjects([...subjects]);
        } else {
            setSubjects([...subjects.filter(subject => subject.years.map(year => year.year).includes(year))]);
        }
    }

    const yearSelectItems = ["First", "Second", "Third", "Fourth"];

    return (
        <Select defaultValue={"all"} onValueChange={filterYear}>
            <SelectTrigger>
                <SelectValue placeholder="Select year Level"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Year Level</SelectLabel>
                    <SelectItem value={"all"}>All Year</SelectItem>
                    {yearSelectItems.map(year => <SelectItem key={year} value={year}>{year} Year</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function SearchBar({setSubjects, subjects}: {setSubjects: SetStateAction<any>, subjects: Subject[]}) {
    const searchSubject = (item: string) => {
        item = item.toLowerCase();

        if (item == "") {
            setSubjects([...subjects]);
        } else {
            setSubjects([
                ...subjects.filter((subject) => 
                    subject.code.toLowerCase().includes(item) 
                    || subject.title.toLowerCase().includes(item) 
                    || subject.years.map(year => year.year.toLowerCase() + " year").toString().includes(item)
                )
            ]);
        }
    }

    return <Input type='text' onChange={(e) => searchSubject(e.target.value)} placeholder='Search for subjects here' />;
    
}