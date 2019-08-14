import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  editUserShow: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  saveButtonClicked(){
    //if email changed save that
    //if password changed save that

    //wait until both calls are done
  }

}
