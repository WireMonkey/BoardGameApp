import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import {MessageModule} from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MessageService, ConfirmationService} from 'primeng/api';
import { ErrorsHandler } from '../ErrorHandling/ErrorHandler';
import { HttpAuthService } from '../services/http-auth.service';
import { HttpUnAuthService } from '../services/http-un-auth.service';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    NgxSpinnerModule,
    ButtonModule,
    MessageModule,
    FormsModule,
    HttpClientModule
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
})
export class ResetPasswordModule { }
