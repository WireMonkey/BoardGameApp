import { Component } from '@angular/core';
import { BoardGameGridComponent } from './board-game-grid/board-game-grid.component';
import { RefreshDataComponent } from './refresh-data/refresh-data.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BoardAppClient';
  constructor(private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
}
