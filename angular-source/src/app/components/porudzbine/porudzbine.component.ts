import { Component, OnInit } from '@angular/core';
import { PorudzbinaService } from '../../services/porudzbina.service';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.css']
})
export class PorudzbineComponent implements OnInit {

  listaPorudzbina:any;
  constructor(
    private porudzS: PorudzbinaService,
    private router: Router,
    private messages: FlashMessagesService,    
    private auth: AuthService  
  ) { }

  ngOnInit() {
    this.auth.loadToken();
    this.porudzS.preuzmiPorudzbine(this.auth.authToken).subscribe(odgovor=>{
      this.listaPorudzbina=odgovor;
    },
    err=>{
      console.log(err);
      return false;
    });
  }

  trenutniKorisnik=this.auth.loggedIn();

  obrisiPorudzbinu(stavka:any){
    var potvrda=confirm("Da li ste sigurni?");
    if(potvrda){
      let porudzbine=this.listaPorudzbina;
      this.porudzS.obrisiStavku(stavka)
        .subscribe(obrisanaStavka=>{
          for(let i=0; i<porudzbine.length; i++)
          {
            if(porudzbine[i]._id===stavka._id)
            {
              //obrisati od indexa i ukljucujuci njega 1 element
              porudzbine.splice(i,1);
            }        
          }
        }, 
        err=>{
          console.log(err);
          return false;
        });
      this.messages.show("Stavka je obrisana!", {cssClass:'alert-success', timeout:1500}); 
    }           
    else
      this.messages.show("Odustali ste od brisanja!", {cssClass:'alert-info', timeout:1500});
    
  }

}
