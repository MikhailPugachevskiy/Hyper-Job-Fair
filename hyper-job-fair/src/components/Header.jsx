import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header>
            <div className="logo">
                <span>🔷 Hyper Job Fair</span>
            </div>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                <NavLink to="/matching" className={({ isActive }) => isActive ? 'active' : ''}>Matching-Demo</NavLink>
                <NavLink to="/journey" className={({ isActive }) => isActive ? 'active' : ''}>Customer Journey</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Kontakt</NavLink>
            </nav>
        </header>
    )
}

export default Header