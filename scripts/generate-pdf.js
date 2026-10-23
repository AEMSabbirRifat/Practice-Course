// scripts/generate-pdf.js
//
// Exports the LiaScript lesson named in package.json ("liascript.lesson") with the
// official LiaScript exporter (@liascript/exporter):
//   - dist/<slug>.pdf          printable handout, rendered the way students see the course
//   - dist/<slug>-scorm.zip    SCORM 1.2 package for Moodle / ILIAS / OPAL
//
// The previous version opened the raw .md file in a headless browser, which printed
// the Markdown source instead of the rendered course. The exporter renders it properly.
//
// Usage:  npm install && npm run generate-pdf            (PDF + SCORM)
//         npm run generate-pdf -- --pdf-only             (PDF only)

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { lesson, slug, organization } = require(path.join(root, 'package.json')).liascript;
const outDir = path.join(root, 'dist');
const isWindows = process.platform === 'win32';
const liaex = path.join(root, 'node_modules', '.bin', isWindows ? 'liaex.cmd' : 'liaex');

function run(args) {
  console.log(`> liaex ${args.join(' ')}`);
  execFileSync(liaex, args, { stdio: 'inherit', cwd: root, shell: isWindows });
}

if (!fs.existsSync(path.join(root, lesson))) {
  console.error(`Lesson file not found: ${lesson}`);
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

try {
  run(['-i', lesson, '-f', 'pdf', '-o', path.join('dist', slug), '--pdf-timeout', '30000']);
  if (!process.argv.includes('--pdf-only')) {
    try {
      run(['-i', lesson, '-f', 'scorm1.2', '-o', path.join('dist', `${slug}-scorm`),
           '--scorm-organization', organization]);
    } catch (err) {
      // The PDF is the main deliverable; a SCORM hiccup should not block the release.
      console.warn('SCORM export failed, continuing with the PDF only:', err.message);
    }
  }
  console.log(`Done. Files are in ${outDir}`);
} catch (err) {
  console.error('Export failed:', err.message);
  process.exit(1);
}
