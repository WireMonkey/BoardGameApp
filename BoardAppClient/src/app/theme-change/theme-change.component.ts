import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-change',
  templateUrl: './theme-change.component.html',
  styleUrls: ['./theme-change.component.css']
})
export class ThemeChangeComponent implements OnInit {
  checked: boolean;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("theme")){
      this.checked = localStorage.getItem("theme") == "Dark";
    }

    this.setTheme();
  }

  setTheme() {
    if(this.checked){
      document.getElementById('theme').setAttribute('href', 'assets/Dark.css');
    } else {
      document.getElementById('theme').setAttribute('href', 'assets/Light.css');
    }
  }

  checkChanged(event: any){
    let theme = "Dark";
    if(!this.checked){
      theme = "Light";
    }

    localStorage.setItem("theme",theme);

    this.setTheme();
  }

}
