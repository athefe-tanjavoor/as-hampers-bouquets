const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Monorepo packages -> lib
      content = content.replace(/["']@repo\/config["']/g, '"@/lib/config"');
      content = content.replace(/["']@repo\/types["']/g, '"@/lib/types"');
      content = content.replace(/["']@repo\/utils["']/g, '"@/lib/utils"');
      content = content.replace(/["']@repo\/validation["']/g, '"@/lib/validation"');
      content = content.replace(/["']@repo\/ui["']/g, '"@/lib/ui"');

      // Relative lib imports
      content = content.replace(/from\s+["'](\.\.\/)+lib\/api["']/g, 'from "@/lib/api"');
      content = content.replace(/from\s+["'](\.\.\/)+lib\/cart-context["']/g, 'from "@/lib/cart-context"');
      content = content.replace(/from\s+["']\.\/lib\/api["']/g, 'from "@/lib/api"');
      content = content.replace(/from\s+["']\.\/lib\/cart-context["']/g, 'from "@/lib/cart-context"');

      // Relative components imports
      content = content.replace(/from\s+["'](\.\.\/)+components\/AdminSidebar["']/g, 'from "@/components/admin/AdminSidebar"');
      content = content.replace(/from\s+["']\.\.?\/components\/AdminSidebar["']/g, 'from "@/components/admin/AdminSidebar"');
      content = content.replace(/from\s+["'](\.\.\/)+components\//g, 'from "@/components/');
      content = content.replace(/from\s+["']\.\/components\//g, 'from "@/components/');

      // Relative globals.css in sub-layouts
      content = content.replace(/import\s+["']\.\/globals\.css["'];?\n?/g, '');

      // Hardcoded localhost:5000 API calls
      content = content.replace(/http:\/\/localhost:5000\/api\/v1/g, '/api');
      content = content.replace(/http:\/\/localhost:5000\/api/g, '/api');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Processing app/...');
processDir(path.resolve(__dirname, '../app'));
console.log('Processing components/...');
processDir(path.resolve(__dirname, '../components'));
console.log('Processing lib/...');
processDir(path.resolve(__dirname, '../lib'));
console.log('Done!');
