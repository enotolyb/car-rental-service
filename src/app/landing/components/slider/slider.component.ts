import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  currentSlide = 1;
  private countSlides = 4;

  prev() {
    if (this.currentSlide === 1) {
      this.currentSlide = this.countSlides;
    } else {
      this.currentSlide = this.currentSlide - 1;
    }
  }

  next() {
    if (this.currentSlide === this.countSlides) {
      this.currentSlide = 1;
    } else {
      this.currentSlide = this.currentSlide + 1;
    }
  }

  getTransform(): string {
    return `translateX(-${100 / this.countSlides * (this.currentSlide - 1)}%)`;
  }

  openSlide(num: number) {
    this.currentSlide = num;
  }
}
