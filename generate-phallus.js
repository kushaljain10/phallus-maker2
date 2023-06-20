import fs from 'fs';

export function generatePhallus(req, res) {
  const inputSVGs = [
    './phallus_assets/dick/' + req.query.dick + '.svg',
    './phallus_assets/head/' + req.query.head + '.svg',
    './phallus_assets/eyewear/' + req.query.eyewear + '.svg',
    './phallus_assets/face/' + req.query.face + '.svg'
  ];

  // Function to read SVG file contents
  const readSVGFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
  };

  let mergedSVG = '';
  let mergedWidth = 0;
  let mergedHeight = 0;
  let translateY = 0;

  // Iterate over input SVG files
  for (let i = 0; i < inputSVGs.length; i++) {
    // Read SVG file contents
    const svgContent = readSVGFile(inputSVGs[i]);

    // Get the dimensions of the current SVG
    const svgDimensions = getSVGDimensions(svgContent);
    const svgWidth = svgDimensions.width;
    const svgHeight = svgDimensions.height;

    // Update the merged dimensions
    mergedWidth = Math.max(mergedWidth, svgWidth);
    mergedHeight = Math.max(mergedHeight, svgHeight);

    // Calculate the translation values for center alignment
    const translateX = (mergedWidth - svgWidth) / 2;
    // var translateY = 0;
    if (i == 1) {
      translateY = ((mergedHeight - svgHeight) / 2) - 62;
    } else if (i == 2) {
      translateY = ((mergedHeight - svgHeight) / 2) - 29;
    } else if (i == 3) {
      translateY = ((mergedHeight - svgHeight) / 2) + 56;
    } else {
      translateY = ((mergedHeight - svgHeight) / 2);
    }

    // Append the current SVG content as a new layer with the translation
    mergedSVG += `<g id="layer${i + 1}" transform="translate(${translateX}, ${translateY})">${svgContent}</g>`;
  }

  // Wrap the merged layers in an SVG element with the merged dimensions
  mergedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mergedWidth} ${mergedHeight}">${mergedSVG}</svg>`;

  res.status(200).json({
    bro: mergedSVG, // Data to be returned as a JSON object.
  });
}

// Function to extract SVG dimensions from the SVG content
function getSVGDimensions(svgContent) {
  const svgTagRegex = /<svg[^>]*>/;
  const widthRegex = /width="([^"]+)"/;
  const heightRegex = /height="([^"]+)"/;

  const svgTagMatch = svgContent.match(svgTagRegex);
  const widthMatch = svgTagMatch ? svgTagMatch[0].match(widthRegex) : null;
  const heightMatch = svgTagMatch ? svgTagMatch[0].match(heightRegex) : null;

  const width = widthMatch ? parseFloat(widthMatch[1]) : 0;
  const height = heightMatch ? parseFloat(heightMatch[1]) : 0;

  return { width, height };
}