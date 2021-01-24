import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/services.service';
import { Book } from './book.entity';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  book_list:Array<Book>;
  filter_list:Array<Book>;
  cart_list:Array<Book>;
  p:number = 1;

  constructor(private service:DataService) {
    this.book_list = new Array<Book>();
    this.filter_list  = new Array<Book>();
    this.cart_list = this.service.getData('cart_values') ? JSON.parse(this.service.getData('cart_values')) : []
   }

  ngOnInit(): void {
    this.getBookList()
  }

  getBookList():void{
    this.service.getBooks().subscribe(res=>{
      this.filter_list = res;
      this.book_list = res;
    })
  }

  identifyBybookID(item:any, index:any){
    return item.bookID;
  }

  applyFilter(event:any) {
    // console.log(event.target.value)
    let filterValue = event.target.value
    filterValue = filterValue.toString().replace(/ +/g, '').toLowerCase(); // Remove whitespace
    this.book_list = this.filter_list.filter(p => p.title.toString().replace(/ +/g, '').toLowerCase().indexOf(filterValue) !== -1 || p.authors.toString().replace(/ +/g, '').toLowerCase().indexOf(filterValue) !== -1);
  }

  addToCart(item:Book){
    let found = false
    for (let index = 0; index < this.cart_list.length; index++) {
      const element = this.cart_list[index];
      if(element.bookID == item.bookID){
        element.qty+=1;
        found = true
        this.cart_list[index] = element
        break;
      }
    }
    if(!found){
      item.qty = 1;
      this.cart_list.push(item)
    }
    this.service.setData('cart_values', JSON.stringify(this.cart_list))
    this.service.messageUpadate.next({type:"add", data:''})
  }


}
