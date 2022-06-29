interface IObjectKeys {
  [key: string]: string | undefined | boolean | number | Damage[] | Date;
}

export  interface Damage {
  problemPiece?: string;
  cost?: number;
}

export interface Car extends IObjectKeys{
  brand?: string;
  model?: string;
  km?: string;
  year?: Date;
  shift?: string;
  fuel?: string;
  color?: string;
  car_type?: string;
  e_car?: boolean;
  damage?: Damage[];
  price?: number;
}
