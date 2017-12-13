import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

interface SubmitSongReponse {
  numberInLine: number;
  performerNumber: number;
}

// TODO - remove: mock song list
function getSongs(query) {
  const songs = {};
  for (let i = 0; i < 100; i++) {
    songs[i] = query + i;
  }
  return Observable.of(songs);
}

@Injectable()
export class KaraokempService {
  currentQuery;
  currentSongList;
  currentSong;

  presenterName;
  presenterEmail;

  constructor(private http: HttpClient) {
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
        }) .map(result => {
              return Object.keys(result).map(id => ({ id, title: result[id] }));
            })
            .do(songlist => this.currentSongList = songlist);
  }

  setSelectedSong(song) {
    this.currentSong = song;
  }

  getSong(id) {
    return this.currentSong;
  }

  setPresenterDetails(name, email) {
    this.presenterName = name;
    this.presenterEmail = email;
  }

  getPresenterDetails() {
    return {
      name: this.presenterName,
      email: this.presenterEmail
    };
  }

  submit(details) {
    
    return this.http
      .post<SubmitSongReponse>(environment.backend.requestSong,
        {
          email: details.email,
          performerName: details.name,
          songIndex: this.currentSong.id
        });
    // TODO: remove the following lines
    // return Observable.of({
    //   numberInLine: 10,
    //   performerNumber: 7
    // });
  }

}
