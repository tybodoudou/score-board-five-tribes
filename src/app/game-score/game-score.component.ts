import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  routeSubscription = new Subscription();


  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
    ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(
      (param) => {
        this.gameService.setPlayerNumber(+param.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
