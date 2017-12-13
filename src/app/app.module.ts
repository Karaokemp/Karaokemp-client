import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SelectSongComponent } from './select-song/select-song.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchSongComponent } from './search-song/search-song.component';
import { KaraokempService } from './karaokemp.service';
import { SelectSongGuard } from './select-song/select-song.guard';
import { FormsModule } from '@angular/forms';
import { SubmitSongFormComponent } from './submit-song-form/submit-song-form.component';
import { SongSubmittedComponent } from './song-submitted/song-submitted.component';
import { EmailValidatorDirective } from './email-validator/email-validator.directive';
import { PersistencyService } from './persistency.service';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectSongComponent,
    SearchSongComponent,
    SubmitSongFormComponent,
    SongSubmittedComponent,
    EmailValidatorDirective,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [
    KaraokempService,
    SelectSongGuard,
    PersistencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
