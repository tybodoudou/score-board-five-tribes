import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  routeSubscription$ = new Subscription();
  gameArrayFormatted = [];

  scoreBoardTitle = 'Enter all the scores for each items';

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
    ) { }

  ngOnInit(): void {
    this.routeSubscription$ = this.activatedRoute.params.subscribe(
      (param) => {
        this.gameService.setPlayerNumber(+param.id);
        this.gameService.initPlayers();
        this.gameArrayFormatted = this.gameService.formatGameArray();
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.gameArrayFormatted);
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }

}
