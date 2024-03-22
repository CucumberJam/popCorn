import {useEffect} from "react";

export function useEventKey(key, action){
    useEffect(()=> {
        function callback(e){
            if(e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }
        document.addEventListener('keydown', callback);

        return () => document.removeEventListener('keydown', callback);
    }, [key, action]);
}