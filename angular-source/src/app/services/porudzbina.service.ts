import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private http:Http) { }

  dodajStavku(stavka:any){
    let headers=new Headers({'Content-Type':'application/json'});
    //stavka se parsira u json objekat
    return this.http.post("http://localhost:3000/porudzbina/poruciti", JSON.stringify(stavka), {headers:headers})
    //kada se ubaci stavka kao odg dobijamo tu ubacenu stavku
      .map(res=>res.json());

  }

  preuzmiPorudzbine(authToken){
    const headers=new Headers({'Content-Type':'application/json'});
    headers.append('Authorization',authToken);
    return this.http.get("http://localhost:3000/porudzbina/izlistati", {headers:headers})
      .map(res=>res.json());
  }

  //metoda za brisanje videa
  obrisiStavku(stavka: any){ 
    return this.http.delete("http://localhost:3000/porudzbina/obrisati/"+stavka._id)
    //kada se obrise stavka kao odg dobijamo obrisanu stavku
      .map(res=>res.json());
  }
}
