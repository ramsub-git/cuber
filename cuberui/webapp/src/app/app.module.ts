import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import {HumanInteractionComponent} from './human-interaction.component';
import {InteractionComponent} from './interaction.component';
import {Angular2AutoScroll} from 'angular2-auto-scroll/lib/angular2-auto-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HumanInteractionComponent,
    InteractionComponent,
    Angular2AutoScroll
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
