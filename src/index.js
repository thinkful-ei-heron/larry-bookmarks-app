/* eslint-disable no-console */
import 'normalize.css';
import './styles.css';

import bookmarks from './bookmarks';

function main() {
  bookmarks.initialize();
  bookmarks.bindEventListeners();
  bookmarks.render();
}

main ();
