import React from 'react';
import cl from './FiltersAndSort.module.scss';

export const FiltersAndSort = ({ employees, setSortedEmployees, isChecked, setIsChecked }) => {
    const sortEmployees = (event) => {
        const sortType = event.target.value;
        let sortedList = [...employees];
        sortedList = sortedList.map(obj => {
            const {birthday, ...other} = obj;
            const newBirthday = birthday.split('.').reverse().join('-');
            return {birthday: newBirthday, ...other};
        });

        switch (sortType) {
            case 'name-up':
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-down':
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'birthday-up':
                sortedList.sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
                break;
            case 'birthday-down':
                sortedList.sort((a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime());
                break;
            default:
                break;
        }
        setSortedEmployees(sortedList);
    };

    const filterList = (event) => {
        const filterType = event.target.value;
        if (!filterType) return;
        setSortedEmployees(filterType === 'all' ? employees : employees.filter(e => e.role === filterType));
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className={cl.filtersAndSort}>
            <select onChange={filterList}>
                <option value="all">Любая должность</option>
                <option value="cook">Повар</option>
                <option value="waiter">Официант</option>
                <option value="driver">Водитель</option>
            </select>
            <div className={cl.checkboxContainer}>
                <input 
                    type="checkbox" 
                    id="archive-checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="archive-checkbox">В архиве</label>
            </div>
            <div className={cl.sortOptions}>
                <select onChange={sortEmployees}>
                    <option value="name-up">По имени (А&#8594;Я)</option>
                    <option value="name-down">По имени (Я&#8592;А)</option>
                    <option value="birthday-up">По дате рождения &#8593;</option>
                    <option value="birthday-down">По дате рождения &#8595;</option>
                </select>
            </div>
        </div>
    );
};