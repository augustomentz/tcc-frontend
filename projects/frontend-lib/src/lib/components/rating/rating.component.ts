import { Component, Output, EventEmitter, ChangeDetectionStrategy, output, input, effect, signal } from '@angular/core';

@Component({
  selector: 'ng-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  ratingChange = output<number>();
  rating = input<number>(0);

  value = signal(0);

  max = 5;
  isDisabled = false;

  ngOnInit() {
    this.value.set(this.rating());
  }

  setRating(rating: number) {
    if (this.isDisabled) return;

    this.value.set(rating);

    this.ratingChange.emit(this.value());
  }

  get stars() {
    return Array(this.max).fill(0);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}