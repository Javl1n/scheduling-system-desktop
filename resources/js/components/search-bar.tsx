import { ChangeEvent, SetStateAction } from "react";
import { Input } from "./ui/input";

export function SearchBar({search, placeholder, reset}: {search: (item: string) => void, placeholder: string, reset: () => void}) {
     const searchItem = (item: string) => {
          item = item.toLowerCase();

          if (item == "") {
               reset();
          } else {
               search(item);
          }
     }
     
     return <Input className="w-96 select-none" type='text' onChange={(e) => searchItem(e.target.value)} placeholder={placeholder} />;
}