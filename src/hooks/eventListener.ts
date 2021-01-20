import { useRef, useEffect } from 'react';

interface IEventListenerHookOptions {
    type: string,
    func: (event: any) => void,
    condition?: boolean,
    onClick?: React.MouseEventHandler<any>;
}

const useEventListener = (options: IEventListenerHookOptions) => {
    const { type, func, condition, onClick } = options;
    const objectRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const eventFunc = (event: any) => {
            func(event);
            if(onClick) {
                onClick(event);
            }
        }

        if(objectRef && objectRef.current && condition) {
            const refCurrent = objectRef.current;
            refCurrent.addEventListener(type, eventFunc);
            return () => {
                refCurrent.removeEventListener(type, eventFunc);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectRef, type, func])

    return objectRef;
}

export default useEventListener;