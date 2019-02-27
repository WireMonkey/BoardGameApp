import { ErrorHandler, Injectable} from '@angular/core';
import { SlackService } from '../services/slack.service';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(private slackService: SlackService) { }

    handleError(error: Error) {
        //this.slackService.LogError('Name: ' + error.name + ', Message: ' + error.message + '.');
        console.log(error);
    }
}