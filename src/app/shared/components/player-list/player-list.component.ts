import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnChanges {

  @Input() playersList: any;
  checkedArray = [];
  players = [];
  playerListHeader = ['SELECT', 'PLAYER NAME', 'AVATAR', 'BET', 'PRICE'];
  @Output() selectEmitter = new EventEmitter();
  imageMap = {
    bet: '../../../../assets/icons/casino.svg',
    price: '../../../../assets/icons/dollar.svg'
  };
  totalRecords: number;
  page = 1;
  sortableColumn;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalRecords =  changes.playersList.currentValue.length;
  }

  checkBoxAction(event, player, index): void {
    this.checkedArray = this.dataService.selectedPlayers;
    this.playersList[this.playersList.indexOf(player)].checked = event.target.checked &&
      (this.checkedArray ? this.checkedArray.length < 9 : true);
    if (event) {
      this.selectEmitter.emit({players: player, selected: event.target.checked});
    }
  }

  sort(header): void{
    console.log('called');
    this.sortableColumn = header;
  }
}
