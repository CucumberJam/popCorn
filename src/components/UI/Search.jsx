import {useRef} from "react";
import {useEventKey} from "../../hooks/useEventKey";

export default function Search({query, onSetQuery}){
    const inputEl = useRef(null);

    useEventKey('Enter', () => {
        if(document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        onSetQuery('');
    });


    return (
        <input
            ref={inputEl}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
        />
    );
}