import { consultDeps, handleConsultRequest, isConsultPath } from './consult';
import type { Env } from './env';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (isConsultPath(url.pathname)) {
      return handleConsultRequest(request, consultDeps(env));
    }
    return env.ASSETS.fetch(request);
  },
};
