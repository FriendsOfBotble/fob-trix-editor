const mix = require('laravel-mix');

const path = require('path');
const directory = path.basename(path.resolve(__dirname));

const source = 'platform/plugins/' + directory;
const dist = 'public/vendor/core/plugins/' + directory;

mix.js(source + '/resources/js/editor.js', dist + '/js')
    .sass(source + '/resources/sass/trix.scss', dist + '/css')

if (mix.inProduction()) {
    mix.copy(dist + '/js/editor.js', source + '/public/js')
    mix.copy(dist + '/css/trix.css', source + '/public/css')
}
