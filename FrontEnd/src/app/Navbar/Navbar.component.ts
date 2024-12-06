import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeMenu() {
    const clickInput = document.getElementById("click") as HTMLInputElement;
    if (clickInput) {
      clickInput.checked = false; // Uncheck the checkbox to hide the menu
    }
  }

}
