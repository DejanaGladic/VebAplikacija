import { Component, OnInit, EventEmitter,Input} from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  inputs: ['hranaInput'],
  outputs:['SelektovanaStavka']
})
export class ListaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //klikom na element liste preuzima se stavka sa svim osobinama i emituje se kao dogadjaj/output
  //hendler za ovaj dogadjaj je u jelovnik.comp (OdabratiStavku)
  public SelektovanaStavka=new EventEmitter();
  odabratiZaVise(stavka:any){
    this.SelektovanaStavka.emit(stavka);
  }

}
