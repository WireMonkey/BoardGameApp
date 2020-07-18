import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import {MessageModule} from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { BoardGameGridComponent } from '../board-game-grid/board-game-grid.component';
import { AddExpansionModalComponent } from '../add-expansion-modal/add-expansion-modal.component';
import { PlayGameModalComponent } from '../play-game-modal/play-game-modal.component';
import { RefreshDataComponent } from '../refresh-data/refresh-data.component';
import { BoardGameGridItemComponent } from '../board-game-grid-item/board-game-grid-item.component';
import { BoardgameEditModalComponent } from '../boardgame-edit-modal/boardgame-edit-modal.component';
import { StatBarComponent } from '../stat-bar/stat-bar.component';
import { StatModalComponent } from '../stat-modal/stat-modal.component';
import { LoginComponent } from '../login/login.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UnauthComponent } from '../unauth/unauth.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    BoardGameGridComponent,
    AddExpansionModalComponent,
    PlayGameModalComponent,
    RefreshDataComponent,
    BoardGameGridItemComponent,
    BoardgameEditModalComponent,
    StatBarComponent,
    StatModalComponent,
    LoginComponent,
    CreateUserComponent,
    UnauthComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
    MessageModule,
    ConfirmDialogModule,
    CheckboxModule
  ]
})
export class HomeModule { }
