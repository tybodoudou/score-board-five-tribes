import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players: number;

  constructor() { }

  setPlayerNumber(players: number = 2) {
    this.players =  players;
    console.log(this.players);
  }
}
