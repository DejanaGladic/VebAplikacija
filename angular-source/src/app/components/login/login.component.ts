import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnickoIme:String;
  lozinka:String;
  constructor(
    private messages: FlashMessagesService,
    private auth: AuthService,
    private router: Router,
    private validation: ValidateService    
  ) { }

  ngOnInit() {
  }

  prijaviSeSubmit(){
    const user={
      korisnickoIme:this.korisnickoIme,
      lozinka:this.lozinka
    }

    //popunjena mesta
    if(!this.validation.validateLogin(user)){
      this.messages.show("Molimo Vas, popunite sva polja!", {cssClass:'alert-info', timeout:3000});
      return false;
    }

    this.auth.authenticateUser(user).subscribe((data:any) => {
      //data.success nesto nece da radi
      if(data.token && data.user){      
        this.auth.storeUserData(data.token, data.user);
        this.messages.show('Uspesno ste prijavljeni!', {cssClass:'alert-success', timeout:3000});  
        this.router.navigate(['/jelovnik']);                            
      }
      else{
        this.messages.show(data.msg, {cssClass:'alert-danger', timeout:3000});            
        this.router.navigate(['/login']);
      }
      
    },
    err=>{
      console.log(err);
      return false;
    });
    

  }
}
