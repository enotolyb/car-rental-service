import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/general/menu/menu.component';
// eslint-disable-next-line
import { ApplicationBlockComponent } from './components/main/application-block/application-block.component';
import { SliderComponent } from './components/main/slider/slider.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SocialMediaComponent } from './components/general/social-media/social-media.component';
import { LanguagesComponent } from './components/general/languages/languages.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { LocationStepComponent } from './order-steps/location-step/location-step.component';
import { HeaderComponent } from './components/general/header/header.component';
import { BreadcrumbComponent } from './components/order/breadcrumb/breadcrumb.component';
import { ChoosePlaceComponent } from './components/order/choose-place/choose-place.component';
import { DetailsOrderComponent } from './components/order/details-order/details-order.component';
import { InputComponent } from './components/general/input/input.component';
// eslint-disable-next-line
import { ChooseModelStepComponent } from './order-steps/choose-model-step/choose-model-step.component';
import { RadioButtonComponent } from './components/general/radio-button/radio-button.component';
import { CarCardComponent } from './components/order/car-card/car-card.component';
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
    ChoosePlaceComponent,
    DetailsOrderComponent,
    InputComponent,
    ChooseModelStepComponent,
    RadioButtonComponent,
    CarCardComponent,
  ],
  imports: [CommonModule, LandingRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class LandingModule {}
