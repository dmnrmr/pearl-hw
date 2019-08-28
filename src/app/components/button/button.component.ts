import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prl-button',
  styleUrls: ['button.component.scss'],
  templateUrl: 'button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() private readonly handleClick = new EventEmitter<MouseEvent>();

  @Input() public label: string;
  @Input() public isDisabled: boolean;

  public onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
