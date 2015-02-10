var mainBowerFiles = require('main-bower-files'),
  fs = require('fs');

module.exports = {
  /**
   * Get an array the defined main bower files (therefore being non-minified), filtered for the desired type (extension)
   *
   * @param  {String} extension - The asset type you want, for example .js or .css
   * @return {Array}
   */
  assets: function (extension) {
    var matchExtension = new RegExp('.+' + extension + '$');
    return mainBowerFiles()
      .filter(function (filename) {
        return filename.match(matchExtension)
      });
  },

  /**
   * Get an array of minified variants of the main bower files, if exist in the packages,
   * filtered for the desired type (extension) and type of minification.
   * If minified variant is not found, original will be kept.
   *
   * @param  {String} extension - The asset type you want, for example .js or .css
   * @param  {String} minifiedExtension - The minified asset type you want, for example .min.js, .min.js.gzip or .min.css
   * @return {Array}
   */
  assetsMinified: function (extension, minifiedExtension) {
    var matchExtension = new RegExp('.+' + extension + '$'),
      filenameWithoutExtension = new RegExp('^(.+)' + extension + '$'),
      minFilename;
    return mainBowerFiles()
      .filter(function (filename) {
        return filename.match(matchExtension)
      }).map(function (orgFilename) {
        minFilename = orgFilename.replace(filenameWithoutExtension, '$1' + minifiedExtension);
        if (fs.existsSync(minFilename)) {
          return minFilename
        }
        return orgFilename;
      });
  }
};