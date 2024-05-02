import './script.js'
import './style.css'

// Import common CSS files
const commonCssContext = require.context('../common/css', true, /\.css$/);
commonCssContext.keys().forEach(commonCssContext);
