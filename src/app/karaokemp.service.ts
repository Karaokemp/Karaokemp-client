import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { PersistencyService } from './persistency.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

interface SubmitSongReponse {
  numberInLine: number;
  performerNumber: number;
}

// For mock purposes
let hasResults = true;
function getSongs(query) {
  const songs = {};
  if (hasResults) {
    for (let i = 0; i < 100; i++) {
      songs[i] = query + i;
    }
  }
  hasResults = !hasResults;
  return Observable.of(songs);
}

@Injectable()
export class KaraokempService {
  currentQuery;
  currentSongList;
  currentSong;
  persistPerformer;

  performer = {};

  constructor(private http: HttpClient, private persistencyService: PersistencyService) {
    this.persistencyService.persistency$.subscribe(persist => {
      this.persistPerformer = persist.performer;
    });
    this.performer = this.persistencyService.getPerformer();
  }

  find(query) {
    if (query === null || query === '') {
      return;
    }
    if (query === this.currentQuery) {
      return Observable.of(this.currentSongList);
    }

    this.currentQuery = query;

    return this.http
      .get(environment.backend.find,
        {
          params: new HttpParams().set('query', query),
          headers: new HttpHeaders()
            .set('Accept', 'application/json')
        })
      // return getSongs(query)
      .map(result => {
        return Object.keys(result).map(id => ({ id, title: result[id] }));
      })
      .map(songlist => songlist.length === 0 ? null : songlist)
      .do(songlist => this.currentSongList = songlist);
  }

  setSelectedSong(song) {
    this.currentSong = song;
  }

  getSong(id) {
    return this.currentSong;
  }

  setPerformerDetails(name, email) {
    this.performer = {
      name,
      email
    };
    if (this.persistPerformer) {
      this.persistencyService.savePerformer(this.performer);
    }
  }

  getPerformerDetails() {
    return this.persistPerformer ? { ...this.performer } : {};
  }

  submit(details) {
    return this.http
      .post<SubmitSongReponse>(environment.backend.requestSong,
        {
          email: details.email,
          performerName: details.name,
          songIndex: this.currentSong.id
        });

    // return Observable.of({
    //   numberInLine: 10,
    //   performerNumber: 7
    // });
  }

}
