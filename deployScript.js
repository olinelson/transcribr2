const ghpages = require('gh-pages')
var pjson = require('./package.json');

ghpages.publish('public', {
    message: `v${pjson.version}`,
    tag:  pjson.version,
}, (e) => console.log(`Deployed v${pjson.version} to gh-pages`,e));