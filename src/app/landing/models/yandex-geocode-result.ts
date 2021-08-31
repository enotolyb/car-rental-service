export interface YandexGeocodeResult {
  response: {
    GeoObjectCollection: {
      featureMember: YandexGeoMemeber[];
    };
  };
}

export interface YandexGeoMemeber {
  GeoObject: {
    Point: {
      pos: string;
    };
  };
}
