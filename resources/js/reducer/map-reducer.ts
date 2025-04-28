import { DayType, FloorType, Time24Type } from "@/types/models"
import { ReducerState } from "react";
import { Action } from "sonner";

export interface MapState {
     floor: FloorType,
     day: DayType,
     time: Time24Type
}

export default function mapReducer(state: MapState, action: any) {
     switch(action.type) {
          case "SET_FLOOR":
               return {
                    ...state,
                    floor: action.payload.floor
               };
          case "SET_DAY":
               return {
                    ...state,
                    day: action.payload.day
               }
          case "SET_TIME":
               return {
                    ...state,
                    time: action.payload.time
               }
          case "SET_DATETIME":
               return {
                    ...state,
                    time: action.payload.time,
                    day: action.payload.day
               }
          default:
               return state;
     }
}