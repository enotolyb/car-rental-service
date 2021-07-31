import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'order',
        component: OrderPageComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
