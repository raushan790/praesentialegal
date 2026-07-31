/**
 * Hostinger Static Assets Synchronizer
 * Automatically copies/syncs files from the Node app's 'public' folder
 * to the domain's 'public_html' folder on startup in production.
 */
const fs = require('fs');
const path = require('path');

const isHostinger = __dirname.includes('/home/u');
const isProduction = process.env.NODE_ENV === 'production';

if (isHostinger || isProduction) {
  console.log('[Deploy Sync] Initializing static assets synchronization...');
  try {
    let publicHtmlPath = null;

    // 1. Check if public_html is a sibling of the app folder
    const siblingDir = path.join(__dirname, '..');
    if (fs.existsSync(siblingDir)) {
      const files = fs.readdirSync(siblingDir);
      if (files.includes('public_html')) {
        publicHtmlPath = path.join(siblingDir, 'public_html');
      }
    }

    // 2. If app is running inside public_html directly
    if (!publicHtmlPath && __dirname.includes('public_html')) {
      publicHtmlPath = __dirname;
    }

    console.log('[Deploy Sync] Node path (__dirname):', __dirname);
    console.log('[Deploy Sync] Target public_html path:', publicHtmlPath);

    if (publicHtmlPath) {
      const srcPublic = path.join(__dirname, 'public');
      if (fs.existsSync(srcPublic)) {
        
        // Recursive copy function
        const copyRecursive = (src, dest) => {
          const stats = fs.statSync(src);
          if (stats.isDirectory()) {
            if (!fs.existsSync(dest)) {
              fs.mkdirSync(dest, { recursive: true });
            }
            fs.readdirSync(src).forEach(child => {
              copyRecursive(path.join(src, child), path.join(dest, child));
            });
          } else {
            // Only copy if the file is new or modified (optimization)
            let shouldCopy = true;
            if (fs.existsSync(dest)) {
              const srcMtime = stats.mtimeMs;
              const destMtime = fs.statSync(dest).mtimeMs;
              if (srcMtime <= destMtime) {
                shouldCopy = false;
              }
            }
            if (shouldCopy) {
              fs.copyFileSync(src, dest);
              console.log(`[Deploy Sync] Copied: ${path.relative(srcPublic, src)}`);
            }
          }
        };

        copyRecursive(srcPublic, publicHtmlPath);
        console.log('[Deploy Sync] Static assets synchronization completed successfully.');
      } else {
        console.log('[Deploy Sync] Source public folder not found at:', srcPublic);
      }
    } else {
      console.log('[Deploy Sync] Could not locate public_html directory.');
    }
  } catch (error) {
    console.error('[Deploy Sync] Error during synchronization:', error);
  }
} else {
  console.log('[Deploy Sync] Non-production local environment detected. Skipping sync.');
}
