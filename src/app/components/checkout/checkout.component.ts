import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../../app/services/services.service';
import { Book } from '../books/book.entity';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart_list:Array<Book>  = [];
  total_price:number=0;
  total_qty:number = 0;
  checkout_done:boolean = false

  random_num!:string;
  user_books:Array<Book> = []
  check_code!: boolean;
  redirect_time!:number;

  constructor(private service:DataService, private route:Router) {
    this.random_num = this.generateRandomCode(6)
   }

  ngOnInit(): void {
    this.cart_list = this.service.getData('cart_values') ? JSON.parse(this.service.getData('cart_values')) : []
    if(this.cart_list.length==0){
      alert('No Books in Cart, Redirecting to Book List')
      this.route.navigate(['books'])
    }
    this.user_books = this.service.getData('user_books') ? JSON.parse(this.service.getData('user_books')) : []
    this.updateData()
  }


  
  updateData(){
    this.total_price=0;
    this.cart_list.forEach(element => {
      this.total_price += element.price * element.qty;
      this.total_qty += element.qty;
    });
  }


  checkout(){
    this.cart_list.forEach(element=>{
      let book = this.user_books.find(i=> i.bookID == element.bookID)
      if(book){
        book.qty+= element.qty
      }
      else{
        this.user_books.push(element)
      }
    })
    this.cart_list = []
    this.total_price = 0;
    this.total_qty = 0;
    this.checkout_done = true
    this.service.setData('cart_values', JSON.stringify(this.cart_list))
    this.service.setData('user_books', JSON.stringify(this.user_books))
    this.service.messageUpadate.next({type:'reset', data:''})
    this.redirect_time = 5;
    this.redirect_inter = setInterval(()=>{
      this.redirect()
    },1000)
  }

  generateRandomCode(len:number):string { 
    var digits = '0123456789'; 
    let Code = ''; 
    for (let i = 0; i < len; i++ ) { 
      Code += digits[Math.floor(Math.random() * 10)]; 
    } 
    return Code; 
  } 

  checkCode(code:string){
    this.check_code =  code === this.random_num
  }

  redirect_inter:any;
  redirect(){
    if(this.redirect_time<=0){
      clearInterval(this.redirect_inter)
      this.route.navigate(['/user-books'])
    }
    else{
      this.redirect_time-=1
    }
  }
}
