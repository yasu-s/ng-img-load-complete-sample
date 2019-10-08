import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  width = 0;
  height = 0;

  ngOnInit(): void {
    console.log(`ngOnInit - ${Date.now()}`);
  }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit - ${Date.now()}`);
  }

  complete(): void {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    console.log(`complete - ${Date.now()}`);
  }
}
