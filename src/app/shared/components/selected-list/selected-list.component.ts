import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-selected-list',
  templateUrl: './selected-list.component.html',
  styleUrls: ['./selected-list.component.scss']
})
export class SelectedListComponent implements OnInit {

  @Input() selectedPlayers: any;
  imageMap = {
    bet : '../../../../assets/icons/casino.svg',
    price: '../../../../assets/icons/dollar.svg'
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.router.navigate(['game']);
  }

}
