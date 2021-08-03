import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { LocationStepComponent } from './order-steps/location-step/location-step.component';
// eslint-disable-next-line
import { ChooseModelStepComponent } from './order-steps/choose-model-step/choose-model-step.component';

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
        children: [
          {
            path: '',
            component: LocationStepComponent,
          },
          {
            path: 'model',
            component: ChooseModelStepComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
