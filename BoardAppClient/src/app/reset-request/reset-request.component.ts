import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.css']
})
export class ResetRequestComponent implements OnInit {
  email: string = "";

  constructor(private router: Router, private messageService: MessageService, private spinner: NgxSpinnerService, private userService: UserService) { }

  ngOnInit() {
  }

  emailButtonClick(event: any){
    this.spinner.show();
    this.userService.sendResetEmail(this.email).subscribe(result => {
      this.spinner.hide();
      this.router.navigateByUrl('');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reset email sent.' });
    }, error => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error sending reset email."});
    });


  }

}
