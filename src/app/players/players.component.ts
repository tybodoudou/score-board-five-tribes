import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Array<number> = [2, 3, 4];
  playerNumber: number = null;

  title = 'How many players?';
  chooseNumber = 'Choose a number';
  playersLabel = 'players';
  validate = 'Validate';

  constructor(
    private gameService: GameService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  validatePlayers(playersForm: NgForm): void {
    this.playerNumber = playersForm.value.playersNumber;
    this.gameService.setPlayerNumber(this.playerNumber);

    this.router.navigate(['game', this.playerNumber]);
  }

}
