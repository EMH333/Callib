const { build } = require('esbuild')
const sass = require('dart-sass')
const fs = require('fs');

//build js
build({
    entryPoints: ['./src/forTesting.ts'],
    outfile: './dist/callib.js',
    minify: true,
    bundle: true,
}).catch((err) => {
    console.error(err)
    process.exit(1)
})


//build css
const scssInFile = './src/style.scss'
const cssOutFile = './dist/main.css'
let result = sass.renderSync({ file: scssInFile });
fs.writeFile(cssOutFile, result.css, (err) => {
    if (err) throw err;
});
