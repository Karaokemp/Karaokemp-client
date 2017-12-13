import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectSongComponent } from './select-song/select-song.component';
import { SearchSongComponent } from './search-song/search-song.component';
import { SelectSongGuard } from './select-song/select-song.guard';

const routes: Routes = [
  {path: 'select/:id', component: SelectSongComponent, canActivate: [SelectSongGuard]},
  {path: 'search', component: SearchSongComponent},
  {path: '**', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
