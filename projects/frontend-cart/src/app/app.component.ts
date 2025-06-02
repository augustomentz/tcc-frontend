import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { Cart } from 'projects/frontend-lib/src/lib/types';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { TitleComponent } from 'projects/frontend-lib/src/lib/components/title/title.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionTrash } from '@ng-icons/ionicons';
import { CounterComponent } from 'projects/frontend-lib/src/lib/components/counter/counter.component';
import { ButtonComponent } from 'projects/frontend-lib/src/public-api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleComponent, CurrencyPipe, NgIcon, CounterComponent, ButtonComponent],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({ ionTrash })],
  styleUrl: './app.component.scss',
  providers: [CurrencyPipe]
})
export class AppComponent {
  cartService = inject(CartService);
  cart = signal<Cart | null>(null);

  ngOnInit() {
    this.getCart();

    window.addEventListener('cart:update', () => this.getCart());
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => {
        this.cart.set(cart);
      }
    });
  }

  onDeleteItem(itemId: string) {
    this.cartService.deleteItem(this.cart()!.id, itemId).subscribe({
      next: () => this.getCart()
    });
  }

  onCounterChange(itemId: string, event: any) {
    this.cartService.addItemToCart(this.cart()!.id, itemId).subscribe({
      next: () => this.getCart()
    });
  }
}
