import { JwtPayload as Payload} from "jwt-decode";

export interface JwtPayload extends Payload {
  scopes: string[];
}
