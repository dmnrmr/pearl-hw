import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { AppModule } from '../../app.module';
import { ButtonComponent } from './button.component';

interface ShallowMockBindings {
  label: string;
  isDisabled: boolean;
  textColor: string;
  handleClick:(_: MouseEvent) => void;
}

interface ShallowMockArguments {
  shallow: Shallow<ButtonComponent>;
  label?: string;
  isDisabled?: boolean;
  textColor?: string;
  content?: string;
}

const getShallowMock = async ({
  shallow,
  label = 'Foo',
  isDisabled = false,
  textColor = '#000000',
  content = ''
}: ShallowMockArguments): Promise<Rendering<ButtonComponent, ShallowMockBindings>> => {
  const handleClick = (_: MouseEvent): void => void 0;

  return shallow.render(
    `
      <prl-button
        [label]="label"
        [isDisabled]="isDisabled"
        [textColor]="textColor"
        (handleClick)="handleClick($event)"
      >
        ${content}
      </prl-button>
    `,
    {
      bind: {
        label,
        isDisabled,
        textColor,
        handleClick
      }
    }
  );
};

describe('Button', () => {
  let shallow: Shallow<ButtonComponent>;

  beforeEach(() => {
    shallow = new Shallow(ButtonComponent, AppModule)
  });

  it('should disable button', async () => {
    const { find } = await getShallowMock({ shallow, isDisabled: true });

    const buttonRef = find('.button');

    expect(buttonRef.nativeElement.getAttribute('disabled')).not.toBeNull()
  });

  it('should emit an event on button click', async () => {
    const { find, bindings } = await getShallowMock({ shallow });

    const buttonRef = find('.button');

    buttonRef.nativeElement.click();

    expect(bindings.handleClick).toHaveBeenCalled();
  });

  it('should project provided content', async () => {
    const content = '<span>Baz</span>';
    const { find } = await getShallowMock({ shallow, content });

    const buttonContentRef = find('.button__content');

    expect(buttonContentRef.nativeElement.innerHTML).toBe(content)
  });

  it('should render provided label text', async () => {
    const label = 'Bar';
    const { find } = await getShallowMock({ shallow, label });

    const buttonLabelRef = find('.button__label');

    expect(buttonLabelRef.nativeElement.innerText).toBe(label);
  });

  it('should render provided label text color', async () => {
    const textColor = {
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)'
    };
    const { find } = await getShallowMock({ shallow, textColor: textColor.hex });

    const buttonLabelRef = find('.button__label');

    expect(buttonLabelRef.nativeElement.style.color).toBe(textColor.rgb);
  });
});
