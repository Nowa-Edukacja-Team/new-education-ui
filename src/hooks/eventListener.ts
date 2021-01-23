import { useRef, useEffect } from 'react';

interface IEventListenerHookOptions {
    type: string | string[],
    func: (event: any) => void,
    condition?: boolean,
    onClick?: React.MouseEventHandler<any>;
}

const useEventListener = <T extends HTMLElement>(options: IEventListenerHookOptions) => {
    const { type, func, condition, onClick } = options;
    const objectRef = useRef<T>(null);

    useEffect(() => {
        const eventFunc = (event: any) => {
            func(event);
            if(onClick) {
                onClick(event);
            }
        }

        const getProperTypes = (types: string | string[]) => {
            if(typeof types === 'string') {
                return [types];
            }
            return types;
        }

        if(objectRef && objectRef.current && (condition === null || condition === undefined || condition)) {
            const refCurrent = objectRef.current;
            getProperTypes(type).forEach(eventType => refCurrent.addEventListener(eventType, eventFunc));
            return () => {
                getProperTypes(type).forEach(eventType => refCurrent.removeEventListener(eventType, eventFunc));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectRef, type, func])

    return objectRef;
}

export default useEventListener;