import { Component, output, input, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  initial = input<number>(1);
  min = input<number>(1);
  max = input<number>(99);

  valueChange = output<number>();

  value = signal(1);

  ngOnInit() {
    this.value.set(this.initial());
  }

  decrement() {
    if (this.value() > this.min()) {
      this.value.update(v => v - 1);
      this.valueChange.emit(this.value());
    }
  }

  increment() {
    if (this.value() < this.max()) {
      this.value.update(v => v + 1);
      this.valueChange.emit(this.value());
    }
  }
}