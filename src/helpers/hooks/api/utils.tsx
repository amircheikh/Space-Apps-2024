import { HttpStatusCode } from "./constant";
import { HTTPError } from "./types";


export async function handleJSONResponse(resp: Response) {
  if (resp.status >= HttpStatusCode.Ok && resp.status < 300) {
    return resp.json();
  }
  const text = await resp.text();
  throw new HTTPError(resp.status, text);
}