import React from 'react';
import { render } from '@testing-library/react';
import { useEffect } from 'react';
import useConstructor from './useConstructor';

describe('useConstructor', () => {
    it('calls the provided callback function only once', () => {
        const mockCallback = jest.fn();

        // Mock component using the hook
        function TestComponent() {
            useConstructor(mockCallback);

            useEffect(() => {
                // Simulate component lifecycle
            }, []);

            return null;
        }

        render(<TestComponent />);

        // Ensure the callback is called once
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('does not call the callback again on re-render', () => {
        const mockCallback = jest.fn();

        function TestComponent() {
            useConstructor(mockCallback);

            useEffect(() => {
                // Simulate component lifecycle
            }, []);

            return null;
        }

        const { rerender } = render(<TestComponent />);
        rerender(<TestComponent />); // Re-render the component

        // Ensure the callback is still called only once
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
});
