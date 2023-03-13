export interface ICats {
  id: string;
  url: string;
  breeds: IBreed[];
}

export interface IBreeds {
  breeds: IBreed[];
}

export interface IBreed {
  id: string;
  name: string;
  child_friendly: number;
  origin: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  life_span: string;
  temperament: string;
  wikipedia_url: string;
}
