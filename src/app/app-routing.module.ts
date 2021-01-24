import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserBooksComponent } from './components/user-books/user-books.component';

const routes: Routes = [
  {path:'book', component:BooksComponent},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path: 'user-books', component: UserBooksComponent},

  {path:'**', redirectTo:'book'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
