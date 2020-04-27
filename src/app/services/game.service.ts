import { Injectable } from '@angular/core';
import { PlayerInterface } from '../modeles/player.interface';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playersNumber: number;
  playersListItem: PlayerInterface[] = [];
  playerLabel = 'Player';
  alreadyCalculateVizier = false;
  alreadyCalculateCraftman = false;

  listCategories: any = {
    name: { isActivated: true, name: 'Name' },
    coin: { isActivated: true, name: 'Coin' },
    vizier: { isActivated: true, name: 'Vizier' },
    craftman: { isActivated: false, name: 'Craftman' },
    sage: { isActivated: true, name: 'Sage' },
    djinn: { isActivated: true, name: 'Djinn' },
    palmTree: { isActivated: true, name: 'Palm tree' },
    palace: { isActivated: true, name: 'Palace' },
    camel: { isActivated: true, name: 'Camel' },
    object: { isActivated: false, name: 'Object' },
    merchandise: { isActivated: true, name: 'Merchandise' },
    score: { isActivated: true, name: 'Total' }
  };

  gameFormatted = {};

  constructor() { }

  setPlayerNumber(players: number = 2) {
    this.playersNumber =  players;
  }

  initPlayers(): PlayerInterface[] {
    for (let i = 1; i <= this.playersNumber; i++) {
      this.playersListItem.push(
        {
          name: this.playerLabel + ' ' + i,
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

  formatGameObject() {
    for (const keyName in this.listCategories) {
      if (this.listCategories.hasOwnProperty(keyName)) {
        const value = this.listCategories[keyName];
        if (value.isActivated) {
           const categoryRow = [];
           for (let i = 0; i < this.playersNumber; i++) {
             categoryRow.push(this.playersListItem[i][keyName]);
           }
           this.gameFormatted[keyName] = {
               label: value.name,
               playersRow: categoryRow
             };
         }
      }
   }
    return this.gameFormatted;
  }

  getScore(players: PlayerInterface[]) {
    for (let i = 0; i < this.playersNumber; i++) {
      this._calculateScore(players[i], i);
    }
    // TODO remove the score button and put a new one for another game
    // TODO reset alreadyCalculate variables
  }

  private _calculateScore(player: PlayerInterface, i: number) {
    for (const prop in player) {
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

  private _calculateVizier() {
    let viziers = [];
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

  private _calculateCraftman() {
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
