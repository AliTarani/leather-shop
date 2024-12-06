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

export function useSlotProps<Props>(
  props: Props & { slot?: string },
  defaultSlot: string
): Props {
  const slots = useContext(slotContext); // Ensure the hook is always called

  // Determine the effective slot
  const slot = props.slot || defaultSlot;

  // Return the original props if no slot is defined
  if (!slot) return props;

  // Return merged props with slot content
  const slotProps = slots[slot] || {}; // Handle cases where the slot doesn't exist
  return { ...slotProps, slot, ...props } as Props;
}
