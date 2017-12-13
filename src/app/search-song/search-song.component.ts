import { Component, OnInit } from '@angular/core';
import { KaraokempService } from '../karaokemp.service';
import { ActivatedRoute, Router } from '@angular/router';

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
          clear
        </button>

      </mat-form-field>
      <button mat-fab
              color="primary"
              (click)="searchSong(searchInput.value)"
              [disabled]="searchInput.value === ''">Search
      </button>
    </div>

    <mat-nav-list class="song-list">
      <a (click)="selectSong(song)"
         mat-list-item
         class="song-item"
         *ngFor="let song of songlist$ | async">
        {{ song.title }}
      </a>
    </mat-nav-list>  `,
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  songlist$;
  query;

  constructor(
    private karaokempService: KaraokempService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.query = param['query'] || '';
      this.songlist$ = this.karaokempService.find(this.query);
    });
  }

  searchSong(query) {
    if (query === null || query === '') {
      return;
    }
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
