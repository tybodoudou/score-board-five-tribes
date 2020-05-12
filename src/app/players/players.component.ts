import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: Array<number> = [2, 3, 4];

  constructor(
    private router: Router
    ) { }

  validatePlayers(playersForm: NgForm): void {
    if (playersForm.valid) {
      this.router.navigate(['game', playersForm.value.playersNumber, playersForm.value.extension]);
    }
  }

}
