// scripts/generate.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function generateContent(type) {
  const liascriptFile = 'Practice-Course/Test 01.md';
  const outputDir = 'dist';
  let command = '';
  let outputFileName = '';
  let successMessage = '';

  console.log(`Starting Liascript ${type.toUpperCase()} generation script...`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    console.log(`Creating output directory: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  } else {
    console.log(`Output directory already exists: ${outputDir}`);
  }

  // Determine the command and output file based on the type argument
  switch (type.toLowerCase()) {
    case 'pdf':
      outputFileName = path.join(outputDir, 'Test_01.pdf');
      command = `npx liascript "${liascriptFile}" -o "${outputFileName}"`;
      successMessage = `PDF generated successfully at: ${outputFileName}`;
      break;
    case 'scorm':
      outputFileName = path.join(outputDir, 'Test_01.scorm.zip');
      command = `npx liascript "${liascriptFile}" --scorm -o "${outputFileName}"`;
      successMessage = `SCORM package generated successfully at: ${outputFileName}`;
      break;
    case 'ims':
      outputFileName = path.join(outputDir, 'Test_01.imscc');
      command = `npx liascript "${liascriptFile}" --ims -o "${outputFileName}"`;
      successMessage = `IMS package generated successfully at: ${outputFileName}`;
      break;
    default:
      console.error('Invalid generation type specified. Please use "pdf", "scorm", or "ims".');
      process.exit(1);
  }

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

    console.log(`Liascript ${type.toUpperCase()} generation stdout:\n${stdout}`);
    if (stderr) {
      console.error(`Liascript ${type.toUpperCase()} generation stderr:\n${stderr}`);
    }
    console.log(successMessage);

  } catch (error) {
    console.error(`An error occurred during ${type.toUpperCase()} generation:`, error);
    process.exit(1);
  }
}

// Get the type argument from the command line (e.g., node scripts/generate.js pdf)
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('No generation type specified. Usage: node scripts/generate.js <pdf|scorm|ims>');
  process.exit(1);
}

const typeToGenerate = args[0];
generateContent(typeToGenerate).catch(error => {
  console.error('Unhandled error in generateContent function:', error);
  process.exit(1);
});
