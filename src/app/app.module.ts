import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './containers/app/app.component';
import { NoteStoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ColorSelectorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NoteStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
