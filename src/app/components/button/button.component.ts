import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() public textColor?: string = '#000000';

  public onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
