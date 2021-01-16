import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  get isWinner(): boolean {
    return this.player.Bet == this.randomNumber;
  }
  @Input() player;
  @Input() randomNumber;
  imageMap = {
    bet : '../../../../assets/icons/casino.svg',
    price: '../../../../assets/icons/dollar.svg'
  };
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    if(this.isWinner) {
      this.player.Price *= 2;
      this.httpService.playerList[this.httpService.playerList.indexOf(this.player)].Price = this.player.Price;
      sessionStorage.setItem('players', JSON.stringify(this.httpService.playerList));
    }
  }

}
