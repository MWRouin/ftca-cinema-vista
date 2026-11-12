import Person from "@/views/Person";
import { getPublicPeople } from "@/data/movies";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicPeople().map((person) => ({ id: person.id }));
}

export default function PersonPage() {
  return <Person />;
}
