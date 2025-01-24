import { create } from 'zustand';
import { Vehicle } from '../types';

interface StoreState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  verifyVehicle: (qrCode: string) => boolean;
}

export const useStore = create<StoreState>((set, get) => ({
  vehicles: [],
  addVehicle: (vehicle) => 
    set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  verifyVehicle: (qrCode) => {
    const vehicle = get().vehicles.find(v => v.qrCode === qrCode);
    if (vehicle) {
      vehicle.lastScanned = new Date();
      return vehicle.isVerified;
    }
    return false;
  },
}));
