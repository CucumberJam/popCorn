import {useState} from "react";
import Button from "./Button";

export default function Box({children}){
    const [isOpen, setIsOpen] = useState(true);
    function onSetOpen(){
        setIsOpen((open) => !open);
    }

    return (
        <div className="box">
            <Button isOpen={isOpen} onSetOpen={onSetOpen}/>
            {isOpen && children}
        </div>
    );
}