import type { Store } from "./store.type";
import type { Tenent } from "./tenent.type";

export type Rent = {
  amount: number; 
  period: string; 
  store: Store;
  tenent: Tenent;
}