import { get } from "../../../services/requests/types";
import { Optional } from "../../../utils/types";

type user = Omit<get["user"]["res"], "id" | "createdAt">;
type getUser = Optional<user, keyof user>;

export type settings = getUser & { poster?: string; avatar?: string };
export type setUpdatesValuesType = {
  key: keyof settings;
  value: any;
};
