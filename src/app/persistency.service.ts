import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const localStorageName = 'Karaokemp';

@Injectable()
export class PersistencyService {
  localStorageData = {
    persist: {
      search: true,
      performer: true
    },
    performer: {}
  };
  persistency$ = new BehaviorSubject(this.localStorageData.persist);

  constructor() {
    const localStorageData = JSON.parse(localStorage.getItem(localStorageName));
    Object.assign(this.localStorageData, localStorageData);
    this.persistency$.next(this.localStorageData.persist);
  }

  changeSearchPersistency(flag: boolean) {
    this._changePersistency(flag, 'search');
  }

  changePerformerPersistency(flag: boolean) {
    this._changePersistency(flag, 'performer');
  }

  _changePersistency(flag, key) {
    this.localStorageData.persist[key] = flag;
    localStorage.setItem(localStorageName, JSON.stringify(this.localStorageData));
    this.persistency$.next(this.localStorageData.persist);
  }

  savePerformer(performer) {
    this.localStorageData.performer = performer;
    localStorage.setItem(localStorageName, JSON.stringify(this.localStorageData));
  }

  getPerformer() {
    return this.localStorageData.performer;
  }
}
