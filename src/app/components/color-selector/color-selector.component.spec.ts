import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { noteColors } from '../../../fixtures';
import { AppModule } from '../../app.module';
import { NoteColor } from '../../models';
import { ButtonComponent } from '../button/button.component';
import { ColorSelectorComponent } from './color-selector.component';

interface ShallowMockBindings {
  availableColors: NoteColor[];
  isColorSelectorEnabled: boolean;
  handleSelectNoteColor: (_: NoteColor) => void;
}

interface ShallowMockArguments {
  shallow: Shallow<ColorSelectorComponent>;
  availableColors?: NoteColor[];
  isColorSelectorEnabled?: boolean;
}

const eventMock = {
  stopPropagation: jasmine.createSpy('event.stopPropagation')
} as any as MouseEvent;

const getShallowMock = async ({
  shallow,
  availableColors = noteColors,
  isColorSelectorEnabled = true
}: ShallowMockArguments): Promise<Rendering<ColorSelectorComponent, ShallowMockBindings>> => {
  const handleSelectNoteColor = (_: NoteColor): void => void 0;

  return shallow.render(
    `
      <prl-color-selector
        [availableColors]="availableColors"
        [isColorSelectorEnabled]="isColorSelectorEnabled"
        (handleSelectNoteColor)="handleSelectNoteColor($event)"
      ></prl-color-selector>
    `,
    {
      bind: {
        availableColors,
        isColorSelectorEnabled,
        handleSelectNoteColor,
      }
    }
  );
};

describe('Color selector', () => {
  let shallow: Shallow<ColorSelectorComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSelectorComponent, AppModule)
  });

  it('should pass truthy `isDisabled` value to button component when there are no colors provided', async () => {
    const { findComponent } = await getShallowMock({ shallow, availableColors: [] });

    const buttonComponentRef = findComponent(ButtonComponent);

    expect(buttonComponentRef.isDisabled).toBeTruthy();
  });

  it('should pass truthy `isDisabled` value to button component when color selector is disabled', async () => {
    const { findComponent } = await getShallowMock({ shallow, isColorSelectorEnabled: false });

    const buttonComponentRef = findComponent(ButtonComponent);

    expect(buttonComponentRef.isDisabled).toBeTruthy();
  });

  it('should make color menu visible when button is clicked', async () => {
    const { instance, find } = await getShallowMock({ shallow });

    instance.toggleColorMenu(eventMock);

    const menuRef = find('.color-selector__menu');

    expect(menuRef.length).toBe(1);
  });

  it('should render all available colors', async () => {
    const { instance, find } = await getShallowMock({ shallow });

    instance.toggleColorMenu(eventMock);

    const colorItemRefs = find('.color-selector__menu-item');

    expect(colorItemRefs.length).toBe(noteColors.length);
  });

  it('should set `background-color` on color item', async () => {
    const { instance, find } = await getShallowMock({ shallow });

    instance.toggleColorMenu(eventMock);

    const [colorItemRef] = find('.color-selector__menu-item');

    expect(colorItemRef.nativeElement.style['background-color']).toBe('rgb(0, 204, 255)');
  });

  it('should set `color` on color item', async () => {
    const { instance, find } = await getShallowMock({ shallow });

    instance.toggleColorMenu(eventMock);

    const [colorItemRef] = find('.color-selector__menu-item');

    expect(colorItemRef.nativeElement.style.color).toBe('rgb(0, 0, 0)');
  });

  it('should select color on color item click', async () => {
    const { instance, find } = await getShallowMock({ shallow });
    const [resultColor] = noteColors;

    instance.toggleColorMenu(eventMock);

    spyOn(instance, 'onSelectNoteColor');

    const [colorItemRef] = find('.color-selector__menu-item');

    colorItemRef.nativeElement.click();

    expect(instance.onSelectNoteColor).toHaveBeenCalledWith(resultColor);
  });

  it('should render color label of color item', async () => {
    const { instance, find } = await getShallowMock({ shallow });
    const [resultColor] = noteColors;

    instance.toggleColorMenu(eventMock);

    spyOn(instance, 'onSelectNoteColor');

    const [colorItemRef] = find('.color-selector__menu-item');

    expect(colorItemRef.nativeElement.innerText).toBe(resultColor.label);
  });

  it('should add global click event listener on component init', async () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    await getShallowMock({ shallow });

    const { args } = addEventListenerSpy.calls.mostRecent();
    const [firstArg] = args;

    expect(args.length).toBe(2);
    expect(firstArg).toBe('click');
  });

  it('should remove global click event listener on component destroy', async () => {
    const removeEventListenerSpy = spyOn(window, 'removeEventListener');

    const { fixture } = await getShallowMock({ shallow });

    fixture.destroy();

    const { args } = removeEventListenerSpy.calls.mostRecent();
    const [firstArg] = args;

    expect(args.length).toBe(2);
    expect(firstArg).toBe('click');
  });

  it('should hide color menu', async () => {
    const { find, instance } = await getShallowMock({ shallow });
    const colorSelectorRef = find('.color-selector');

    instance.toggleColorMenu(eventMock);
    colorSelectorRef.nativeElement.click();

    const menuRef = find('.color-selector__menu');

    expect(menuRef.length).toBe(0);
  });
});
