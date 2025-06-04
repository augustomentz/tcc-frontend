import { CurrencyPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'projects/frontend-lib/src/lib/components/button/button.component';
import { CardComponent } from 'projects/frontend-lib/src/lib/components/card/card.component';
import { RatingComponent } from 'projects/frontend-lib/src/lib/components/rating/rating.component';
import { ProductService } from './services/product.service';
import { Product } from 'projects/frontend-lib/src/lib/types';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, ButtonComponent, CurrencyPipe, FormsModule, RatingComponent, PercentPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  products = signal<Product[]>([]);

  productService = inject(ProductService);
  cartService = inject(CartService);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (result: Product[]) => this.products.set(result),
      error: (error: any) => console.error(error)
    });
  }

  onRatingChange(id: string, rating: number) {
    this.productService.updateRating(id, rating).subscribe({
      next: () => {},
      error: (error: any) => console.error(error)
    });
  }

  onAddToCart(productId: string) {
    this.cartService.addItemToCart(productId).subscribe({
      next: (result: Boolean) => {
        if (result) {
          window.dispatchEvent(new CustomEvent('cart:update'))
        }
      },
      error: (error: any) => console.error(error)
    });
  }
}
