import { Component, OnInit } from '@angular/core';
import { KaraokempService } from '../karaokemp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-search-song',
  template: `
    <div class="song-search">
      <mat-form-field class="input-full-width">
        <input #searchInput
               matInput
               placeholder="Search song"
               [value]="query"
               (keyup.enter)="searchSong(searchInput.value)">
        <button mat-button
                *ngIf="searchInput.value"
                matSuffix
                mat-icon-button
                aria-label="Clear"
                (click)="searchInput.value=''">
          <span class="close-x">x</span>
        </button>

      </mat-form-field>
      <button mat-fab
              color="primary"
              (click)="searchSong(searchInput.value)"
              [disabled]="searchInput.value === ''">Search
      </button>
    </div>

    <div *ngIf="!searchError" class="song-list">
      <mat-nav-list *ngIf="(songlist$ | async) as songlist; else noResults">
        <a (click)="selectSong(song)"
           mat-list-item
           class="song-item"
           *ngFor="let song of songlist">
          {{ song.title }}
        </a>
      </mat-nav-list>

      <ng-template #noResults>
        <h2 *ngIf="!pending" class="no-results">There are no results for your search query.</h2>
      </ng-template>
    </div>

    <app-error *ngIf="searchError"
               [error]="searchError"
               errorMessage="There was an error. Please try searching again."></app-error>
  `,
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  songlist$;
  query;
  searchError;
  pending = true;

  constructor(
    private karaokempService: KaraokempService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.query = param['query'] || '';
      this.pending = true;
      this.songlist$ = this.karaokempService.find(this.query)
        .do(() => this.pending = false)
        .catch(err => {
          this.pending = false;
          this.searchError = err;
          return Observable.of(null);
        });
    });
  }

  searchSong(query) {
    if (query === null || query === '') {
      return;
    }
    this.searchError = null;
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        query
      }
    });
  }

  selectSong(song) {
    this.karaokempService.setSelectedSong(song);
    this.router.navigate(['select', song.id], { queryParamsHandling: 'preserve' });
  }

}
