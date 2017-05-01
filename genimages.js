const fs = require("pn/fs"); // https://www.npmjs.com/package/pn
const svg2png = require("svg2png");
const outputSizes = {
  small: 300,
  medium: 600,
  large: 1200
}

fs.readdir('./svgs', (err, files) => {
  files.forEach(file => {
    // console.log(file.constructor);
    if (file.match(/\.svg$/)) {
      console.log(file.replace('.svg', '.png'));
      const input = fs.readFileSync(`./svgs/${file}`);
      Object.keys(outputSizes).forEach((size) => {
        svg2png(input, { width: outputSizes[size] })
        .then(buffer => fs.writeFile(`public/pngs/${size}/${file.replace('.svg', '.png')}`, buffer))
        .catch(e => console.error(e));
      });
    }
  });
})
