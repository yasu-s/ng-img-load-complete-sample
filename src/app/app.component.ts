import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  width = 0;
  height = 0;

  complete(): void {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
  }
}
