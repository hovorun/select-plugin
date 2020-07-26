const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? 'Default placeholder';
    const items = data.map(item => {
        let cls = '';
        if (item.id === selectedId) {
            text = item.value;
            cls = 'selected';
        }
        return `
            <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `;
    });


    return ` <div class="select__backdrop" data-type="backdrop"></div>  
            <div class="select__input" data-type="input">
                <span data-type="value">${text}</span>
                <i class="fas fa-chevron-down" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                    ${items.join('')}
                </ul>
            </div>`;
};


export default class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.$el.classList.add('select');
        this.#render();
        this.#setup();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('fa-chevron-down');
        this.$arrow.classList.add('fa-chevron-up');
    }

    #render() {
        const {placeholder} = this.options;
        const {data} = this.options;

        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    close() {
        this.$el.classList.remove('open');
        this.$arrow.classList.remove('fa-chevron-up');
        this.$arrow.classList.add('fa-chevron-down');
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('selected'));
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.options.onSelect ? this.options.onSelect(this.current) : '';
        this.close();
    }

    clickHandler(event) {
        const {type} = event.target.dataset;
        if (type === 'input') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.remove();
    }
}
