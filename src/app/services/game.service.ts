import { Injectable } from '@angular/core';
import { PlayerInterface } from '../modeles/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playersNumber: number;
  playersListItem: PlayerInterface[] = [];
  playerLabel = 'Player';

  constructor() { }

  setPlayerNumber(players: number = 2) {
    this.playersNumber =  players;
  }

  initPlayers(): PlayerInterface[] {
    for (let i = 1; i <= this.playersNumber; i++) {
      this.playersListItem.push(
        {
          id: i,
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
          merchandise: 0
        }
      );
    }
    return this.playersListItem;
    console.log(this.playersListItem);
  }
}
