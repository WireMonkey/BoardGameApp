import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SlackService {

  ErrorApi: string = "";
  SuggestionsAPI: string = "";
  options = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    )
  }
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

  LogError(error: string) {
    const message = {
      channel: '#errors',
      text: error
    }
    this.http.post(this.ErrorApi, message, this.options).subscribe(data => {

    },
    error => {
      if (error.status && error.status == 200) {

      } else {
        console.log(error);
      }
    });
  };

  logSuggestion(suggestion: string) {
    this.http.post(this.SuggestionsAPI, {text: suggestion}, this.options).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thanks for the suggestion.' });
    },
    error => {
      if (error.status && error.status == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thanks for the suggestion.' });
      } else {
        console.log(error);
      }
    });
  }
}
