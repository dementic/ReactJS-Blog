import React from 'react';
import ReactDOM from 'react-dom';

import BlogApp from './BlogApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BlogApp/>, document.getElementById('BlogApp'));
serviceWorker.unregister();