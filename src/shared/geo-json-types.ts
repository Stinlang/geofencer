export interface GeoJson {
  type: string;
  features: Array<Feature>;
}

export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: Array<[number, number]>;
  };
  properties: { [key: string]: any };
}
