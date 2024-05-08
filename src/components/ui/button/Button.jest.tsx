import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('renders a button', async () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock} text={'test'} />);

        // Use await to wait for the promise to resolve
        const button = await screen.findByRole('button', { name: 'test' });

        // Assert the visibility of the button
        expect(button).toBeVisible();
    });
});
