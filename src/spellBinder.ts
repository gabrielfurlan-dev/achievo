import { Spellbinder } from "spellbinder";
import variables from "@/schemas/env-variables";

export const sb = new Spellbinder({ baseUrl: variables.BACK_END_URL });
