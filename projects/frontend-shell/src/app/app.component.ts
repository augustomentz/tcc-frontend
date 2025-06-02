import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCart } from '@ng-icons/ionicons';
import { TitleComponent } from 'projects/frontend-lib/src/lib/components/title/title.component';
import { cartAnimation, mainAnimation } from './animation';
import { v4 as uuidv4 } from 'uuid';

import { REMOTE_CART } from '@tcc/shell/remotes';
import { MicrofrontendLoaderDirective } from 'projects/frontend-lib/src/lib/directives/load-mfe.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIcon, TitleComponent, MicrofrontendLoaderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({ ionCart })],
  animations: [mainAnimation, cartAnimation],
  providers: [MicrofrontendLoaderDirective]
})
export class AppComponent {
  cartOpened = signal(false);
  cartMfe = signal(REMOTE_CART);

  ngOnInit() {
    const cartId = localStorage.getItem('cart_id');

    if (!cartId) {
      localStorage.setItem('cart_id', uuidv4());
    }
  }

  toggleCart() {
    this.cartOpened.update(state => !state);
  }
}
