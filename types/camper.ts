export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment?: string;
}

export interface CamperFilters {
  location?: string;
  form?: "panelTruck" | "fullyIntegrated" | "alcove";

  AC?: boolean;
  Automatic?:boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;

  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
}

export interface Camper {
  id: string;
  name: string;
  form: "panelTruck" | "fullyIntegrated" | "alcove";
  location: string;

  price: number;
  rating: number;
  reviews: Review[];

  transmission?: string;
  engine?: string;

  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;

  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;

  gallery?: (string | { url: string; original?: string })[];
  description?: string;
  features?: string[];
}
