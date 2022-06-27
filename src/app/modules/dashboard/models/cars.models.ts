interface IObjectKeys {
  [key: string]: string | undefined | boolean;
}

export interface Car extends IObjectKeys{
  brand?: string;
  model?: string;
  km?: string;
  year?: string;
  shift?: string;
  fuel?: string;
  color?: string;
  car_type?: string;
  e_car?: boolean;
}
