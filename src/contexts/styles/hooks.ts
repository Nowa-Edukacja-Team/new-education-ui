import { useContext } from 'react';
import { _Context } from './context';

export const useStyle = () => {
    const state = useContext(_Context);
    return { ...state }
};