# webpack-mac-notifier

> A lightweight Webpack plugin for macOS that shows build status notifications using [`terminal-notifier`](https://github.com/julienXX/terminal-notifier).

---

## 📦 Installation

First, install the plugin:

```bash
npm install --save-dev @shanevoirin/webpack-mac-notifier
# or
pnpm add -D @shanevoirin/webpack-mac-notifier
```

Then make sure `terminal-notifier` is installed (required for macOS notifications):

```bash
brew install terminal-notifier
```

---

## 🛠 Usage

Edit your `webpack.config.js` (or `.ts`) to include the plugin:

```js
// webpack.config.js
import MacNotifierPlugin from '@shanevoirin/webpack-mac-notifier';

export default {
  mode: 'development',
  plugins: [
    new MacNotifierPlugin({
      title: 'My Project',
      successMessage: '✅ Build successful!',
      warningMessage: '⚠️ Build completed with warnings.',
      errorMessage: '❌ Build failed!',
      sound: 'Ping', // macOS sounds: Basso, Frog, Submarine, etc.
      debounceTime: 2000 // Time in ms to prevent duplicate notifications
    })
  ]
};
```

---

## ✅ Features

- Shows a native macOS notification after each build
- Indicates **success**, **warnings**, or **errors**
- Customizable **title**, **message**, and **sound**
- Runs only on macOS (`process.platform === 'darwin'`)
- **Smart debouncing** to prevent duplicate notifications during hot reloads

---

## 🔧 Options

| Option          | Type     | Default                      | Description                                      |
|-----------------|----------|------------------------------|--------------------------------------------------|
| `title`         | `string` | `'Webpack Build'`            | Notification title                               |
| `successMessage`| `string` | `'Build completed successfully!'` | Message shown on success                     |
| `errorMessage`  | `string` | `'Build failed. Check console for errors.'` | Message shown on error       |
| `warningMessage`| `string` | `'Build completed with warnings.'` | Message shown if there are warnings     |
| `sound`         | `string` | `'Glass'`                    | macOS system sound to play with the message      |
| `debounceTime`  | `number` | `2000`                      | Time in milliseconds to wait before showing another notification (prevents duplicates during hot reloads) |

---

## 📘 Requirements

- macOS
- `terminal-notifier` installed via Homebrew
- Webpack v4 or v5

---

## 🧪 Local Development

Clone the repo and run:

```bash
pnpm install
pnpm run build
pnpm run test
```

To run tests in watch mode:

```bash
pnpm run test:watch
```

---

## 🔐 CI/CD & Publishing

- Automatically publishes to NPM when a new tag like `v1.2.3` is pushed.
- Requires a valid `NPM_TOKEN` secret in GitHub Actions.

---

## ✨ Example Notifications

- ✅ Success: "Build completed successfully!"
- ⚠️ Warning: "Build completed with warnings."
- ❌ Error: "Build failed. Check console for errors."

---

## License

MIT © [Shane Voirin](https://github.com/shanevoirin)
