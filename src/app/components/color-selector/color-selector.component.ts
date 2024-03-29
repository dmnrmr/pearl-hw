import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NoteColor } from '../../models';

@Component({
  selector: 'prl-color-selector',
  styleUrls: ['color-selector.component.scss'],
  templateUrl: 'color-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSelectorComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) { }

  @Output() private handleSelectNoteColor = new EventEmitter<NoteColor>();

  @Input() public availableColors: NoteColor[] = [];
  @Input() public isColorSelectorEnabled: boolean;

  public isColorMenuVisible: boolean;

  private closeColorMenu(): void {
    this.isColorMenuVisible = false;
    this.cdr.detectChanges();
  }

  private onWindowClick(): void {
    if (!this.isColorMenuVisible) {
      return;
    }

    this.closeColorMenu();
  }

  public ngOnInit(): void {
    window.addEventListener('click', this.onWindowClick.bind(this));
  }

  public ngOnDestroy(): void {
    window.removeEventListener('click', this.onWindowClick.bind(this));
  }

  public toggleColorMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isColorMenuVisible = !this.isColorMenuVisible;
    this.cdr.detectChanges();
  }

  public onSelectNoteColor(color: NoteColor): void {
    this.closeColorMenu();
    this.handleSelectNoteColor.emit(color);
  }

  public trackByColorCode(_: number, { code }: NoteColor): string {
    return code;
  }

  get hasColors(): boolean {
    return this.availableColors.length > 0;
  }
}
