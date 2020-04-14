import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  validatePlayers(playersForm: NgForm): void {
    console.log(playersForm);
    console.log(playersForm.value.playersNumber);
    // TODO create a service to redirect with the right number of player on the other form
  }

}
