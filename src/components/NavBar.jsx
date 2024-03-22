import Logo from "./UI/Logo";

export default function NavBar({children}){
    return (
        <nav className="nav-bar">
            <Logo/>
            {children}
        </nav>
    );
}