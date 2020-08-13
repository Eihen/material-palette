import { Injectable } from '@angular/core';
import { TinyColor, isReadable } from '@ctrl/tinycolor';
import { HexColor } from '../models/hex-color.model';
import { Algorithm } from '../enums/algorithm.enum';

@Injectable({
  providedIn: 'root'
})
export class MaterialPaletteGeneratorService {
  constructor() { }

  public generatePaletteFromHex(hex: string, algorithm = Algorithm.Constantin): HexColor[] {
    return this.generatePalette(new TinyColor(hex), algorithm);
  }

  public generatePalette(color: TinyColor, algorithm = Algorithm.Constantin): HexColor[] {
    switch (algorithm) {
      case Algorithm.Traditional:
        return this.traditional(color);
      case Algorithm.Constantin:
        return this.constantin(color);
      case Algorithm.Buckner:
        return this.buckner(color);
    }
  }

  private constantin(color: TinyColor): HexColor[] {
    const baseLight = new TinyColor('#ffffff');
    const baseDark = this.multiply(color, color);
    const baseTetrad = color.tetrad();

    return [
      this.toHexColor('50', baseLight.mix(color, 12)),
      this.toHexColor('100', baseLight.mix(color, 30)),
      this.toHexColor('200', baseLight.mix(color, 50)),
      this.toHexColor('300', baseLight.mix(color, 70)),
      this.toHexColor('400', baseLight.mix(color, 85)),
      this.toHexColor('500', baseDark.mix(color, 100)),
      this.toHexColor('600', baseDark.mix(color, 87)),
      this.toHexColor('700', baseDark.mix(color, 70)),
      this.toHexColor('800', baseDark.mix(color, 54)),
      this.toHexColor('900', baseDark.mix(color, 25)),
      this.toHexColor('A100', baseDark.mix(baseTetrad[4], 15).saturate(80).lighten(65)),
      this.toHexColor('A200', baseDark.mix(baseTetrad[4], 15).saturate(80).lighten(55)),
      this.toHexColor('A400', baseDark.mix(baseTetrad[4], 15).saturate(100).lighten(45)),
      this.toHexColor('A700', baseDark.mix(baseTetrad[4], 15).saturate(100).lighten(40))
    ];
  }

  private buckner(color: TinyColor): HexColor[] {
    const baseLight = new TinyColor('#ffffff');
    const baseDark = this.multiply(color, color);
    const baseTetrad = color.tetrad();

    return [
      this.toHexColor('50', baseLight.mix(color, 12)),
      this.toHexColor('100', baseLight.mix(color, 30)),
      this.toHexColor('200', baseLight.mix(color, 50)),
      this.toHexColor('300', baseLight.mix(color, 70)),
      this.toHexColor('400', baseLight.mix(color, 85)),
      this.toHexColor('500', baseDark.mix(color, 100)),
      this.toHexColor('600', baseDark.mix(color, 87)),
      this.toHexColor('700', baseDark.mix(color, 70)),
      this.toHexColor('800', baseDark.mix(color, 54)),
      this.toHexColor('900', baseDark.mix(color, 25)),
      this.toHexColor('A100', baseDark.mix(baseTetrad[3], 15).saturate(80).lighten(48)),
      this.toHexColor('A200', baseDark.mix(baseTetrad[3], 15).saturate(80).lighten(36)),
      this.toHexColor('A400', baseDark.mix(baseTetrad[3], 15).saturate(100).lighten(31)),
      this.toHexColor('A700', baseDark.mix(baseTetrad[3], 15).saturate(100).lighten(28))
    ];
  }

  private traditional(color: TinyColor): HexColor[] {
    return [
      this.toHexColor('50', color.lighten(52)),
      this.toHexColor('100', color.lighten(37)),
      this.toHexColor('200', color.lighten(26)),
      this.toHexColor('300', color.lighten(12)),
      this.toHexColor('400', color.lighten(6)),
      this.toHexColor('500', color),
      this.toHexColor('600', color.darken(6)),
      this.toHexColor('700', color.darken(12)),
      this.toHexColor('800', color.darken(18)),
      this.toHexColor('900', color.darken(24)),
      this.toHexColor('A100', color.lighten(50).saturate(30)),
      this.toHexColor('A200', color.lighten(30).saturate(30)),
      this.toHexColor('A400', color.lighten(10).saturate(15)),
      this.toHexColor('A700', color.lighten(5).saturate(5))
    ];
  }

  private toHexColor(name: string, color: TinyColor): HexColor {
    return new HexColor({
      Name: name,
      Color: color.toHex8String(),
      ContrastColor: color.isLight() ? '#000000' : '#ffffff'
    });
  }

  private multiply(color1: TinyColor, color2: TinyColor): TinyColor {
    return new TinyColor({
      r: Math.floor(color1.r * color2.r / 255),
      g: Math.floor(color1.g * color2.g / 255),
      b: Math.floor(color1.b * color2.b / 255)
    });
  }
}
