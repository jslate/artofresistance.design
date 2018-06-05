const fs = require("pn/fs"); // https://www.npmjs.com/package/pn
const svg2png = require("svg2png");
const outputSizes = {
  small: 300,
  medium: 600,
  large: 1200
}

fs.readdir('./svgs', (err, files) => {
  files.forEach((file, index) => {
    if (file.match(/\.svg$/)) {
      const svg = `${__dirname}/svgs/${file}`;
      const input = fs.readFileSync(svg, { encoding: 'utf8' });
      Object.keys(outputSizes).forEach((size) => {
        const filename = `${__dirname}/public/pngs/${size}/${file.replace('.svg', '.png')}`;
        svg2png(input, { width: outputSizes[size] })
        .then((buffer) => {
          console.log(`write ${filename}`);
          fs.writeFile(filename, buffer);
        }).catch(e => {
          console.error(e);
        });
      });
    }
  });
})
