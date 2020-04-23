import { Injectable } from '@angular/core';
import { PlayerInterface } from '../modeles/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playersNumber: number;
  playersListItem: PlayerInterface[] = [];
  playerLabel = 'Player';

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
    console.log(this.gameFormatted);
    console.log(Object.keys(this.gameFormatted));
    return this.gameFormatted;
  }
}
