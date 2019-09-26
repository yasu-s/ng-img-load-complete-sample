import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImgLoadCompleteDirective } from './img-load-complete.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImgLoadCompleteDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
