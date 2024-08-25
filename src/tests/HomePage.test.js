import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { Home } from '../pages/home/homePage.tsx';

describe('Home Component', () => {
    test('shows error message if fields are incomplete', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
    
        fireEvent.click(screen.getByText(/Добавить сотрудника/i));
        
        fireEvent.change(screen.getByPlaceholderText('Имя сотрудника'), { target: { value: 'John Doe' } });
    
        fireEvent.click(screen.getByRole('button', { name: /Добавить/i }));
        
        expect(window.alert).toHaveBeenCalledWith('Пожалуйста, заполните все поля!');
    });
});
