import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-song-form',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="submit-song-form">
      <mat-form-field class="input-full-width">
        <input #nameInput
               name="name"
               [(ngModel)]="performer.name"
               matInput
               required
               placeholder="performer name">
        <button mat-button
                *ngIf="nameInput.value"
                matSuffix
                mat-icon-button
                aria-label="Clear"
                type="button"
                (click)="performer.name=''">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-form-field class="input-full-width">
        <input #emailInput
               name="email"
               type="email"
               appEmailValidator
               [(ngModel)]="performer.email"
               matInput
               placeholder="If you'd like to be recorded - enter your email">
        <button mat-button
                *ngIf="emailInput.value"
                matSuffix
                mat-icon-button
                aria-label="Clear"
                type="button"
                (click)="performer.email=''">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <div>
        <button mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!f.valid">
          Submit
        </button>
        <button mat-raised-button
                color="accent"
                routerLink="/search"
                queryParamsHandling="preserve">
          Back to List
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./submit-song-form.component.scss']
})
export class SubmitSongFormComponent implements OnInit {
  @Input() performer;
  @Output() submitSong = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.submitSong.emit(form.value);
  }

}
