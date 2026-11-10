const STORAGE_KEY = "seatOverrides";

type SeatsLeftOverrides = Record<string, number>;

const readOverrides = (): SeatsLeftOverrides => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as SeatsLeftOverrides;
  } catch {
    return {};
  }
};

export const getSeatsLeft = <T extends { _id: string; totalSeats: number }>(
  event: T
): number => {
  const saved = readOverrides()[event._id];
  return saved === undefined ? event.totalSeats : saved;
};

export const applySeatsLeft = <T extends { _id: string; totalSeats: number }>(
  events: T[]
): T[] => events.map((event) => ({ ...event, totalSeats: getSeatsLeft(event) }));

export const saveSeatsLeft = (id: string, seats: number) => {
  const overrides = readOverrides();
  overrides[id] = seats;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};
