import './script.js'
import './style.css'
// Import common JavaScript files
const commonJsContext = require.context('../common/js', true, /\.js$/);
commonJsContext.keys().forEach(commonJsContext);

// Import common CSS files
const commonCssContext = require.context('../common/css', true, /\.css$/);
commonCssContext.keys().forEach(commonCssContext);
