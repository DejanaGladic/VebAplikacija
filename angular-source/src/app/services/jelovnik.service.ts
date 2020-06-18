import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class JelovnikService {

  constructor(private http:Http) { }

  getJelovnik(){
    const headers=new Headers({'Content-Type':'application/json'});
    return this.http.get("http://localhost:3000/food/jelovnik", {headers:headers})
      .map(res=>res.json());
  }

  //metoda za menjanje videa
  izmeniStavku(stavka: any){ 
    let headers=new Headers({'Content-Type':'application/json'});
    return this.http.put("http://localhost:3000/food/jelovnik/"+stavka._id, JSON.stringify(stavka), {headers:headers})
    //kada se promeni stavka kao odg dobijamo izmenjenu stavku
      .map(res=>res.json());
  }

  //metoda za brisanje videa
  obrisiStavku(stavka: any){ 
    return this.http.delete("http://localhost:3000/food/jelovnik/"+stavka._id)
    //kada se obrise stavka kao odg dobijamo obrisanu stavku
      .map(res=>res.json());
  }

  dodajStavku(stavka:any){
    let headers=new Headers({'Content-Type':'application/json'});
    return this.http.post("http://localhost:3000/food/jelovnik/novaStavka", JSON.stringify(stavka), {headers:headers})
      .map(res=>res.json());

  }
}
