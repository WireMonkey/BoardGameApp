import { ErrorHandler, Injectable} from '@angular/core';
import { SlackService } from '../services/slack.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(private slackService: SlackService) { }

    handleError(error: Error) {
        var errorMessage = 'Name: ' + error.name + ', Message: ' + error.message + '., Stacktrace:' + error.stack;
            
        if(environment.production) {
            this.slackService.LogError(errorMessage);
        }
        console.error(error);
    }
}