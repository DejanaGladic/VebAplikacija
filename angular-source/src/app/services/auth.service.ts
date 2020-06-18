import { Injectable } from '@angular/core';
import {Http, Headers, Response,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //mozemo da mu pristupamo odakle god
  authToken:any;
  user:any;
  constructor(private http:Http) { }

  registerUser(user: any){
    const headers=new Headers({'Content-Type':'application/json'});
    const body = JSON.stringify(user);
    return this.http.post("http://localhost:3000/users/register", body, {headers:headers})
      .map(res=>res.json());
  }

  authenticateUser(user:any){
    const headers=new Headers({'Content-Type':'application/json'});
    const body = JSON.stringify(user);
    return this.http.post("http://localhost:3000/users/authenticate", body, {headers:headers})
      .map(res=>res.json());

  }

  getProfile(){
    const headers=new Headers({'Content-Type':'application/json'});
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get("http://localhost:3000/users/profile", {headers:headers})
      .map(res=>res.json());

  }

  storeUserData(token:any, user:any){
    //id_token = kljuc za validaciju tokena
    //2. parametar je svojstvo
    localStorage.setItem('id_token',token);
    //user pretvaramo u string jer localStorage ne prepoznaje objekat a posle kad ga preuzimamo pretvara se u json
    localStorage.setItem('user',JSON.stringify(user)); 
    console.log(user);
    this.authToken=token;
    this.user=user;   
  }

  ifLoggedIn(){
    return tokenNotExpired('id_token');
  }
  loggedIn(){
    if(this.ifLoggedIn){
      const user=JSON.parse(localStorage.getItem('user')); 
      return user;      
    }else
      return false;
  }
  whoIsLoggedIn(){
    
      if(this.ifLoggedIn){
        const user=JSON.parse(localStorage.getItem('user')); 
        if(user.korisnickoIme=='dejanaGladic')
            return "admin";
        else
            return "obicanKorisnik";
      }
      else
        return "nista";
  }

  loadToken(){
    //preuzima tokene iz localStorage
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  
}
