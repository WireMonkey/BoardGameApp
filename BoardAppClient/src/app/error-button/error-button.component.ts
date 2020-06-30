import { Component, OnInit } from '@angular/core';
import { SlackService } from '../services/slack.service';

@Component({
  selector: 'app-error-button',
  templateUrl: './error-button.component.html',
  styleUrls: ['./error-button.component.css']
})
export class ErrorButtonComponent implements OnInit {

  suggestDialogShow: boolean = false;
  suggestions: string = "";

  constructor(public slackService: SlackService) { }

  ngOnInit() {
  }

  sendSuggestions(event: any) {
    this.slackService.logSuggestion(this.suggestions);
    this.suggestions = "";
    this.suggestDialogShow = false;
  }

  cancel(event: any) {
    this.suggestions = "";
    this.suggestDialogShow = false;
  }
}
