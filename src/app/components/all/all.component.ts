import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RestCountriesService } from '@service/restCountries/rest-countries.service';
import { CountriesTable } from "@interface/countries-table";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styles: []
})
export class AllComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  COLUMNS = ['name', 'alpha3Code', 'capital', 'region', 'flag', 'view'];
  loading:boolean;

  constructor(
    private restCountriesService:RestCountriesService
  ) {
    this.loading = true;
   }

  ngOnInit() {
    this.restCountriesService.getAll().subscribe( (data:CountriesTable[]) => {
      this.dataSource = new MatTableDataSource<CountriesTable>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
