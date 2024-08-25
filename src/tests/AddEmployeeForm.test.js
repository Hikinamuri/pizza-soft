import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddEmployeeForm } from '../components/AddEmployeeForm/AddEmployeeForm.tsx'; 

describe('AddEmployeeForm', () => {
    let newEmployee, setNewEmployee, onAdd, onClose;

    beforeEach(() => {
        newEmployee = {
            name: '',
            phone: '',
            birthday: '',
            role: 'cook',
            isArchive: false
        };
        setNewEmployee = jest.fn();
        onAdd = jest.fn();
        onClose = jest.fn();

        jest.spyOn(console, 'error').mockImplementation((message) => {
            if (message.includes('findDOMNode is deprecated')) {
                return;
            }
            console.error(message);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        console.error.mockRestore();
    });

    test('calls onAdd when the add button is clicked', () => {
        render(
            <AddEmployeeForm
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                onAdd={onAdd}
                onClose={onClose}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Добавить/i }));
        expect(onAdd).toHaveBeenCalled();
    });
});
