export interface Vehicle {
  id: string;
  plateNumber: string;
  owner: string;
  model: string;
  qrCode: string;
  isVerified: boolean;
  lastScanned?: Date;
}

export interface ScanResult {
  success: boolean;
  message: string;
  vehicle?: Vehicle;
}
