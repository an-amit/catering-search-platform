export interface Caterer {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
  description?: string;
}

export interface CatererListResponse {
  success: true;
  count: number;
  data: Caterer[];
}

export interface CatererResponse {
  success: boolean;
  data: Caterer | Caterer[] | null;
  message?: string;
}

export interface CatererRequest {
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
  description?: string;
}
