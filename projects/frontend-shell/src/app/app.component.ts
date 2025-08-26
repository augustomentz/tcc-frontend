import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCart } from '@ng-icons/ionicons';
import { octTrackedByClosedNotPlanned } from '@ng-icons/octicons';
import { TitleComponent } from 'projects/frontend-lib/src/lib/components/title/title.component';
import { cartAnimation, mainAnimation } from './animation';
import { v4 as uuidv4 } from 'uuid';

import { REMOTE_CART, REMOTE_CATALOG, REMOTE_CHECKOUT } from '@tcc/shell/remotes';
import { MicrofrontendLoaderDirective } from 'projects/frontend-lib/src/lib/directives/load-mfe.directive';
import { filter, map } from 'rxjs/operators';
import { JsonPipe, NgClass } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIcon, TitleComponent, MicrofrontendLoaderDirective, NgClass, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ ionCart, octTrackedByClosedNotPlanned })],
  animations: [mainAnimation, cartAnimation],
  providers: [MicrofrontendLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  cartOpened = signal(false);
  cartMfe = signal(REMOTE_CART);
  isCheckout = signal(false);

  router = inject(Router);
  remotes = signal<any[]>([REMOTE_CART, REMOTE_CATALOG, REMOTE_CHECKOUT]);

  ngOnInit() {


    this
      .router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => window.location.pathname.includes('checkout'))
      )
      .subscribe(isCheckout => this.isCheckout.set(isCheckout));

    const cartId = localStorage.getItem('cart_id');

    if (!cartId) {
      localStorage.setItem('cart_id', uuidv4());
    }

    window.addEventListener('cart:close', () => this.toggleCart())
  }

  onBackToProducts() {
    this.router.navigate(['/']);
  }

  toggleCart() {
    this.cartOpened.update(state => !state);
  }
}
