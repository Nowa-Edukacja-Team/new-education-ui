import { useRef, useEffect } from 'react';

interface IMutationObserverOptions<T> {
    onMutation: (obj: T, mutations: MutationRecord[], document: Document) => void;
    condition?: (obj: T, document: Document) => boolean,
    config?: MutationObserverInit;
}

const DEFAULT_CONFIG = {
    attributes: true,
    subtree: true
} as MutationObserverInit;

const useMutationObserver = <T extends HTMLElement>(options: IMutationObserverOptions<T>) => {
    const { onMutation, condition, config } = options;
    const objectRef = useRef<T>(null);

    useEffect(() => {
        const observer = new MutationObserver((mutations, observer) => {
            let ref = objectRef.current;
            if(ref && (!condition || condition(ref, document))) {
                onMutation(ref, mutations, document);
            }
        });

        observer.observe(document, config || DEFAULT_CONFIG);
        return () => {
            observer.disconnect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectRef])

    return objectRef;
}

export default useMutationObserver;