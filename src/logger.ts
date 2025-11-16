import { config } from './config';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const { LOG_LEVEL } = config;
export class Logger {
  private static instance?: Logger;
  private currentLogLevel: LogLevel = 'info';

  public static getInstance(): Logger {
    const logger = (Logger.instance ??= new Logger());
    // TODO: Check if LOG_LEVEL is valid
    logger.setLogLevel(LOG_LEVEL as LogLevel);
    return logger;
  }

  public setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.currentLogLevel);
  }

  public info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(`ℹ️  [INFO] ${message} -`, ...args);
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`⚠️  [WARN] ${message} -`, ...args);
    }
  }

  public error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(`❌  [ERROR] ${message} -`, ...args);
    }
  }

  public debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`🔍 [DEBUG] ${message} -`, ...args);
    }
  }
}
