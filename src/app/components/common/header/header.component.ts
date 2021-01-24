import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../app/services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart_list:any;
  book_count:number = 0;

  constructor(private service:DataService) {

   }

  ngOnInit(): void {
    this.cart_list = this.service.getData('cart_values') ? JSON.parse(this.service.getData('cart_values')) : []
    this.getCount()
    this.service.messageRecieve.subscribe(res=>{
      if(res && res.type == 'add'){
        this.cart_list = JSON.parse(this.service.getData('cart_values'))
        this.book_count+=1;
      }

      if(res && res.type == 'remove'){
        this.cart_list = JSON.parse(this.service.getData('cart_values'))
        this.book_count-=1;
      }

      if(res && res.type == 'reset'){
        this.cart_list = JSON.parse(this.service.getData('cart_values'))
        this.book_count = 0;
      }
    })
  }


  getCount(){
    this.book_count = 0
    this.cart_list.forEach((element: { qty: number}) => {
      this.book_count+= element.qty
    });
  }

}
