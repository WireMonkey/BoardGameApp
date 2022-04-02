import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reset/:id', 
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  { path: 'request', 
    loadChildren: () => import('./reset-request/reset-request.module').then(m => m.ResetRequestModule)
  },
  { path: 'collection/:code', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: '', 
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
