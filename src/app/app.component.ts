import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { CATEGORYTYPE } from './models/categoryType';
import { gramList, servers } from './models/configuration';
import { SarrafiyeSocketData, SocketData } from './models/socketData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  connection = webSocket(servers.real);
  socketitems: SocketData[] = [];
  sarrafiyesocketitems: SarrafiyeSocketData[] = [];
  pariteList: SocketData[] = [];
  footerList: SocketData[] = [];
  footerListReplace: SocketData[] = [];
  date: Date = new Date();
  miktar:any;
  sonuc:any;
  secilen:any;
  myDropDown : string="";

  constructor() { }


  ngOnInit() {
    this.CurrencyConverter();
  }


  CurrencyConverter() {
  this.connection.subscribe((data: SocketData[]| any) => {
    if (this.footerList) {
      this.footerList = [];
    }

    data.forEach((item: SocketData) => {
      if (item.Category === CATEGORYTYPE.DOVIZ || item.Category === CATEGORYTYPE.PARITE) {
        this.footerList.push(item);
      }
      if (  item.Category === CATEGORYTYPE.PARITE) {
        this.pariteList.push(item);
        // console.log(item.Ask * this.miktar);
      }
    });
  });

}
onChangeofOptions(newGov: any) {
  //  console.log(newGov);
    newGov = newGov;
    this.sonuc =  newGov * this.miktar ;
    console.log(this.sonuc);
}

}
