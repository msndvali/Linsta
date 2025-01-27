import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

const sharedComponents: Type<any>[] = [
  SidebarComponent,
  ScrollToTopComponent
];

@NgModule({
  declarations: [...sharedComponents],
  exports: [...sharedComponents],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
