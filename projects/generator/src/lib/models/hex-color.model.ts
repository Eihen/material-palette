import { isReadable } from '@ctrl/tinycolor';

export class HexColor {
  Name: string;
  Color: string;
  ContrastColor: string;

  get IsReadable(): boolean {
    return isReadable(this.Color, this.ContrastColor);
  }

  constructor(init?: Partial<HexColor>) {
    Object.assign(this, init);
  }
}
