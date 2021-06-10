import View from './View';
import icons from '../../img/icons.svg';
import previewView from './PreviewView';

class ResultsView extends View {
  _errorMessage = `Sorry could not find that recipe, try again.`;
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
