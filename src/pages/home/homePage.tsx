import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; 
import cl from './homePage.module.scss';

export const Home = () => {
    const employees = useSelector((state: RootState) => state.employees.list);
    const [sortedEmployees, setSortedEmployees] = useState(employees);

    const sortEmployees = (event) => {
        const sortType = event.target.value;
        const fixBirthdayList = sortedEmployees.map(obj => {
            const {birthday, ...other} = obj
            const newBirthday = birthday.split('.').reverse().join('-')
            return {birthday: newBirthday, ...other};
        })
        let sortedList = fixBirthdayList;

        switch (sortType) {
            case 'name-up':
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-down':
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'birthday-up':
                sortedList.sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
                break
            case 'birthday-down':
                sortedList.sort((a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime());
                break;
            default: 
                break
        }

        setSortedEmployees(sortedList)
    }

    return (
        <div className={cl.home}>
            <div>
                Фильтры
            </div>
            <select name="" onChange={sortEmployees}>
                <option value="name-up">По имени (А&#8594;Я)</option>
                <option value="name-down">По имени (Я&#8592;А)</option>
                <option value="birthday-up">По дате рождения &#8593;</option>
                <option value="birthday-down">По дате рождения &#8595;</option>
            </select>
            <div className={cl.cards}>
                {sortedEmployees.map((employee) => (
                    <div key={employee.id} className={cl.card}> 
                        <strong>{employee.name}</strong>
                        <p>{employee.birthday}</p>
                        <p>{employee.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}