import rawEvents from "./events.json";

export type EventMeta = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  public: boolean;
};

const events = rawEvents as EventMeta[];

/** Events listed on the site (each has its own page under /events/<id>/). */
export const getEvents = (): EventMeta[] => events.filter((e) => e.public);
