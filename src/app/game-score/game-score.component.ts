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
  gameObjectFormatted = {};
  gameKeys = [];

  scoreBoardTitle = 'Enter all the scores for each items';

  constructor(
    private activatedRoute: ActivatedRoute,
    public gameService: GameService
    ) { }

  ngOnInit(): void {
    this.routeSubscription$ = this.activatedRoute.params.subscribe(
      (param) => {
        this.gameService.setPlayerNumber(+param.id);
        this.gameService.setExtension(param.extension);
        this.gameService.initPlayers();
        this.gameObjectFormatted = this.gameService.formatGameObject();
        // to get the key and keep the order ( |keyvalue doesn't work like that)
        this.gameKeys = Object.keys(this.gameObjectFormatted);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.gameService.getScore(this.gameService.playersListItem);
    }
    // console.log(form.value);
    // console.log(this.gameObjectFormatted);
     console.log(this.gameService.playersListItem);
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }

}
