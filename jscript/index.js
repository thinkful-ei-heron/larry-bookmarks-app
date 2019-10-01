/* eslint-disable no-console */

const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};

function formBookmarkListItems() {
  let itemString = '';
  store.bookmarks.forEach(function(bookmark) {
    itemString += `<li>${bookmark.title}</li>`;
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
            <ul>
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

function handleAddBookmark() {
  $('.buttonNew').on('click', function () {
    render('add');
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

function main() {
  initialize();
  handleAddBookmark();
  handleSubmitBookmark();
}

main ();
