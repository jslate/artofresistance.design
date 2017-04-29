const fs = require("pn/fs"); // https://www.npmjs.com/package/pn
const svg2png = require("svg2png");
const outputDir = 'pngs';

fs.readdir('public/svgs', (err, files) => {
  files.forEach(file => {
    // console.log(file.constructor);
    if (file.match(/\.svg$/)) {
      console.log(file.replace('.svg', '.png'));
      const input = fs.readFileSync(`public/svgs/${file}`);
      svg2png(input, { width: 600 })
          .then(buffer => fs.writeFile(`${outputDir}/${file.replace('.svg', '.png')}`, buffer))
          .catch(e => console.error(e));
    }
  });
})
