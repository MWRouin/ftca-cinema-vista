import rawEvents from "./events.json";
import { resolveAssetUrl } from "@/lib/base-path";

export type EventStatus = "upcoming" | "past";

export type EventMeta = {
  id: string;
  title: string;
  description: string;
  date: string;
  /** Start time, "HH:mm". */
  time: string;
  location: string;
  /** Card image on the events list. */
  image: string;
  /** Set by hand: the site is static, so it can't follow the clock. */
  status: EventStatus;
  public: boolean;
};

const events: EventMeta[] = (rawEvents as EventMeta[]).map((event) => ({
  ...event,
  image: resolveAssetUrl(event.image),
}));

/** Events listed on the site (each has its own page under /events/<id>/). */
export const getEvents = (): EventMeta[] => events.filter((e) => e.public);
