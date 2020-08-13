import { TestBed } from '@angular/core/testing';
import { MaterialPaletteGeneratorService } from './material-palette-generator.service';
import { random } from '@ctrl/tinycolor';

describe('TestService', () => {
  let generator: MaterialPaletteGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    generator = TestBed.inject(MaterialPaletteGeneratorService);
  });

  it('Should be created', () => {
    expect(generator).toBeTruthy();
  });

  it('Generate', () => {
    const hexColor = random().toHex8String();
    const palette = generator.generatePaletteFromHex(hexColor);
    expect(palette).toBeTruthy();
    expect(palette.length).toEqual(14);
  });
});
