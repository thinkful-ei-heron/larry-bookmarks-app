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
              <li>Bookmark#1</li>
              <li>Bookmark#2</li>
              <li>Bookmark#3</li>
              <li>Bookmark#4</li>
              <li>Bookmark#5</li>                                
            </ul>
          </section>`;
}

function generateAddString() {
  return `<form class="addBookmarkForm">
            <fieldset name="formField">
              <label for="newBookName">Add New Bookmark:</label>
              <input type="text" name="newBookName" placeholder="http://www.newsite.com"><br>
              <label for="newBookNick">Nickname:</label>
              <input type="text" name="newBookName" placeholder="Nickname"><br>
              <label for="newBookDesc">Description:</label>
              <input type="text" name="newBookDesc" placeholder="Description"><br>
              <label for="addFilter">Star Rating: </label><br>          
              <select id="js-addFilter" name="addFilter">
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
  switch(myScreen) {
  case 'main': {
    let htmlString = generateMainString();
    $('.js-mainWindow').html(htmlString);
  }
    break;
  case 'add': {
    let htmlString = generateAddString();
    $('.js-mainWindow').html(htmlString);        
  }
    break;
  }
}

function initialize() {
  render('main');
}

function handleAddBookmark() {
  $('.buttonNew').on('click', function (event) {
    console.log(`Click Button Add Bookmark, ${JSON.stringify(event)}`);
    render('add');
  });
}

function main() {
  initialize();
  handleAddBookmark();
}

main ();
