import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RestCountriesService } from '@service/restCountries/rest-countries.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styles: []
})
export class RegionsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  regions:string[];
  subRegions:Map<string, any[]>;
  dataSource:any;
  COLUMNS = ['name', 'population'];


  constructor(private restCountriesService:RestCountriesService) {
    this.regions = [];
    this.subRegions = new Map<string, any[]>();
  }

  ngOnInit() {
    this.restCountriesService.getRegions().subscribe( data => {
      this.regions = data;
    }, err => {
      console.log(err);
    })
  }

  selectRegion(event:any) {
    this.subRegions = new Map<string, any[]>();
    if (event.value) {
      this.restCountriesService.getByRegion(event.value).subscribe( (data:any[]) => {
        data.forEach(element => {
          let currentCountries = this.subRegions.get(element.subregion);
          if (!currentCountries) {
            this.subRegions.set(element.subregion,[{'name':element.name,'population':element.population}]);
          } else {
            currentCountries.push({'name':element.name,'population':element.population});
            this.subRegions.set(element.subregion,currentCountries);
          }
        });
      }, err => {
        console.log(err);
      });
    }
  }

  getKeys(){
    return Array.from(this.subRegions.keys());
  }

  tabChange(event){
    if (event.index > -1) {
      this.dataSource = new MatTableDataSource(this.subRegions.get(event.tab.textLabel));
      this.dataSource.sort = this.sort;
    }
  }

}
