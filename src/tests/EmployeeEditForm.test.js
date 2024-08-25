import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { EmployeeEditForm } from '../components/EmployeeEditForm/EmployeeEditForm.tsx';
import { employeeActions } from '../store/employee.slice.ts';
import { employeesSlice } from '../store/employees.slice.ts';

const mockStore = configureStore([]);
const initialState = {
  employee: {
    name: '',
    phone: '',
    birthday: '',
    role: '',
    isArchive: false,
  },
};

describe('EmployeeEditForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    jest.spyOn(console, 'error').mockImplementation((message) => {
        if (message.includes('findDOMNode is deprecated')) {
            return;
        }
        console.error(message);
    });
  });

  it('renders EmployeeEditForm correctly', () => {
    render(
      <Provider store={store}>
        <EmployeeEditForm employee={initialState.employee} onClose={jest.fn()} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Имя сотрудника')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Телефон')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Дата рождения (дд-мм-гггг)')).toBeInTheDocument();
    expect(screen.getByText('Повар')).toBeInTheDocument();
    expect(screen.getByText('Официант')).toBeInTheDocument();
    expect(screen.getByText('Водитель')).toBeInTheDocument();
    expect(screen.getByLabelText('В архиве')).toBeInTheDocument();
  });

  it('dispatches actions on input change', () => {
    render(
      <Provider store={store}>
        <EmployeeEditForm employee={initialState.employee} onClose={jest.fn()} />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Имя сотрудника');
    fireEvent.change(nameInput, { target: { value: 'Иван Иванов', name: 'name' } });

    expect(store.dispatch).toHaveBeenCalledWith(
      employeeActions.updateEmployeeField({ field: 'name', value: 'Иван Иванов' })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      employeesSlice.actions.updateEmployee({ ...initialState.employee, name: 'Иван Иванов' })
    );
  });

  it('dispatches actions on checkbox change', () => {
    render(
      <Provider store={store}>
        <EmployeeEditForm employee={initialState.employee} onClose={jest.fn()} />
      </Provider>
    );

    const checkbox = screen.getByLabelText('В архиве');
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(
      employeeActions.updateEmployeeField({ field: 'isArchive', value: true })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      employeesSlice.actions.updateEmployee({ ...initialState.employee, isArchive: true })
    );
  });
});
