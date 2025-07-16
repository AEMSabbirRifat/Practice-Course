// scripts/generate-pdf.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  const liascriptFile = 'Practice-Course/Test 01.md';
  const outputDir = 'dist';
  const outputPdf = path.join(outputDir, 'Test_01.pdf'); // Output filename

  console.log('Starting PDF generation script...');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    console.log(`Creating output directory: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  } else {
    console.log(`Output directory already exists: ${outputDir}`);
  }

  // Construct the liascript command
  // Note: We use double quotes around the file path to handle spaces
  const command = `liascript "${liascriptFile}" -o "${outputPdf}"`;
  console.log(`Executing command: ${command}`);

  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    console.log(`Liascript PDF generation stdout:\n${stdout}`);
    if (stderr) {
      console.error(`Liascript PDF generation stderr:\n${stderr}`);
    }
    console.log(`PDF generated successfully at: ${outputPdf}`);

  } catch (error) {
    console.error('An error occurred during PDF generation:', error);
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
}

generatePdf().catch(error => {
  console.error('Unhandled error in generatePdf function:', error);
  process.exit(1);
});
