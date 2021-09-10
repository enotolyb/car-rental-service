import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { DatepickerComponent } from './components/order/datepicker/datepicker.component';
import { MenuComponent } from './components/general/menu/menu.component';
// eslint-disable-next-line
import { ApplicationBlockComponent } from './components/main/application-block/application-block.component';
import { SliderComponent } from './components/main/slider/slider.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SocialMediaComponent } from './components/general/social-media/social-media.component';
import { LanguagesComponent } from './components/general/languages/languages.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { OrderPageComponent } from './pages/order/order-page/order-page.component';
// eslint-disable-next-line
import { LocationStepComponent } from './pages/order/order-steps/location-step/location-step.component';
import { HeaderComponent } from './components/general/header/header.component';
import { BreadcrumbComponent } from './components/order/breadcrumb/breadcrumb.component';
import { DetailsOrderComponent } from './components/order/details-order/details-order.component';
import { InputComponent } from './components/general/input/input.component';
// eslint-disable-next-line
import { ChooseModelStepComponent } from './pages/order/order-steps/choose-model-step/choose-model-step.component';
import { RadioButtonComponent } from './components/general/radio-button/radio-button.component';
// eslint-disable-next-line
import { AdditionalOptionStepComponent } from './pages/order/order-steps/additional-option-step/additional-option-step.component';
import { CarCardComponent } from './components/order/car-card/car-card.component';
import { CheckboxComponent } from './components/general/checkbox/checkbox.component';
import { ButtonComponent } from './components/general/button/button.component';
// eslint-disable-next-line
import { SummaryOrderStepComponent } from './pages/order/order-steps/summary-order-step/summary-order-step.component';
// eslint-disable-next-line
import { ModalConfirmOrderComponent } from './components/order/modal-confirm-order/modal-confirm-order.component';
import { MapComponent } from './components/order/map/map.component';
import { ImgFallbackDirective } from './directivs/img-fallback.directive';
import { CustomDateAdapter } from './components/order/datepicker/custom-adapter.service';
import { CUSTOM_DATE_FORMATS } from './components/order/datepicker/const';
import { ConfirmPageComponent } from './pages/order/confirm-page/confirm-page.component';
// eslint-disable-next-line
import { OrderCompleteNumberComponent } from './components/order/order-complete-number/order-complete-number.component';
// eslint-disable-next-line
import { ModalOrderCancelComponent } from './components/order/modal-order-cancell/modal-order-cancel.component';
import { ModalWindowComponent } from './components/order/modal-window/modal-window.component';
@NgModule({
  declarations: [
    MenuComponent,
    ApplicationBlockComponent,
    SliderComponent,
    LandingPageComponent,
    SocialMediaComponent,
    LanguagesComponent,
    FooterComponent,
    OrderPageComponent,
    LocationStepComponent,
    HeaderComponent,
    BreadcrumbComponent,
    DetailsOrderComponent,
    InputComponent,
    ChooseModelStepComponent,
    RadioButtonComponent,
    CarCardComponent,
    AdditionalOptionStepComponent,
    CheckboxComponent,
    ButtonComponent,
    DatepickerComponent,
    SummaryOrderStepComponent,
    ModalConfirmOrderComponent,
    MapComponent,
    ImgFallbackDirective,
    ConfirmPageComponent,
    OrderCompleteNumberComponent,
    ModalOrderCancelComponent,
    ModalWindowComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatAutocompleteModule,
    MatOptionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdKEF25ExW7hp_ZudPLxpxXzD78tMfcyg',
    }),
  ],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
})
export class LandingModule {}
