let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function addBookmark (bookmark) {
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
}

function findById(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

function toggleExpanded(id) {
  const bookmark = this.bookmarks.find(currentBookmark => currentBookmark.id === id);
  bookmark.expanded = !bookmark.expanded;
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  findById,
  toggleExpanded,
  findAndDelete
};
