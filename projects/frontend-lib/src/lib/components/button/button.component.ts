import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
@Component({
  selector: 'ng-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input<string>();
  filled = input<boolean>(false);
  full = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');

  onClick = output<void>();

  onClickHandler() {
    this.onClick.emit();
  }
}
