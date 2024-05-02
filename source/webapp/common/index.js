// Import common JavaScript files
const commonJsContext = require.context('./js', true, /\.js$/);
commonJsContext.keys().forEach(commonJsContext);

// Import common CSS files
const commonCssContext = require.context('./css', true, /\.css$/);
commonCssContext.keys().forEach(commonCssContext);
