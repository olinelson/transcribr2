const ghpages = require('gh-pages')
var pjson = require('./package.json');

ghpages.publish('dist', {
    message: `Release - ${pjson.version}`,
    tag:  pjson.version,
}, callback);