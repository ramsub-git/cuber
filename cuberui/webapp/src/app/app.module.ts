import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import {HumanInteractionComponent} from "./human-interaction.component";
import {InteractionComponent} from "./interaction.component";

@NgModule({
  declarations: [
    AppComponent,
    HumanInteractionComponent,
    InteractionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
