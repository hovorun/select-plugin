import Select from './select/select';
import './select/index.scss';
const select = new Select('#select', {
    placeholder: 'Please choose the element',
    selectedId: '4',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
        {id: '4', value: 'React Native'},
        {id: '5', value: 'Next'},
        {id: '6', value: 'Angular Universal'},
    ],
    onSelect(item) {
        console.log('Selected item:', item);
    }
});

window.s = select;
