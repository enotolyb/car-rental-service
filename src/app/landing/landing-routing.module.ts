import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OrderPageComponent } from './pages/order/order-page/order-page.component';
// eslint-disable-next-line
import { LocationStepComponent } from './pages/order/order-steps/location-step/location-step.component';
// eslint-disable-next-line
import { ChooseModelStepComponent } from './pages/order/order-steps/choose-model-step/choose-model-step.component';
// eslint-disable-next-line
import { AdditionalOptionStepComponent } from './pages/order/order-steps/additional-option-step/additional-option-step.component';
// eslint-disable-next-line
import { SummaryOrderStepComponent } from './pages/order/order-steps/summary-order-step/summary-order-step.component';

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
          {
            path: 'option',
            component: AdditionalOptionStepComponent,
          },
          {
            path: 'summary-order',
            component: SummaryOrderStepComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
