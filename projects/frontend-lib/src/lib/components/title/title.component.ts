import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ng-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  title = input.required<string>();
  size = input('medium');

  border = input<boolean>();
  full = input<boolean>();
}
