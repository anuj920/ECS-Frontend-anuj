import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// import {  } from '../../assets/book.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  messageUpadate = new BehaviorSubject({type:'', data:''});
  messageRecieve = this.messageUpadate.asObservable()

  constructor(private http: HttpClient) { }


  getBooks():Observable<any>{
    return this.http.get('../../assets/books.json');
  }

  setData(key:string, data:any){
    localStorage.setItem(key, data)
  }

  getData(key:string):any{
     return localStorage.getItem(key)
  }
}
