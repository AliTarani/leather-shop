import { createContext } from "react";
import { SlotContextType } from "../core/types/slotTypes";

export const slotContext = createContext<SlotContextType>({});
