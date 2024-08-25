import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeList } from '../components/EmployeeList/EmployeeList.tsx';

const mockEmployees = [
  { id: 1, name: 'Иван Иванов', role: 'cook', phone: '+7 (123) 456-78-90', isVisible: true },
  { id: 2, name: 'Мария Смирнова', role: 'waiter', phone: '+7 (987) 654-32-10', isVisible: true },
  { id: 3, name: 'Петр Петров', role: 'driver', phone: '+7 (555) 123-45-67', isVisible: false },
];

describe('EmployeeList', () => {
  it('renders the visible employees correctly', () => {
    render(<EmployeeList employees={mockEmployees} onEmployeeClick={jest.fn()} />);

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText('Мария Смирнова')).toBeInTheDocument();
    expect(screen.queryByText('Петр Петров')).not.toBeInTheDocument();

    expect(screen.getByText('Повар')).toBeInTheDocument();
    expect(screen.getByText('Официант')).toBeInTheDocument();
  });

  it('calls onEmployeeClick when an employee is clicked', () => {
    const handleClick = jest.fn();

    render(<EmployeeList employees={mockEmployees} onEmployeeClick={handleClick} />);

    fireEvent.click(screen.getByText('Иван Иванов'));

    expect(handleClick).toHaveBeenCalledWith(mockEmployees[0]);

    fireEvent.click(screen.getByText('Мария Смирнова'));

    expect(handleClick).toHaveBeenCalledWith(mockEmployees[1]);
  });

  it('does not call onEmployeeClick when a non-visible employee is clicked', () => {
    const handleClick = jest.fn();

    render(<EmployeeList employees={mockEmployees} onEmployeeClick={handleClick} />);

    expect(screen.queryByText('Петр Петров')).not.toBeInTheDocument();
  });
});
