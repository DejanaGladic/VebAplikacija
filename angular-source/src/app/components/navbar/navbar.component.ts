import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private messages: FlashMessagesService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  klikNaOdjavu(){
      this.auth.logout();
      this.messages.show("Odjavljen si", {cssClass:'alert-success', timeout:4000});
      this.router.navigate(['/login']);
      //ako nema ovog vratice nam na home zbog onog href="#"
      return false;
  }

}
