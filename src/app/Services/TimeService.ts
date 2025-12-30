import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TimeService {
    
    getCurrentTime(): number{
        const now = new Date();
        return now.getHours();
    }
}