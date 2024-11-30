import { useContext, Context } from "react";
import { SlotContextType } from "../types/slotTypes";
import { slotContext } from "../../context/slotContext";

// Ensure SlotContextType is properly defined
export const useSlot = (
  SlotContext: Context<SlotContextType | undefined>
): SlotContextType => {
  const context = useContext(SlotContext); // Directly get the context value
  if (!context) {
    throw new Error("useSlot must be used within a SlotProvider");
  }
  return context;
};

export function useSlotProps<Props>(props: Props, slot: string): Props {
  const slots = useContext(slotContext);

  return { ...slots[slot], slot, ...props };
}
