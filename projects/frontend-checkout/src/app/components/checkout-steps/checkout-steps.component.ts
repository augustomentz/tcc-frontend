import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octPackageDependents } from '@ng-icons/octicons';
import { ButtonComponent } from 'projects/frontend-lib/src/lib/components/button/button.component';

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
  step = 0;

  personalForm: FormGroup;
  billingForm: FormGroup;

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
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]{16,19}$')]],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  get steps() {
    return ['Personal', 'Billing', 'Confirmation'];
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