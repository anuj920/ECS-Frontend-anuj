import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ], 
  exports:[HeaderComponent, MenuComponent]
})
export class MyCommonModule { }
