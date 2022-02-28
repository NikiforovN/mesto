
const AutoPrefixer = require('autoprefixer');
const Cssnano = require('cssnano');

module.exports = {
    plugins: [
        AutoPrefixer,
        Cssnano({preset: 'default'})
    ]
}