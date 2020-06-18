import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
      if(user.ime==undefined || user.email==undefined || user.brojTelefona==undefined || user.korisnickoIme==undefined || user.lozinka==undefined){
        return false;
      }else{
        return true;
      }
  }

  validateLogin(user){
    if(user.korisnickoIme==undefined || user.lozinka==undefined){
      return false;
    }else{
      return true;
    }
  }

  validateNewFood(stavka){
    if(stavka.vrsta=="" || stavka.naziv=="" || stavka.cena==""){
      return false;
    }else{
      return true;
    }
  }


  validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return true;
    }else{
      return false;
    }
  }

  validatePhoneNumber(brojTelefona){
    var phoneno1 = /^\d{9}$/;    
    var phoneno2 = /^\d{10}$/;
    if(brojTelefona.match(phoneno1)||brojTelefona.match(phoneno2) ){
        return true;
    }
    else{
        return false;
    }
  }

}
