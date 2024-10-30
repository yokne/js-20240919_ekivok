import ST1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends ST1 {
  constructor(headersConfig, {
    data = [],
    sorted = {},
    isSortLocally = true
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;

    this.sort();
    this.onHeaderClickHandler = this.onHeaderClickHandler.bind(this);
    this.subElements.header.addEventListener('pointerdown', this.onHeaderClickHandler);
  }

  sort() {
    if (this.isSortLocally) {
      super.sort(this.sorted.id, this.sorted.order);
    }
  }

  onHeaderClickHandler(e) {
    const headerCell = e.target.closest('div[data-id]');
    if (!headerCell) {return;}

    this.sorted = {
      id: headerCell.getAttribute('data-id'),
      order: this.sorted.id === headerCell.getAttribute('data-id') ? this.toggleSortOrder() : 'desc'
    };

    this.sort();
  }

  toggleSortOrder() {
    return this.sorted.order === 'asc' ? 'desc' : 'asc';
  }

  destroy() {
    super.destroy();
    this.subElements.header.removeEventListener('pointerdown', this.onHeaderClickHandler.bind(this));
  }
}