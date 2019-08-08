import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Node_modules
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToolbarModule} from 'primeng/toolbar';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabViewModule} from 'primeng/tabview';
import {PasswordModule} from 'primeng/password';

//Components
import { AppComponent } from './app.component';
import { BoardGameGridComponent } from './board-game-grid/board-game-grid.component';
import { AddExpansionModalComponent } from './add-expansion-modal/add-expansion-modal.component';
import { PlayGameModalComponent } from './play-game-modal/play-game-modal.component';
import { AddBoardGameModalComponent } from './add-board-game-modal/add-board-game-modal.component';
import { RefreshDataComponent } from './refresh-data/refresh-data.component';
import { ErrorButtonComponent } from './error-button/error-button.component';
import { BoardGameGridItemComponent } from './board-game-grid-item/board-game-grid-item.component';
import { BoardgameEditModalComponent } from './boardgame-edit-modal/boardgame-edit-modal.component';
import { StatBarComponent } from './stat-bar/stat-bar.component';
import { StatModalComponent } from './stat-modal/stat-modal.component'; 

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { boardGameReducer } from './reducers/boardgame.reducer';
import { playerReducer } from './reducers/player.reducer';
import { BoardgameEffects } from './effects/boardgame.effects';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UnauthComponent } from './unauth/unauth.component'; 
import { ErrorsHandler } from './ErrorHandling/ErrorHandler';
import { LogoutComponent } from './logout/logout.component';
import { HttpAuthService } from './services/http-auth.service';


@NgModule({
  declarations: [
    AppComponent, 
    BoardGameGridComponent,
    AddExpansionModalComponent,
    PlayGameModalComponent,
    AddBoardGameModalComponent,
    RefreshDataComponent,
    ErrorButtonComponent,
    BoardGameGridItemComponent,
    BoardgameEditModalComponent,
    StatBarComponent,
    StatModalComponent,
    ResetPasswordComponent,
    LoginComponent,
    CreateUserComponent,
    UnauthComponent,
    LogoutComponent
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
    DialogModule,
    NgxSpinnerModule,
    ToolbarModule,
    DataViewModule,
    DropdownModule,
    FieldsetModule,
    InputTextareaModule,
    ListboxModule,
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule,
    TabViewModule,
    PasswordModule,
    StoreModule.forRoot({boardgame: boardGameReducer, player: playerReducer}),
    EffectsModule.forRoot([BoardgameEffects])
  ],
  providers: [
    MessageService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthService, multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
