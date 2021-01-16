import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {debounceTime, distinctUntilChanged, map, mergeAll, switchAll, switchMap, takeUntil} from 'rxjs/operators';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy, AfterViewInit {

  @ViewChild('search') searchText: ElementRef;
  players: any;
  selectedPlayers = [];
  httpObservable$: Subscription;
  keyUpSubscription: Subscription;
  constructor(private httpService: HttpService, private dataServices: DataService) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('players')) {
      this.httpObservable$ = this.httpService.getPlayers().subscribe(players => {
        this.httpService.playerList = players;
        this.players = this.httpService.playerList;
        sessionStorage.setItem('players', JSON.stringify(players));
      });
    } else {
      this.httpService.playerList = JSON.parse(sessionStorage.getItem('players'));
      this.players = this.httpService.playerList;
    }
    this.httpService.playerList && this.httpService.playerList.map(player => {
      player.checked = false;
    });
    this.dataServices.selectedPlayers = [];
  }

  ngAfterViewInit(): void {
    this.keyUpSubscription =  fromEvent(this.searchText.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((event: Event) => (<HTMLInputElement> event.target).value),
      distinctUntilChanged(),
      switchMap(value => this.httpService.searchPlayers(value)),
    ).subscribe(data => {
      this.players = data;
    });
  }

  playerSelectAction(player): void {
    if(player && player.selected) {
      this.selectedPlayers.length < 9 && this.selectedPlayers.indexOf(player.players) === -1 ? this.selectedPlayers.push(player.players) :
        alert('Max 9 players allowed');
    } else {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(player.players), 1);
    }
    this.dataServices.selectedPlayers = this.selectedPlayers;
  }

  ngOnDestroy(): void {
    this.httpObservable$ && this.httpObservable$.unsubscribe();
  }

}
