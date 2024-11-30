type SlotMap = Record<string, unknown>;

/**
 * Context type for managing slots in a SlotProvider.
 */
type SlotContextType = Record<string, Record<string, SlotMap>>;

export type { SlotMap, SlotContextType };
