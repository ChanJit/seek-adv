export function isClient() {
  return typeof window !== 'undefined' && window.document;
}

export function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

export function isPhone() {
  return (/Mobi/i).test(navigator.userAgent);
}

export function isRunningStandalone() {
  if (isClient()) {
    const appleStandalone = 'standalone' in window.navigator && window.navigator.standalone;
    const chromeStandalone = 'matchMedia' in window && window.matchMedia('(display-mode: standalone)').matches;

    return appleStandalone || chromeStandalone;
  }

  return false;
}