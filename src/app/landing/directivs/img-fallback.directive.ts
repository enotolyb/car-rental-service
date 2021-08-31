import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appImgFallback]',
})
export class ImgFallbackDirective implements OnInit {
  @Input('appImgFallback') fallbackUrl: string;

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.onerror = () => {
      this.elementRef.nativeElement.src = this.fallbackUrl;
    };
  }
}
