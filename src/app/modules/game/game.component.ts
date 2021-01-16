import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  selectedPlayers = [];
  randomNumber;
  constructor(private dataService: DataService, private location: Location) { }

  ngOnInit(): void {
    this.selectedPlayers = this.dataService.selectedPlayers;
    this.randomNumber = Math.floor((Math.random() * 9) + 1);
  }
  goBack(): void {
    this.location.back();
  }
}
