export default function Button({isOpen, onSetOpen}){
    return (
        <button className="btn-toggle"
                onClick={onSetOpen}>
            {isOpen ? "–" : "+"}
        </button>
    );
}