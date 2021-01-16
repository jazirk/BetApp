import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  playerList;
  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any> {
    return this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json');
  }

  searchPlayers(searchText): Observable<any>{
   return of(this.playerList.filter(player =>  player.Name.toLowerCase().startsWith(searchText.toLowerCase())));
  }

}
