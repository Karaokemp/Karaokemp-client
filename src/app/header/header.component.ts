import { Component, OnInit } from '@angular/core';
import { PersistencyService } from '../persistency.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6">

      <span routerLink="/search" queryParamsHandling="preserve">Karaokemp</span>

      <span class="app-toolbar-filler"></span>

      <mat-icon [matMenuTriggerFor]="menu">settings</mat-icon>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-checkbox (change)="changeSearchPersistency($event)"
                        [checked]="(persistency$ | async)?.search">
            Save search
          </mat-checkbox>
        </button>
        <button mat-menu-item>
          <mat-checkbox (change)="changePerformerPersistency($event)"
                        [checked]="(persistency$ | async)?.performer">
            Save performer
          </mat-checkbox>
        </button>
      </mat-menu>

    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  persistency$;

  constructor(private persistencyService: PersistencyService) {
  }

  ngOnInit() {
    this.persistency$ = this.persistencyService.persistency$;
  }

  changeSearchPersistency(e) {
    this.persistencyService.changeSearchPersistency(e.checked);
  }

  changePerformerPersistency(e) {
    this.persistencyService.changePerformerPersistency(e.checked);
  }

}
