import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetRequestRoutingModule } from './reset-request-routing.module';
import { ResetRequestComponent } from './reset-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorsHandler } from '../ErrorHandling/ErrorHandler';
import { HttpAuthService } from '../services/http-auth.service';
import { HttpUnAuthService } from '../services/http-un-auth.service';


@NgModule({
  declarations: [
    ResetRequestComponent
  ],
  imports: [
    CommonModule,
    ResetRequestRoutingModule,
    NgxSpinnerModule,
    MessageModule,
    FormsModule,
    HttpClientModule,
    ButtonModule
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
export class ResetRequestModule { }
