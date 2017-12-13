import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KaraokempService } from '../karaokemp.service';

@Injectable()
export class SelectSongGuard implements CanActivate {

  constructor(private karaokempService: KaraokempService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.karaokempService.currentSong) {
      return true;
    }
    this.router.navigate(['/search'], {
      queryParams: route.queryParams
    });
    return false;
  }
}
