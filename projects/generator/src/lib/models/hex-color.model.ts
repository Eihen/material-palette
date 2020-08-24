export class HexColor {
  Name: string;
  Color: string;
  ContrastColor: string;

  constructor(init?: Partial<HexColor>) {
    Object.assign(this, init);
  }
}
