import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit, OnDestroy {
  routeSubscription$ = new Subscription();
  translation: Subscription;
  gameObjectFormatted = {};
  gameKeys = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public gameService: GameService,
    public matDialog: MatDialog,
    private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.routeSubscription$ = this.activatedRoute.params.subscribe(
      (param) => {
        this.gameService.setPlayerNumber(+param.id);
        this.gameService.setExtension(!!param.extension);
      }
    );
    // wait translation asyncly
    this.translation = this.translate.get('players.playerLabel').subscribe(() => {
      this.gameService.initPlayers();
      this.gameObjectFormatted = this.gameService.formatGameObject();
      // to get the key and keep the order ( |keyvalue doesn't work like that)
      this.gameKeys = Object.keys(this.gameObjectFormatted);
    });
  }

  clearIfDefault(columnId: number, row: string) {
     if (this.gameObjectFormatted[row].playersRow[columnId] === this.gameService.playersListItem[columnId][row]) {
      this.gameService.playersListItem[columnId][row] = '';
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.gameService.getScore(this.gameService.playersListItem);
    }

    this.openWinnerDialog();
    // console.log(form.value);
    // console.log(this.gameObjectFormatted);
     console.log(this.gameService.playersListItem);
  }

  openWinnerDialog() {
    this.matDialog.open(WinnerDialogComponent, {
      data: this.gameService.getAwardsList()
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
    this.translation.unsubscribe();
  }

}
