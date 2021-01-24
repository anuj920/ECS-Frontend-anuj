import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../app/services/services.service';
import { Book } from '../books/book.entity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart_list:Array<Book>  = [];
  total_price:number=0;
  p:number=1;

  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.cart_list = this.service.getData('cart_values') ? JSON.parse(this.service.getData('cart_values')) : []
    this.updatePrice()
  }




  updatePrice(){
    this.total_price=0;
    this.cart_list.forEach(element => {
      this.total_price += element.price * element.qty
    });
  }

  getPrice(item:Book):number{
    return item.price* item.qty
  }


  addToCart(item:Book, index:number){
    let book = this.cart_list[index]
    book.qty+=1;
    this.cart_list[index] = book
    this.service.setData('cart_values', JSON.stringify(this.cart_list))
    this.total_price += item.price
    this.service.messageUpadate.next({type:"add", data:''})
  }

  removeFromCart(item:Book, index:number){
    let book = this.cart_list[index]
    if(book.qty == 1 || book.qty < 1){
      this.cart_list.splice(index,1)
    }
    else{
      book.qty-=1;
      this.cart_list[index] = book
    }
    this.total_price -= item.price
    this.service.setData('cart_values', JSON.stringify(this.cart_list))
    this.service.messageUpadate.next({type:"remove", data:''})
  }

}
