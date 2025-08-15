import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutStepsComponent } from './components/checkout-steps/checkout-steps.component';
import { Cart, TitleComponent } from 'projects/frontend-lib/src/public-api';
import { CartService } from './services/cart.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckoutStepsComponent, TitleComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cartService = inject(CartService);
  cart = signal<Cart | null>(null);

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => this.cart.set(cart),
      error: (error: any) => console.error(error)
    });
  }
}
