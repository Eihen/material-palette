import { Injectable } from '@angular/core';
import { HexColor } from '../models/hex-color.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialPaletteExporterService {
  constructor() { }

  public toCssVars(palette: HexColor[], prefix = '', contrastSuffix = 'ct', root = ':root'): string {
    let css = `${root} {\n`;
    for (const color of palette) {
      css += `  --${prefix}${color.Name}: ${color.Color};\n`;
      css += `  --${prefix}${color.Name}${contrastSuffix}: ${color.ContrastColor};\n`;
    }
    css += '}';
    return css;
  }
}
