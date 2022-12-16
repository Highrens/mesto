export default class Section {
    constructor({ data, renderer }, selector) {
      this._renderedItems = data;
      this._renderer = renderer; 
      
      this.container = document.querySelector(selector);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item));
    }
  
    addItem(element) {
      this.container.append(element);
    }
  }