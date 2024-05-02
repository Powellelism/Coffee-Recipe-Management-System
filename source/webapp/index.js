// Import JavaScript files
const jsContext = require.context('./', true, /^\.\/.*Page\/js\/.*\.js$/);
jsContext.keys().forEach(jsContext);

// Import CSS files
const cssContext = require.context('./', true, /^\.\/.*Page\/css\/.*\.css$/);
cssContext.keys().forEach(cssContext);

// Import common JavaScript files
const commonJsContext = require.context('./common/js', true, /\.js$/);
commonJsContext.keys().forEach(commonJsContext);

// Import common CSS files
const commonCssContext = require.context('./common/css', true, /\.css$/);
commonCssContext.keys().forEach(commonCssContext);