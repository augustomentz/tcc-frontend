import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutStepsComponent } from './components/checkout-steps/checkout-steps.component';
import { TitleComponent } from 'projects/frontend-lib/src/public-api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckoutStepsComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-checkout';
}
