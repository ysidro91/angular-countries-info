import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesService {

  constructor(private httpClient:HttpClient) { }

  getAll(){
    let url = `${BASE_URL}/all?fields=name;capital;region;flag;alpha3Code;`;
    return this.httpClient.get(url);
  }

  getRegions(){
    let url = `${BASE_URL}/all?fields=region;`;
    return this.httpClient.get(url).pipe(
      map( (response:any[]) => {
        // the call returns region array for each country then
        // i need this loop for filter regions
        let regions: string[] = [];
        response.forEach(element => {
          if (!regions.find( function(item){return item === element.region;}) && element.region.length > 0 ) {
            regions.push(element.region);
          }
        });
        return regions; 
      })
    );
  }

  getByRegion(region:string){
    let url = `${BASE_URL}/region/${region}?fields=name;subregion;population;`;
    return this.httpClient.get(url);
  }

  getCountry(name:string){
    let url = `${BASE_URL}/name/${name}`;
    return this.httpClient.get(url).pipe(
      // Because the call returns a array
      map( response => {
        return response[0] ? response[0] : [];
      })
    );
  }

}
