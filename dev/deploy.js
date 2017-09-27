var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish('dist', function(err) {
  console.log('Github Pages deployment done.')

  if (err) {
    console.log(err)
  }
});
