export type TransferStatus =
  | "PENDING"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "RECEIVED"
  | "CANCELLED";

export interface HubTransferItem {
  id: string;
  shipmentId: string;
  fromHubId: string;
  toHubId: string;
  status: TransferStatus;
  dispatchedAt?: string | null;
  receivedAt?: string | null;
  createdAt: string;
  shipment?: {
    id: string;
    trackingNumber: string;
    parcelType: string;
    weight: number;
    status: string;
  };
  fromHub: {
    id: string;
    name: string;
    code: string;
    address: string;
  };
  toHub: {
    id: string;
    name: string;
    code: string;
    address: string;
  };
  creator?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface CreateHubTransferPayload {
  toHubId: string;
  note?: string;
}

export interface ReceiveHubTransferPayload {
  note?: string;
}
