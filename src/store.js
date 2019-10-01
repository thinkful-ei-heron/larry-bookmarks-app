let bookmarks = [
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
  }];
  
let adding = false;
let error = null;
let filter = 0;

function findById(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

function toggleExpanded(id) {
  const bookmark = this.bookmarks.find(currentBookmark => currentBookmark.id === id);
  bookmark.expanded = !bookmark.expanded;

}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  toggleExpanded
};