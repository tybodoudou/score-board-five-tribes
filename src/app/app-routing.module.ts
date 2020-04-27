import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { GameScoreComponent } from './game-score/game-score.component';


const routes: Routes = [
  { path: 'players', component: PlayersComponent},
  { path: 'game', component: GameScoreComponent},
  { path: 'game/:id/:extension', component: GameScoreComponent},
  { path: '**', redirectTo: 'players', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
