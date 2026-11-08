import { NavLink } from 'react-router-dom'
import './Header.css'

const navClass = ({ isActive }) => (isActive ? 'active' : '')

function Header() {
    return (
        <header>
            <div className="logo">
                <span>🔷 Hyper Job Fair</span>
            </div>
            <nav>
                <NavLink to="/" className={navClass}>Home</NavLink>
                <NavLink to="/about" className={navClass}>About</NavLink>
                <NavLink to="/matching" className={navClass}>Matching-Demo</NavLink>
                <NavLink to="/journey" className={navClass}>Customer Journey</NavLink>
                <NavLink to="/contact" className={navClass}>Kontakt</NavLink>
            </nav>
        </header>
    )
}

export default Header