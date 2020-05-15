import { Injectable } from '@angular/core';
import { PlayerInterface } from '../modeles/player.interface';
import { TranslateService } from '@ngx-translate/core';
import { AwardsInterface } from '../modeles/awards.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playersNumber: number;
  playersListItem: PlayerInterface[] = [];
  alreadyCalculateVizier = false;
  alreadyCalculateCraftman = false;
  awards: AwardsInterface[] = [];
  gameFormatted: any = {};

  categoriesList: any = {
    name:         { isActivated: true },
    coin:         { isActivated: true },
    vizier:       { isActivated: true },
    craftman:     { isActivated: false },
    sage:         { isActivated: true },
    djinn:        { isActivated: true },
    palmTree:     { isActivated: true },
    palace:       { isActivated: true },
    camel:        { isActivated: true },
    object:       { isActivated: false },
    merchandise:  { isActivated: true },
    score:        { isActivated: true }
  };

  constructor(private translate: TranslateService) { }

  setPlayerNumber(players: number = 2): void {
    if (players > 4) {
      this.playersNumber = 4;
    } else if (players < 2) {
      this.playersNumber = 2;
    } else {
      this.playersNumber =  players;
    }
  }

  setExtension(extension: boolean) {
    if (extension) {
      this.categoriesList.craftman.isActivated = true;
      this.categoriesList.object.isActivated = true;
    } else {
      this.categoriesList.craftman.isActivated = false;
      this.categoriesList.object.isActivated = false;
    }
  }

  initPlayers(): PlayerInterface[] {
    this.playersListItem = [];
    for (let i = 1; i <= this.playersNumber; i++) {
      this.playersListItem.push(
        {
          name: this.translate.instant('players.playerLabel', { number: i }),
          coin: 0,
          vizier: 0,
          craftman: 0,
          sage: 0,
          djinn: 0,
          palmTree: 0,
          palace: 0,
          camel: 0,
          object: 0,
          merchandise: 0,
          score: 0
        }
      );
    }
    return this.playersListItem;
  }

  formatGameObject(): any {
    this.gameFormatted = [];
    for (const keyName in this.categoriesList) {
      /* istanbul ignore next */
      if (this.categoriesList.hasOwnProperty(keyName)) {
        const value = this.categoriesList[keyName];
        if (value.isActivated) {
           const categoryRow = [];
           for (let i = 0; i < this.playersNumber; i++) {
             categoryRow.push(this.playersListItem[i][keyName]);
           }
           this.gameFormatted[keyName] = {
               playersRow: categoryRow
             };
         }
      }
   }
    return this.gameFormatted;
  }

  getScore(players: PlayerInterface[]): void {
    for (let i = 0; i < this.playersNumber; i++) {
      this._calculateScore(players[i], i);
    }
    this.alreadyCalculateVizier = false;
    this.alreadyCalculateCraftman = false;
  }

  getAwardsList(): AwardsInterface[] {
    return this.awards = this.playersListItem.map(
      (player) => {
        const obj: AwardsInterface = { playerName: '', playerScore: null};
        obj.playerName = player.name;
        obj.playerScore = player.score;
        return obj;
      }
    )
    .sort((a, b) =>
      b.playerScore - a.playerScore
    );
  }

  /* istanbul ignore next */
  getPlayersListItem(columnId: number, row: string): string {
    return this.playersListItem[columnId][row];
  }

  /* istanbul ignore next */
  resetPlayerListitem(columnId: number, row: string) {
    this.playersListItem[columnId][row] = '';
  }

  private _calculateScore(player: PlayerInterface, i: number): void {
    for (const prop in player) {
      /* istanbul ignore next */
      if (!player.hasOwnProperty(prop)) { continue; }
      switch (prop) {
        // no calculation, just add the result
        case 'coin':
        case 'djinn':
        case 'camel':
        case 'merchandise':
        case 'object':
          this.playersListItem[i].score += +player[prop];
          break;
        // 1pv for each vizier and + 10 for each opponent with stricly less number of vizier
        case 'vizier':
          this._calculateVizier();
          break;
        // *2
        case 'sage':
          this.playersListItem[i].score += +player[prop] * 2;
          break;
        // *3
        case 'palmTree':
          this.playersListItem[i].score += +player[prop] * 3;
          break;
        // *5
        case 'palace':
          this.playersListItem[i].score += +player[prop] * 5;
          break;
        // *2 or if or *3 if the number of craftman are stricly superior to others
        case 'craftman':
          this._calculateCraftman();
          break;
      }
    }
  }

  private _calculateVizier(): void {
    let viziers: number[][] = [];
    let score: number;

    if (!this.alreadyCalculateVizier) {
      viziers = this.playersListItem.map(
        (players, index) => [index, players.vizier]
      )
      .sort((a, b) =>
        b[1] - a[1]
      );

      for (let i = 0, len = viziers.length; i < len; i++) {
        // store the current score
        score = +viziers[i][1];
        for (let j = i; j < len; j++) {
          if (viziers[i][1] > viziers[j][1]) {
            score += 10;
          }
        }
        this.playersListItem[viziers[i][0]].score += score;
      }
      // set the flag already calculate
      this.alreadyCalculateVizier = true;
    }
  }

  private _calculateCraftman(): void {
    let bestScore = 0;
    let bestPlayerNumber: number;

    if (!this.alreadyCalculateCraftman) {
      // first calculate the best player
      for (let i = 0; i < this.playersNumber; i++) {
        if (this.playersListItem[i].craftman > bestScore) {
          bestScore = this.playersListItem[i].craftman;
          bestPlayerNumber = i;
        }
      }

      // set all scores
      for (let i = 0; i < this.playersNumber; i++) {
        if (i === bestPlayerNumber) {
          this.playersListItem[i].score += this.playersListItem[i].craftman * 3;
        } else {
          this.playersListItem[i].score += this.playersListItem[i].craftman * 2;
        }
      }

      // set the flag already calculate
      this.alreadyCalculateCraftman = true;
    }
  }
}
