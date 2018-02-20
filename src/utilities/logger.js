function log(level, ...details) {
  try {
    const detail = details.map(d => d instanceof Error ? {
      message: d.message,
      tableName: d.tableName,
      tableOperation: d.tableOperation,
      url: d.originalUrl,
      username: d.username,
      stack: d.stack,
      body: d.body
    } : d);

    let result;

    if (detail.length !== 0) {
      result = detail.length === 1 ? detail[0] : detail;
    }

    /* eslint-disable no-console */
    console.log(JSON.stringify({
      level,
      detail: result
    }));
    /* eslint-enable no-console */
  } catch (_) { /* whatever */ }
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
