//* Libraries imports
import { Spellbinder } from "spellbinder";

import { env } from "@/env";

export const api = new Spellbinder({
  baseUrl: env.NEXT_PUBLIC_API_URL,
});