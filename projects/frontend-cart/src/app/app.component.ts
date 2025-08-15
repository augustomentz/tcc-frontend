import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { Cart } from 'projects/frontend-lib/src/lib/types';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { TitleComponent } from 'projects/frontend-lib/src/lib/components/title/title.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionTrash } from '@ng-icons/ionicons';
import { CounterComponent } from 'projects/frontend-lib/src/lib/components/counter/counter.component';
import { ButtonComponent } from 'projects/frontend-lib/src/public-api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleComponent, CurrencyPipe, NgIcon, CounterComponent, ButtonComponent, PercentPipe],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({ ionTrash })],
  styleUrl: './app.component.scss',
  providers: [CurrencyPipe, PercentPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  cartService = inject(CartService);
  cart = signal<Cart | null>(null);
  router = inject(Router);

  ngOnInit() {
    this.getCart();

    window.addEventListener('cart:update', () => this.getCart());
    window.addEventListener('cart:restart', () => {
      localStorage.removeItem('cart_id');

      const uuid = uuidv4();

      localStorage.setItem('cart_id', uuid);

      this.getCart();
    });
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
    this.cartService.addItemToCart(this.cart()!.id, itemId, event).subscribe({
      next: () => this.getCart()
    });
  }

  goToCheckout() {
    window.dispatchEvent(new CustomEvent('cart:close'));

    this.router.navigate(['/checkout']);
  }
}
