import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ime: String;
  email:String;
  brojTelefona:String;
  korisnickoIme: String;
  lozinka:String;


  constructor(
    private validation: ValidateService,
    private messages: FlashMessagesService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
 
  }

  registrujSubmit(){
    const user={
      ime:this.ime,
      email:this.email,
      brojTelefona:this.brojTelefona,
      korisnickoIme:this.korisnickoIme,
      lozinka:this.lozinka
    }

    //popunjena mesta
    if(!this.validation.validateRegister(user)){
      this.messages.show("Molimo Vas, popunite sva polja!", {cssClass:'alert-info', timeout:3000});
      return false;
    }
    //email
    if(!this.validation.validateEmail(user.email)){
      this.messages.show("Uneti email nije vazeci!", {cssClass:'alert-info', timeout:3000});      
      return false;
    }
    //phone number
    if(!this.validation.validatePhoneNumber(user.brojTelefona)){
      this.messages.show("Uneti broj telefona nije vazeci!", {cssClass:'alert-info', timeout:3000});      
      return false;
    }
    this.auth.registerUser(user).subscribe(data => {
        if(data.success)
        {
            this.messages.show("Uspesno ste registrovani, mozete poruciti ono sto zelite!", {cssClass:'alert-success', timeout:3000});            
            this.router.navigate(['/login']);

        }else{
            //ako bude gresaka pogledaj ovde
            this.messages.show(data.msg, {cssClass:'alert-danger', timeout:3000});            
            this.router.navigate(['/register']);
        }
        
    });
  }

}
