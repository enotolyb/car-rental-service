import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
