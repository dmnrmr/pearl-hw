import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { HeaderComponent } from './components/header/header.component';
import { NoteComponent } from './components/note/note.component';
import { AppComponent } from './containers/app/app.component';
import { NoteFormService } from './services/form.service';
import { NoteStoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ColorSelectorComponent,
    HeaderComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    NoteFormService,
    NoteStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
