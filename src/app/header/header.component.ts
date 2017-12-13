import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6">

      <span routerLink="/search" queryParamsHandling="preserve">Karaokemp</span>

      <span class="app-toolbar-filler"></span>

    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
