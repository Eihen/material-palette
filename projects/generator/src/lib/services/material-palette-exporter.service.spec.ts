import { TestBed } from '@angular/core/testing';
import { MaterialPaletteExporterService } from './material-palette-exporter.service';
import { MaterialPaletteGeneratorService } from './material-palette-generator.service';
import { random } from '@ctrl/tinycolor';

describe('TestService', () => {
  let exporter: MaterialPaletteExporterService;
  let generator: MaterialPaletteGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    exporter = TestBed.get(MaterialPaletteExporterService);
    generator = TestBed.get(MaterialPaletteGeneratorService);
  });

  it('Should be created', () => {
    expect(exporter).toBeTruthy();
  });

  it('Export CSS', () => {
    const hexColor = random().toHex8String();
    const palette = generator.generatePaletteFromHex(hexColor);

    const css = exporter.toCssVars(palette);
    expect(css).toBeTruthy();
    expect(css.length).toBeGreaterThan(0);
  });
});
