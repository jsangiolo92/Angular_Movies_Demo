import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'alert', component: AlertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
