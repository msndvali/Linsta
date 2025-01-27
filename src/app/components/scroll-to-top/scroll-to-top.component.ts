import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {
  public showButton: boolean;

  constructor() {
    this.showButton = false;
  }

  @HostListener('window:scroll', [])
  public onScroll(): void {
    this.showButton = window.scrollY > 300;
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
