import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-submitted',
  template: `
    <h2>Thank you! Your song was submitted.</h2>
    <h2>Your number in line: {{ songDetails.numberInLine }}</h2>
    <h2>Performer number: {{ songDetails.performerNumber }}</h2>
    <h3>(In case the auto-pilot is on)</h3>
    <div>
      <button mat-raised-button
              color="primary"
              routerLink="/search"
              queryParamsHandling="preserve">
        Back to song search
      </button>
    </div>
  `,
  styleUrls: ['./song-submitted.component.scss']
})
export class SongSubmittedComponent implements OnInit {
  @Input() songDetails;

  constructor() {
  }

  ngOnInit() {
  }

}
