import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//PrimeNg
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';


//Components
import { AppComponent } from './app.component';
import { BoardGameGridComponent } from './board-game-grid/board-game-grid.component';
import { AddExpansionModalComponent } from './add-expansion-modal/add-expansion-modal.component';
import { PlayGameModalComponent } from './play-game-modal/play-game-modal.component';
import { AddBoardGameModalComponent } from './add-board-game-modal/add-board-game-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardGameGridComponent,
    AddExpansionModalComponent,
    PlayGameModalComponent,
    AddBoardGameModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    CalendarModule,
    ButtonModule,
    TooltipModule,
    OverlayPanelModule,
    AccordionModule,
    PanelModule,
    TableModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
