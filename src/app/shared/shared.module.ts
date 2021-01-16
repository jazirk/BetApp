import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedListComponent } from './components/selected-list/selected-list.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SortPipe } from './pipes/sort.pipe';



@NgModule({
  declarations: [SelectedListComponent, PlayerListComponent, ProfileComponent, SortPipe],
    imports: [
        CommonModule,
        NgxPaginationModule
    ],
  exports: [SelectedListComponent, PlayerListComponent, ProfileComponent]
})
export class SharedModule { }
