import View from './View';
import icons from '../../img/icons.svg';
import previewView from './PreviewView';

class BookMarksView extends View {
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it.`;
  _parentElement = document.querySelector('.bookmarks__list');

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookMarksView();
