import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octPackageDependents } from '@ng-icons/octicons';
import { ButtonComponent } from 'projects/frontend-lib/src/lib/components/button/button.component';
import { CheckoutService } from '../../services/checkout.service';
import { Cart } from '@frontend-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-steps',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ButtonComponent, NgIcon],
  viewProviders: [provideIcons({ octPackageDependents })],
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutStepsComponent {
  cart = input.required<Cart>();
  step = 0;

  personalForm: FormGroup;
  billingForm: FormGroup;

  private _checkoutService = inject(CheckoutService);
  private _router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.billingForm = this.fb.group({
      cardholder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]{16,19}$')]],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  get steps() {
    return ['Personal', 'Billing', 'Confirmation'];
  }

  finish() {
    this._checkoutService
      .finishOrder(this.cart(), this.personalForm.value, this.billingForm.value)
      .subscribe(() => {
        window.dispatchEvent(new CustomEvent('cart:restart'))
        this._router.navigate(['/']);
      });
  }

  nextStep() {
    if (this.step === 0 && this.personalForm.valid) {
      this.step++;
    } else if (this.step === 1 && this.billingForm.valid) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 0) this.step--;
  }
}
