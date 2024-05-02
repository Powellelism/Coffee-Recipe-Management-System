import './script.js'
import './style.css'
import '../common/js/common.js'

// Import common CSS files
const commonCssContext = require.context('../common/css', true, /\.css$/);
commonCssContext.keys().forEach(commonCssContext);
