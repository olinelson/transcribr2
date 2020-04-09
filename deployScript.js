const ghpages = require('gh-pages')
var pjson = require('./package.json');

ghpages.publish('public', {
    message: `Release - ${pjson.version}`,
    tag:  pjson.version,
}, (e) => console.log('done',e));