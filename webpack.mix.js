const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/trix.scss`, `${dist}/css`)
    .js(`${source}/resources/js/trix.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.copy(`${dist}/css/trix.css`, `${source}/public/css`)
    mix.copy(`${dist}/js/trix.js`, `${source}/public/js`)
}
