export interface ApiData {
  data: IData[];
  loading: boolean;
}

export interface ApiResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: IData[]
}

export interface IData {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: array;
  species: array;
  starships: array;
  vehicles: array;
  url: string;
  created: string;
  edited: string;
}
