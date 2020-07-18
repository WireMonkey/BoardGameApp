import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetRequestComponent } from './reset-request.component';


const requestRoutes: Routes = [
  {
    path: '',
    component: ResetRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(requestRoutes)],
  exports: [RouterModule]
})
export class ResetRequestRoutingModule { }
