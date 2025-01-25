import { RouteObject } from "react-router-dom";
export type Router = RouteObject;
export interface Match {
  _id: string;
  user1?: { _id: string; username: string } | null;
  user2?: { _id: string; username: string } | null;
  turns: { user1?: string; user2?: string; winner?: string }[];
  winner?: { _id: string; username: string } | null;
}

export interface Turn {
  user1?: string;
  user2?: string;
  winner?: string;
}

export interface CreateMatchModalProps {
  onClose: () => void;
  onCreate?: () => void;
}
