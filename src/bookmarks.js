/* eslint-disable no-console */
import $ from 'jquery';
import cuid from 'cuid';

import store from './store.js';

function formBookmarkListItems() {
  let itemString = '';
  store.bookmarks.forEach(function(bookmark) {
    if(bookmark.expanded) {
      itemString += `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">${bookmark.title}
                       <p>Visit: ${bookmark.url}</p>
                       <p>Rating: ${bookmark.rating}</p>
                       <p>${bookmark.description}</p>                         
                     </li>`;
    }
    else {
      itemString += `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">${bookmark.title}</li>`;
    }
  });
  return itemString;
}

function generateMainString() {
  return `<section class="upperContainer">
            <div class="newBookmark">
              <label for="buttonNB">New Bookmark:</label><br>
              <button class="buttonNew" name="buttonNB" type="button">+ New Bookmark</button>
            </div>
            <div class="filterBy">
              <label for="filter">Filter By: </label><br>          
              <select id="js-filter" name="filter">
                <option value="" selected="selected">Filter</option>            
                <option value="oneStar">One Star</option>
                <option value="twoStar">Two Star</option>
                <option value="threeStar">Three Star</option>
                <option value="fourStar">Four Star</option>
                <option value="fiveStar">Five Star</option>                                                
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
              <label for="addFilter">Star Rating: </label><br>          
              <select id="newFilter" name="addFilter">
                <option value="" selected="selected">Filter</option>            
                <option value="oneStar">One Star</option>
                <option value="twoStar">Two Star</option>
                <option value="threeStar">Three Star</option>
                <option value="fourStar">Four Star</option>
                <option value="fiveStar">Five Star</option>                                                
              </select><br>
              <button class="buttonAddSubmit" type="submit">Submit</button>
              <button class="buttonAddCancel" type="reset">Cancel</button>
            </fieldset>
          </form>
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
  render('main');
}

function getTitleIdFromElement(bookmark) {
  return $(bookmark)
    .closest('.js-bookmark-element')
    .data('bookmark-id');
}

function handleAddBookmark() {
  $('.buttonNew').on('click', function () {
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
      description: `${$(this).find('#newBookDesc').val()}`,
      expanded: false      
    };
    store.bookmarks.push(newBookmark);
    render('main');
  });
}

function bindEventListeners() {
  handleAddBookmark();
  handleExpandClick();
  handleSubmitBookmark();
}

export default {
  initialize,
  bindEventListeners,
  render
};
