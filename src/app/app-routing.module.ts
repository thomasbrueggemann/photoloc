import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: 'add-new-location', component: AddNewLocationComponent },
  { path: '', component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
