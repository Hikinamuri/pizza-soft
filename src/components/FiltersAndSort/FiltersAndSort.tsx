import React from 'react';
import cl from './FiltersAndSort.module.scss';
import { useDispatch } from 'react-redux';
import { employeesSlice } from '../../store/employees.slice.ts';

interface Employee {
    name: string;
    birthday: string;
    role: string;
    isArchive: boolean;
    isVisible?: boolean;
    isFiltered?: boolean;
}

interface FiltersAndSortProps {
    employees: Employee[];
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FiltersAndSort: React.FC<FiltersAndSortProps> = ({ employees, isChecked, setIsChecked }) => {
    const dispatch = useDispatch();

    const sortEmployees = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortType = event.target.value;
        let sortedList = [...employees];

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

        dispatch(employeesSlice.actions.setEmployees(sortedList));
    };

    const filterList = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const filterType = event.target.value;
        if (!filterType) return;

        let filteredEmployees = employees.map(employee => {
            if (filterType === 'all') {
                return {
                    ...employee,
                    isVisible: employee.isArchive === isChecked,
                    isFiltered: true
                };
            } else {
                return {
                    ...employee,
                    isVisible: employee.role === filterType && employee.isArchive === isChecked,
                    isFiltered: employee.role === filterType
                };
            }
        });

        dispatch(employeesSlice.actions.setEmployees(filteredEmployees));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        let filteredEmployees = employees.map(employee => ({
            ...employee,
            isVisible: employee.isFiltered && employee.isArchive === checked
        }));

        dispatch(employeesSlice.actions.setEmployees(filteredEmployees));
        setIsChecked(checked);
    };

    return (
        <div className={cl.filtersAndSort}>
            <select onChange={filterList}>
                <option value="all">Любая должность</option>
                <option value="cook">Повар</option>
                <option value="waiter">Официант</option>
                <option value="driver">Водитель</option>
            </select>
            <select onChange={sortEmployees}>
                <option value="name-up">По имени (А&#8594;Я)</option>
                <option value="name-down">По имени (Я&#8592;А)</option>
                <option value="birthday-up">По дате рождения &#8593;</option>
                <option value="birthday-down">По дате рождения &#8595;</option>
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
        </div>
    );
};
