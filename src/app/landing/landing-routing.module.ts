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
// eslint-disable-next-line
import { ModalConfirmOrderComponent } from './components/order/modal-confirm-order/modal-confirm-order.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'order/:orderId',
        component: OrderPageComponent,
        children: [
          {
            path: '',
            component: LocationStepComponent,
            data: {
              step: 1,
            },
          },
          {
            path: 'model',
            component: ChooseModelStepComponent,
            data: {
              step: 2,
            },
          },
          {
            path: 'option',
            component: AdditionalOptionStepComponent,
            data: {
              step: 3,
            },
          },
          {
            path: 'summary',
            component: SummaryOrderStepComponent,
            data: {
              step: 4,
            },
            children: [
              {
                path: 'confirm',
                component: ModalConfirmOrderComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
