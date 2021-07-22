import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    fromEvent(window, 'resize').subscribe(() => {
      const mvp = document.getElementById('meta-viewport');
      if (screen.width < 320) {
        mvp.setAttribute('content', 'user-scalable=no, width=320');
      } else {
        mvp.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    });
  }

}
