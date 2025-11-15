type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private static instance: Logger;
  private currentLogLevel: LogLevel = 'info';

  constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.currentLogLevel);
  }

  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`ℹ️ [INFO] ${message}`, ...args.join(' - '));
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`⚠️ [WARN] ${message}`, ...args.join(' - '));
    }
  }

  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`❌ [ERROR] ${message}`, args.join(' - '));
    }
  }

  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`🔍 [DEBUG] ${message}`, ...args.join(' - '));
    }
  }
}
