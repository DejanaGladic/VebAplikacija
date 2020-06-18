import { Component, OnInit, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { JelovnikComponent } from '../jelovnik/jelovnik.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-detalji-ostavci',
  templateUrl: './detalji-ostavci.component.html',
  styleUrls: ['./detalji-ostavci.component.css'],
  inputs:['detaljiOStavci'],
  outputs:['dogIzmeni','dogObrisi','korpa']
})
export class DetaljiOStavciComponent implements OnInit {

  private promeniVrstu:boolean=false;
  food:any;
  private dogIzmeni=new EventEmitter();
  private dogObrisi=new EventEmitter();
  private korpa=new EventEmitter();  

  constructor(
    private messages: FlashMessagesService,
    private auth: AuthService    
  ) { }

  ngOnInit() {
  }

  //ako promenimo vrstu i kliknemo na drugu stavku, vrsta se mora vratiti kao headings
  ngOnChanges(){
    this.promeniVrstu=false;
  }
  klikNaVrstu(){
    this.promeniVrstu=true;
  }

  izmeni(stavka){
    //stavka cije detalje gledamo
    this.dogIzmeni.emit(stavka);
  }

  obrisi(stavka){
    var potvrda=confirm("Da li ste sigurni?");
    if(potvrda){
      this.dogObrisi.emit(stavka);
      this.messages.show("Stavka je obrisana!", {cssClass:'alert-success', timeout:1500}); 
    }           
    else
      this.messages.show("Odustali ste od brisanja!", {cssClass:'alert-info', timeout:1500});      
  }

  dodajUKorpu(stavka){
    this.messages.show('Stavka je dodata u korpu', {cssClass:'alert-success', timeout:5000});  
    this.korpa.emit(stavka);
  }






}
