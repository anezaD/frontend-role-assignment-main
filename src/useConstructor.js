import { useRef } from 'react';

/**
 * Calls the provided callback function only once, when the component using the
 * hook is constructed. Can be used for emulating a constructor function inside
 * a class component.
 * @param {function} callBack - The function to be called when the component is constructed.
 * @returns {void}
 */
const useConstructor = (callback = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callback();
    hasBeenCalled.current = true;
};

export default useConstructor;
