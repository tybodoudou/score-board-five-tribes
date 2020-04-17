import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { PlayerInterface } from '../modeles/player.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  routeSubscription$ = new Subscription();
  playersListItem = [];

  scoreBoardTitle = 'Enter all the scores for each items';

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
    ) { }

  ngOnInit(): void {
    this.routeSubscription$ = this.activatedRoute.params.subscribe(
      (param) => {
        this.gameService.setPlayerNumber(+param.id);
        this.playersListItem = this.gameService.initPlayers();
        console.log(this.playersListItem);
        this._generateForm();
      }
    );
  }

  private _generateForm(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.playersListItem);

  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }

}
