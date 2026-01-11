export type VehicleType = "panelTruck" | "fullyIntegrated" | "alcove";

export interface FiltersState {
  location: string;
  vehicleType: VehicleType | "";
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  automatic?: boolean;
}
