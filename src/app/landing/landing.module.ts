import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ApplicationBlockComponent } from './components/application-block/application-block.component';
import { SliderComponent } from './components/slider/slider.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    MenuComponent,
    ApplicationBlockComponent,
    SliderComponent,
    LandingPageComponent,
    SocialMediaComponent,
    LanguagesComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule {
}
