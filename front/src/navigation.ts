const APP_NAVIGATION_EVENT = "app:navigate";

export function navigateTo(path: string): void {
  const windowObject = globalThis.window;
  if (!windowObject) {
    return;
  }

  const targetUrl = new URL(path, windowObject.location.origin);
  const nextUrl = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
  const currentUrl = `${windowObject.location.pathname}${windowObject.location.search}${windowObject.location.hash}`;

  if (nextUrl === currentUrl) {
    return;
  }

  windowObject.history.pushState(null, "", nextUrl);
  windowObject.dispatchEvent(new Event(APP_NAVIGATION_EVENT));
}

export function onNavigation(callback: () => void): () => void {
  const windowObject = globalThis.window;
  if (!windowObject) {
    return () => undefined;
  }

  windowObject.addEventListener("popstate", callback);
  windowObject.addEventListener(APP_NAVIGATION_EVENT, callback);

  return () => {
    windowObject.removeEventListener("popstate", callback);
    windowObject.removeEventListener(APP_NAVIGATION_EVENT, callback);
  };
}
