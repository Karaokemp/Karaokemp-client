import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KaraokempService } from '../karaokemp.service';

@Component({
  selector: 'app-select-song',
  template: `
    <h1>{{ song.title }}</h1>

    <mat-spinner *ngIf="spinner" class="spinner"></mat-spinner>

    <app-submit-song-form *ngIf="!submittedSongDetails"
                          [performer]="performer"
                          (submitSong)="onSubmit($event)">
    </app-submit-song-form>

    <app-song-submitted *ngIf="submittedSongDetails" [songDetails]="submittedSongDetails"></app-song-submitted>

    <div *ngIf="submitError" class="error">
      <div class="mat-error">There was an error. Please try submitting the song again.</div>
      <div class="show-error-details" (click)="showError = true" *ngIf="!showError">Show error details</div>
      <div *ngIf="showError">{{ submitError | json }}</div>
    </div>
  `,
  styleUrls: ['./select-song.component.scss']
})
export class SelectSongComponent implements OnInit {
  song;
  performer;
  submittedSongDetails;
  submitError;
  spinner;
  showError;

  constructor(
    private karaokempService: KaraokempService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.song = this.karaokempService.getSong(params.id);
    });
    this.performer = this.karaokempService.getPerformerDetails();
  }

  onSubmit(songDetails) {
    this.showError = false;
    this.submitError = null;
    this.karaokempService.setPerformerDetails(songDetails.name, songDetails.email);
    this.spinner = true;
    this.karaokempService.submit(songDetails)
      .subscribe(result => {
        this.submittedSongDetails = result;
        this.spinner = false;
      }, err => {
        this.submitError = err;
        this.spinner = false;
      });
  }
}
