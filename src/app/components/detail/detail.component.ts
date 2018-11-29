import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { RestCountriesService } from '@service/restCountries/rest-countries.service';
import { Languages } from "@interface/languages";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [`
    .grid-container {
      margin: 20px;
    }
    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
    }
    .dashboard-card-content {
      text-align: center;
    }
  `],
})
export class DetailComponent implements OnInit {
  name:string;
  cards:any[];
  languagesDatasource:any;
  LANGUAGES_COLUMNS = ['iso639_1', 'iso639_2', 'name', 'nativeName'];

  constructor(
    private activatedRoute:ActivatedRoute,
    private restCountriesService:RestCountriesService
    ) {
      this.cards = [];
      this.activatedRoute.params.subscribe( params => this.name = params['name'] );
  }

  ngOnInit(){
    this.restCountriesService.getCountry(this.name).subscribe( data => {
      this.languagesDatasource = new MatTableDataSource<Languages>(data.languages);
      this.cards = [
        { title: 'Flag', cols: 1, rows: 1, flag: data.flag },
        { title: 'Currencies', cols: 1, rows: 1, currencies: data.currencies },
        { title: 'Languages', cols: 2, rows: 1 },
        { title: 'Location', cols: 1, rows: 2, borders: data.borders, region: data.region, subregion: data.subregion, timezones: data.timezones },
        { title: 'Card 5', cols: 1, rows: 1 }
      ];
    }, err => {
      console.log(err);
    });
  }

}
