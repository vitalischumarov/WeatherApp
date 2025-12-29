import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiService {

    apiStringOne: string = "https://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=id:"
    apiStringTwo: string = '&lang=DE&days=3'

    public async loadWeatherData(cityName: string) {
        let response = await fetch(this.apiStringOne+cityName+this.apiStringTwo)
        if (response.status == 200) {
            let data = await response.json();
            return data;
        } else {
            return "error"
        }     
    }
}