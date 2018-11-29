import { RouterModule, Routes } from '@angular/router';

import { AllComponent } from './components/all/all.component';
import { DetailComponent } from './components/detail/detail.component';
import { RegionsComponent } from "./components/regions/regions.component";

const APP_ROUTES: Routes = [
  { path: '', component: AllComponent },
  { path: 'detail/:name', component: DetailComponent },
  { path: 'regions', component: RegionsComponent },
  { path: '**', component: AllComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });
