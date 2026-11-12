import type { ComponentType } from "react";

import AfterworkMovienight from "./AfterworkMovienight";
import FilmsDeHammamLifEvent from "./FilmsDeHammamLifEvent";
import YdourEvent from "./YdourEvent";
import YdourEventV2 from "./YdourEventV2";

/** Event page components by event id (the ids in `src/data/events.json`). */
export const EVENT_VIEWS: Record<string, ComponentType> = {
  ydour: YdourEvent,
  "ydour-v2": YdourEventV2,
  "films-de-hammamlif": FilmsDeHammamLifEvent,
  "afterwork-movienight": AfterworkMovienight,
};
