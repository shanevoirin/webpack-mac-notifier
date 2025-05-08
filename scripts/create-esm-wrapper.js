const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create ESM wrapper
const esmWrapper = `import MacNotifierPlugin from './index.js';
export default MacNotifierPlugin;
export { MacNotifierPlugin };
`;

fs.writeFileSync(path.join(distDir, 'index.mjs'), esmWrapper);
console.log('ESM wrapper created successfully at dist/index.mjs');
