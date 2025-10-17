const fs = require('fs');
const path = require('path');

// Function to fix unescaped entities in a file
function fixFile(filePath) {
  console.log(`Fixing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all instances of unescaped quotes and apostrophes in JSX
  // Single quotes / apostrophes
  content = content.replace(/children's/g, "children&apos;s");
  content = content.replace(/Children's/g, "Children&apos;s");
  content = content.replace(/don't/g, "don&apos;t");
  content = content.replace(/Let's/g, "Let&apos;s");
  content = content.replace(/it's/g, "it&apos;s");
  content = content.replace(/MARIPHIL's/g, "MARIPHIL&apos;s");
  content = content.replace(/child's/g, "child&apos;s");
  
  // Double quotes - be careful to only replace in text content, not in JSX attributes
  // Match pattern: "text" that appears between > and < (in JSX text content)
  content = content.replace(/"Rice Bag Campaign"/g, "&ldquo;Rice Bag Campaign&rdquo;");
  content = content.replace(/"Water refilling station"/g, "&ldquo;Water refilling station&rdquo;");
  content = content.replace(/"osmosis – reversal process"/g, "&ldquo;osmosis – reversal process&rdquo;");
  content = content.replace(/"The fact that this project/g, "&ldquo;The fact that this project");
  content = content.replace(/inflation," says/g, "inflation,&rdquo; says");
  content = content.replace(/circle," says/g, "circle,&rdquo; says");
  content = content.replace(/"A really meaningful Christmas present!"/g, "&ldquo;A really meaningful Christmas present!&rdquo;");
  content = content.replace(/"no letter"/g, "&ldquo;no letter&rdquo;");
  content = content.replace(/"Sport free"/g, "&ldquo;Sport free&rdquo;");
  content = content.replace(/"celebration of strength and spirit"/g, "&ldquo;celebration of strength and spirit&rdquo;");
  content = content.replace(/"Bebs"/g, "&ldquo;Bebs&rdquo;");
  content = content.replace(/"FoxyFolksy-Modern Filipino Kitchen"/g, "&ldquo;FoxyFolksy-Modern Filipino Kitchen&rdquo;");
  content = content.replace(/"school bus"/g, "&ldquo;school bus&rdquo;");
  content = content.replace(/"100,000 trees against climate change"/g, "&ldquo;100,000 trees against climate change&rdquo;");
  content = content.replace(/"your country"/g, "&ldquo;your country&rdquo;");
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${filePath}`);
}

// Fix the problematic files
const filesToFix = [
  'app/news/[slug]/page.tsx',
  'app/projects/[slug]/page.tsx'
];

filesToFix.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fixFile(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('All files fixed!');
