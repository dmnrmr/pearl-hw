import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prl-button',
  styleUrls: ['button.component.scss'],
  templateUrl: 'button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() private readonly handleClick = new EventEmitter<void>();

  @Input() public label: string;

  public onClick(): void {
    this.handleClick.emit();
  }
}
