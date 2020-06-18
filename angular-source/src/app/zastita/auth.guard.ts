import { Injectable } from '@angular/core';
import{Router, CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private auth: AuthService,
        private router: Router
    ){}

       
    canActivate(){
        if(this.auth.ifLoggedIn()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}