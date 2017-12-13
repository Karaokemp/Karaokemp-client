import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="error">
      <div class="mat-error">{{ errorMessage }}</div>
      <div class="show-error-details" (click)="showError = true" *ngIf="!showError">Show error details</div>
      <div *ngIf="showError">{{ error | json }}</div>
    </div>
  `,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() errorMessage;
  @Input() error;
  showError;

  constructor() { }

  ngOnInit() {
  }

}
