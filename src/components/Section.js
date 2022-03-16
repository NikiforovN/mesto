export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector
  }
  renderItems(itemsArr) {
    itemsArr.forEach((item) => this._renderer(item));
  }
  _addItem() {
    this._container = document.querySelector(this._containerSelector);
    return this._container;
  }
  prependItem(element) {
    this._addItem()
    this._container.prepend(element);
  }
}
