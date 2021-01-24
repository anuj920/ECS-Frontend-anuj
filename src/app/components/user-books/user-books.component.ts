import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../app/services/services.service';
import { Book } from '../books/book.entity';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {

  user_books:Array<Book> = []
  filter_books:Array<Book> = []
  p:number = 1;

  constructor(private service:DataService) { }

  ngOnInit(): void {

    this.user_books = this.service.getData('user_books') ? JSON.parse(this.service.getData('user_books')) : []
    this.filter_books = this.user_books
  }



  applyFilter(event:any) {
    // console.log(event.target.value)
    let filterValue = event.target.value
    filterValue = filterValue.toString().replace(/ +/g, '').toLowerCase(); // Remove whitespace
    this.user_books = this.filter_books.filter(p => p.title.toString().replace(/ +/g, '').toLowerCase().indexOf(filterValue) !== -1 || p.authors.toString().replace(/ +/g, '').toLowerCase().indexOf(filterValue) !== -1);
  }

  identifyBybookID(item:any, index:any){
    return item.bookID;
  }

}
