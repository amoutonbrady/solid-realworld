import { IArticle } from "../types/article.interface";
import { IComment } from "../types/comment.interface";
import { IProfile } from "../types/profile.interface";
import { IUser } from "../types/user.interface";

/**
 * This is a very simple HTTP client around fetch that saves some typings
 */
function httpClient(endpoint: string, request: typeof fetch) {
  let auth = "";

  async function makeRequest(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: any,
    key?: string
  ) {
    const authHeader = auth ? { authorization: `Token ${auth}` } : {};

    const opts: RequestInit = {
      method,
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    };

    const cleanURL = `${endpoint}/${url}`
      .replaceAll("//", "/")
      .replace(/\?$/, "");

    const response = await request(cleanURL, opts);
    const json = await response.json();

    if (response.status >= 400 || "errors" in json) {
      throw json.errors || new Error(response.statusText);
    }

    return key ? json[key] : json;
  }

  return {
    setToken(token: string) {
      auth = token;
    },
    get(url: string, params: Record<string, string | number> = {}) {
      return (key = "") =>
        makeRequest(
          "GET",
          `${url}?${new URLSearchParams(params as any)}`,
          undefined,
          key
        );
    },
    delete(url: string, params: Record<string, string | number> = {}) {
      return (key = "") =>
        makeRequest(
          "DELETE",
          `${url}?${new URLSearchParams(params as any)}`,
          undefined,
          key
        );
    },
    post(url: string, body: Record<string, unknown> = {}) {
      return (key = "") => makeRequest("POST", url, body, key);
    },
    put(url: string, body: Record<string, unknown> = {}) {
      return (key = "") => makeRequest("PUT", url, body, key);
    },
  };
}

export function conduitClient(endpoint: string, request = fetch) {
  const client = httpClient(endpoint, request);

  return {
    common: {
      tags(): Promise<string[]> {
        return client.get(`/tags`)("tags");
      },
    },

    auth: {
      login(user: { email: string; password: string }): Promise<IUser> {
        return client.post(`/users/login`, { user })("user");
      },

      register(user: {
        email: string;
        password: string;
        username: string;
      }): Promise<IUser> {
        return client.post(`/users`, { user })("user");
      },

      me(): Promise<IUser> {
        return client.get(`/user`)("user");
      },

      update(user: {
        email: string;
        password: string;
        username: string;
        image: string;
        bio: string;
      }): Promise<IUser> {
        return client.put(`/user`, { user })("user");
      },

      setToken(token: string): void {
        return client.setToken(token);
      },

      logout(): void {
        return client.setToken("");
      },
    },

    profile: {
      get(username: string): Promise<IProfile> {
        return client.get(`/profiles/${username}`)("profile");
      },

      follow(username: string): Promise<IProfile> {
        return client.post(`/profiles/${username}/follow`)("profile");
      },

      unfollow(username: string): Promise<IProfile> {
        return client.delete(`/profiles/${username}/follow`)("profile");
      },
    },

    article: {
      list(params?: {
        tag?: string;
        author?: string;
        favorited?: string;
        limit?: number;
        offset?: string;
      }): Promise<{ articles: IArticle[]; articlesCount: number }> {
        return client.get(`/articles`, params)();
      },

      feed(params?: {
        limit: number;
        offset: number;
      }): Promise<{ articles: IArticle[]; articlesCount: number }> {
        return client.get(`/articles/feed`, params)();
      },

      get(slug: string): Promise<IArticle> {
        return client.get(`/articles/${slug}`)("article");
      },

      add(
        article: Pick<IArticle, "title" | "description" | "body" | "tagList">
      ): Promise<IArticle> {
        return client.post(`/articles`, { article })("article");
      },

      update(
        slug: string,
        article: Partial<
          Pick<IArticle, "title" | "description" | "body" | "tagList">
        >
      ): Promise<IArticle> {
        return client.put(`/articles/${slug}`, { article })("article");
      },

      delete(slug: string): Promise<void> {
        return client.delete(`/articles/${slug}`)();
      },

      favorite(slug: string): Promise<IArticle> {
        return client.post(`/articles/${slug}/favorite`)("article");
      },

      unfavorite(slug: string): Promise<IArticle> {
        return client.delete(`/articles/${slug}/favorite`)("article");
      },
    },
    comments: {
      delete(slug: string, id: string): Promise<void> {
        return client.delete(`/articles/${slug}/comments/${id}`)();
      },

      get(slug: string): Promise<IComment[]> {
        return client.get(`/articles/${slug}/comments`)("comments");
      },

      add(slug: string, comment: string): Promise<IComment> {
        return client.post(`/articles/${slug}/comments`, { comment })(
          "comments"
        );
      },
    },
  };
}
