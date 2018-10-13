import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expansion-modal',
  templateUrl: './add-expansion-modal.component.html',
  styleUrls: ['./add-expansion-modal.component.css']
})
export class AddExpansionModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  expDialogShow: boolean = false;
  AddExpansion() {
    this.expDialogShow = true;
  }
}
