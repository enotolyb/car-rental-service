import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent
      }
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class LandingRoutingModule {
}
