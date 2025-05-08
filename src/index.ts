import { execFile } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import type webpack from 'webpack';

interface MacNotifierOptions {
  title?: string;
  successMessage?: string;
  errorMessage?: string;
  warningMessage?: string;
  sound?: string;
  debounceTime?: number; // Add debounce time option
}

class MacNotifierPlugin {
  private options: Required<MacNotifierOptions> & { debounceTime: number };
  private notifierPath: string | null;
  private commonPaths: string[];
  private lastNotificationTime: number = 0;

  constructor(options: MacNotifierOptions = {}) {
    this.options = {
      title: 'Webpack Build',
      successMessage: 'Build completed successfully!',
      errorMessage: 'Build failed. Check console for errors.',
      warningMessage: 'Build completed with warnings.',
      sound: 'Glass',
      debounceTime: 2000, // Default 2 seconds debounce
      ...options
    };

    this.commonPaths = [
      '/opt/homebrew/bin/terminal-notifier',
      '/usr/local/bin/terminal-notifier',
      '/usr/bin/terminal-notifier'
    ];

    this.notifierPath = this.findNotifierSync();
  }

  private findNotifierSync(): string | null {
    const localPath = join(
      process.cwd(),
      'node_modules',
      'terminal-notifier',
      'vendor',
      'terminal-notifier.app',
      'Contents',
      'MacOS',
      'terminal-notifier'
    );

    if (existsSync(localPath)) return localPath;
    return this.commonPaths.find(path => existsSync(path)) || null;
  }

  apply(compiler: webpack.Compiler): void {
    compiler.hooks.done.tap('MacNotifierPlugin', (stats: webpack.Stats) => {
      const currentTime = Date.now();
      // Skip notification if not enough time has passed since the last one
      if (currentTime - this.lastNotificationTime < this.options.debounceTime) {
        return;
      }
      
      // Update last notification time
      this.lastNotificationTime = currentTime;

      if (process.platform !== 'darwin') return;
      if (!this.notifierPath) {
        console.log('MacNotifierPlugin: terminal-notifier not found. Install with `pnpm add terminal-notifier` or `brew install terminal-notifier`');
        return;
      }

      const hasErrors = stats.hasErrors();
      const hasWarnings = stats.hasWarnings();

      let title: string, message: string, soundOption: string;

      if (hasErrors) {
        title = `${this.options.title} ❌`;
        message = this.options.errorMessage;
        soundOption = 'Basso';
      } else if (hasWarnings) {
        title = `${this.options.title} ⚠️`;
        message = this.options.warningMessage;
        soundOption = 'Ping';
      } else {
        title = `${this.options.title} ✅`;
        message = this.options.successMessage;
        soundOption = this.options.sound;
      }

      const args = ['-title', title, '-message', message];
      if (soundOption) args.push('-sound', soundOption);

      try {
        execFile(this.notifierPath, args, (error: Error | null) => {
          if (error) {
            console.log(`MacNotifierPlugin: error showing notification: ${error.message}`);
          }
        });
      } catch (e: any) {
        console.log(`MacNotifierPlugin: failed to execute terminal-notifier: ${e.message}`);
      }
    });
  }
}

export default MacNotifierPlugin;
