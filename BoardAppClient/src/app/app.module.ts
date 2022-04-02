import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

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
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import { QRCodeModule } from 'angular2-qrcode';

//Components
import { AppComponent } from './app.component';
import { AddBoardGameModalComponent } from './add-board-game-modal/add-board-game-modal.component';
import { ErrorButtonComponent } from './error-button/error-button.component';
import { UserComponent } from './user/user.component';
import { ThemeChangeComponent } from './theme-change/theme-change.component';
import { LogoutComponent } from './logout/logout.component';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { boardGameReducer } from './reducers/boardgame.reducer';
import { playerReducer } from './reducers/player.reducer';
import { BoardgameEffects } from './effects/boardgame.effects';

//services
import { ErrorsHandler } from './ErrorHandling/ErrorHandler';
import { HttpAuthService } from './services/http-auth.service';
import { HttpUnAuthService } from './services/http-un-auth.service';


@NgModule({
  declarations: [
    AppComponent, 
    AddBoardGameModalComponent,
    LogoutComponent,
    UserComponent,
    ErrorButtonComponent,
    ThemeChangeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    OverlayPanelModule,
    NgxSpinnerModule,
    ToolbarModule,
    InputTextareaModule,
    ToastModule,
    PasswordModule,
    MessageModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    QRCodeModule, 
    StoreModule.forRoot({boardgame: boardGameReducer, player: playerReducer}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
      }}),
    EffectsModule.forRoot([BoardgameEffects]),
    AppRoutingModule
  ],
  providers: [
    MessageService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    ConfirmationService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUnAuthService, multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }