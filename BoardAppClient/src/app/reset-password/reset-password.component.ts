import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  refreshToken: string;
  password: string;

  constructor(private route: ActivatedRoute, private router: Router,private messageService: MessageService, private spinner: NgxSpinnerService, private service: UserService) { }

  ngOnInit() {
    this.refreshToken = this.route.snapshot.paramMap.get('id');
  }

  changeButtonClick(event: any) {
    this.spinner.show();
    this.service.resetPassword(this.refreshToken,this.password).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed' });
      this.password = "";
      this.refreshToken = "";
      this.router.navigateByUrl('');
      this.spinner.hide();
    }, error => {
      this.password = "";
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error changing password."});
      this.spinner.hide();
    });
  }

}
