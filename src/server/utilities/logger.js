function log(level, ...detail) {
  try {
    const details = detail.map(d => d instanceof Error ? {
      message: d.message,
      stack: d.stack
    } : d);

    let result;

    if (details.length !== 0) {
      result = details.length === 1 ? details[0] : details;
    }

    /* eslint-disable no-console */
    console.log(JSON.stringify({
      level,
      detail: result
    }));
    /* eslint-enable no-console */
  } catch (_) { /*catch nothing*/ }
}

export default class {
  static info(...args) {
    log(...['info', ...args]);
  }

  static warn(...args) {
    log(...['warn', ...args]);
  }

  static error(...args) {
    log(...['error', ...args]);
  }
}
