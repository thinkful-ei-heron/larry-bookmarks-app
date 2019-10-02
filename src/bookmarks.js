/* eslint-disable no-console */
import $ from 'jquery';
import cuid from 'cuid';

import store from './store.js';
import api from './api.js';

function renderError() {
  if(store.error) {
    return `<section class="errorContent">
              <p>${store.getError()}</p>
              <button id="cancelError">OK</button>
            </section>`;

  }
  return '';
}

function formBookmarkListItems() {
  let itemString = '';
  store.bookmarks.forEach(function(bookmark) {
    if(bookmark.rating >= store.filter) {  
      if(bookmark.expanded) {
        itemString += `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">${bookmark.title}
                         <p>Visit Site: <a href=${bookmark.url}>${bookmark.url}</a></p>
                         <p>Rating: ${bookmark.rating}</p>
                         <p>${bookmark.desc}</p>
                         <div class="deleteBookmark">
                           <label for="buttonDelete">Delete Bookmark: </label>
                           <button class="buttonDel" name="buttonDelete" type="button">Delete</button>
                       </div>                    
                     </li>`;
      }
      else {
        itemString += `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">${bookmark.title}</li>`;
      }
    }
  });
  return itemString;
}

function generateMainString() {
  return `<section class="upperContainer">
            <div class="newBookmark">
              <button class="buttonNew" name="buttonNB" type="button">New Bookmark</button>
            </div>
            <div class="filterBy">
              <select id="js-filter" name="filter">
                <option value="" selected="selected">Filter</option>            
                <option value="1">One Star</option>
                <option value="2">Two Star</option>
                <option value="3">Three Star</option>
                <option value="4">Four Star</option>
                <option value="5">Five Star</option>                                                
              </select>
            </div> -->
          </section>
          <section class="bookmarks">
            <ul class="js-ulBookmarks">
              ${formBookmarkListItems()}
            </ul>
          </section>`;
}

function generateAddString() {
  return `<form class="addBookmarkForm">
            <fieldset name="formField">
              <label for="newBookLink">Add New Bookmark:</label>
              <input id="newBookLink" type="text" name="newBookLink" placeholder="http://www.newsite.com"><br>
              <label for="newBookNick">Nickname:</label>
              <input id="newBookNick" type="text" name="newBookNick" placeholder="Nickname"><br>
              <label for="newBookDesc">Description:</label>
              <input id='newBookDesc' type="text" name="newBookDesc" placeholder="Description"><br>
              <label for="addFilter">Star Rating: </label>        
              <select id="newFilter" name="addFilter">
                <option value="" selected="selected">Filter</option>            
                <option value="1">One Star</option>
                <option value="2">Two Star</option>
                <option value="3">Three Star</option>
                <option value="4">Four Star</option>
                <option value="5">Five Star</option>                                                
              </select><br>
              <button class="buttonAddSubmit" type="submit">Submit</button>
              <button class="buttonAddCancel" type="reset">Cancel</button>
            </fieldset>
          </form>
          ${renderError()}
          `;
}

function render(myScreen) {
  let htmlString;
  switch (myScreen) {
  case 'main':
    htmlString = generateMainString();
    break;

  case 'add':
    htmlString = generateAddString();
    break;
  }
  $('.js-mainWindow').html(htmlString);
}

function initialize() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      render('main');
    });    
}

function getTitleIdFromElement(bookmark) {
  return $(bookmark)
    .closest('.js-bookmark-element')
    .data('bookmark-id');
}

function handleAddBookmark() {
  $('.js-mainWindow').on('click', '.buttonNew', function () {
    render('add');
  });
}

function handleExpandClick() {
  $('.js-mainWindow').on('click', 'li', function(event) {
    const id = getTitleIdFromElement(event.currentTarget);
    store.toggleExpanded(id);
    render('main');
  });
}

function handleSubmitBookmark() {
  $('.js-mainWindow').on('submit', '.addBookmarkForm', function (event) {
    event.preventDefault();
    let newBookmark = {
      id: cuid(),
      title: `${$(this).find('#newBookNick').val()}`,
      rating: `${$(this).find('#newFilter').val()}`,
      url: `${$(this).find('#newBookLink').val()}`,
      desc: `${$(this).find('#newBookDesc').val()}`
    };
    api.createBookmark(newBookmark)
      .then((newBM) => {
        store.addBookmark(newBM);
        render('main');        
      })
      .catch((err) => {
        store.setError(err.message);
        render('add');        
      });
  });
}

function handleCancelAddBookmark() {
  $('.js-mainWindow').on('click', '.buttonAddCancel', function () {
    render('main');
  });
}

function handleDeleteBookmark() {
  $('.js-mainWindow').on('click', '.buttonDel', function(event) {
    const id = getTitleIdFromElement(event.currentTarget);

    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render('main');        
      })
      .catch((err) => {
        store.setError(err.message);
        render('add');        
      });
  });
}

function handleFilterSelect() {
  $('.js-mainWindow').on('change','#js-filter', function() {
    let filter = $(this).val();
    store.setFilter(filter);
    render('main');    
  });
}

function handleErrorButtonClear() {
  $('.js-mainWindow').on('click', '#cancelError', function () {
    store.clearError();      
    render('add');
  });
 
}

function bindEventListeners() {
  handleAddBookmark();
  handleExpandClick();
  handleSubmitBookmark();
  handleCancelAddBookmark();
  handleDeleteBookmark();
  handleFilterSelect();
  handleErrorButtonClear();
}

export default {
  initialize,
  bindEventListeners,
  render
};
