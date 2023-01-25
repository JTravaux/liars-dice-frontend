import Home from '../views/Home/Home';
import { render, screen } from '@testing-library/react';
import useConfig from '../hooks/useConfig';

test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Change To/i);
    expect(linkElement).toBeInTheDocument();
});
