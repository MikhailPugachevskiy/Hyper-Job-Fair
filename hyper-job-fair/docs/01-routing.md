# 1. Routing: Wie die Seiten miteinander verbunden sind

In einer normalen Website würde ein Klick auf „About" eine neue HTML-Datei (`about.html`) vom Server laden. In einer React-App (Single Page Application) gibt es nur eine einzige `index.html`. Das **Routing** sorgt dafür, dass die URL in der Adresszeile aktualisiert wird und React im Hintergrund die passende Komponente austauscht.

In diesem Projekt wird das Routing durch die Bibliothek **React Router** (Version 6) übernommen.

---

## Datei: `src/App.jsx` (Der Router)

```jsx
  1 | import { Routes, Route } from 'react-router-dom'
  2 | import Header from './components/Header'
  3 | import Footer from './components/Footer'
  4 | import ScrollToTop from './components/ScrollToTop'
  5 | import Home from './pages/Home'
  6 | import About from './pages/About'
  7 | import MatchingDemo from './pages/MatchingDemo'
  8 | import CustomerJourney from './pages/CustomerJourney'
  9 | import Contact from './pages/Contact'
 10 |
 11 | function App() {
 12 |   return (
 13 |     <>
 14 |       <ScrollToTop />
 15 |       <Header />
 16 |       <main>
 17 |         <Routes>
 18 |           <Route path="/" element={<Home />} />
 19 |           <Route path="/about" element={<About />} />
 20 |           <Route path="/matching" element={<MatchingDemo />} />
 21 |           <Route path="/journey" element={<CustomerJourney />} />
 22 |           <Route path="/contact" element={<Contact />} />
 23 |         </Routes>
 24 |       </main>
 25 |       <Footer />
 26 |     </>
 27 |   )
 28 | }
 29 |
 30 | export default App


Z. 1 Importiert Routes und Route aus der React-Router-Bibliothek. Routes ist der Container, Route ist eine einzelne Regel („Wenn diese URL aufgerufen wird, zeige jene Komponente").

Z. 2–4 Importiert die Komponenten, die auf jeder Seite sichtbar sein sollen (Header, Footer, ScrollToTop).

Z. 5–9 Importiert die fünf Seiten-Komponenten aus dem pages/-Ordner.

Z. 11 Definiert die React-Komponente App. Sie ist der Einstiegspunkt für unsere gesamte Oberfläche.

Z. 13 Ein leeres Fragment (<> ... </>). Es gruppiert mehrere Elemente, ohne ein zusätzliches <div> im HTML-Baum zu erzeugen. Würde man stattdessen ein <div> nehmen, könnte das das CSS-Layout (z.B. das Flexbox-Verhalten) durcheinanderbringen.

Z. 14 Bindet ScrollToTop ein. Diese Komponente rendert selbst nichts (sie gibt null zurück), sondern führt nur eine Aktion aus: Sie scrollt die Seite nach oben, wenn sich die URL ändert.

Z. 15 Der Header (die Navigationsleiste) wird außerhalb von <Routes> platziert. Dadurch bleibt er auf allen Seiten sichtbar, egal welche URL gerade aktiv ist.

Z. 16 Ein <main>-Tag. Es ist semantisch wichtig (Barrierefreiheit) und grenzt den Bereich ab, in dem sich der Inhalt der jeweiligen Seite befindet. In App.css ist es zentriert und hat eine maximale Breite.

Z. 17–23 <Routes> umschließt alle einzelnen Routen. React Router sucht bei jedem URL-Aufruf die erste Route, die auf das Muster passt, und rendert deren element.

Z. 18 Die Route für die Startseite. Der Pfad / steht für die Wurzel-URL (z.B. localhost:5173/).

Z. 19–22 Die Routen für die anderen Seiten. Der path entspricht exakt dem, was später in der URL steht (z.B. localhost:5173/about).

Z. 23 Schließt <Routes>.

Z. 25 Der Footer wird ebenfalls außerhalb der Routen platziert. Dadurch ist er auf allen Seiten sichtbar.

Z. 30 Exportiert die App-Komponente, damit sie in main.jsx importiert und gerendert werden kann.


## Datei: `src/components/Header.jsx` (Die Navigation)

```jsx
  1 | import { NavLink } from 'react-router-dom'
  2 | import './Header.css'
  3 |
  4 | const navClass = ({ isActive }) => (isActive ? 'active' : '')
  5 |
  6 | function Header() {
  7 |     return (
  8 |         <header>
  9 |             <div className="logo">
 10 |                 <span>🔷 Hyper Job Fair</span>
 11 |             </div>
 12 |             <nav>
 13 |                 <NavLink to="/" className={navClass}>Home</NavLink>
 14 |                 <NavLink to="/about" className={navClass}>About</NavLink>
 15 |                 <NavLink to="/matching" className={navClass}>Matching-Demo</NavLink>
 16 |                 <NavLink to="/journey" className={navClass}>Customer Journey</NavLink>
 17 |                 <NavLink to="/contact" className={navClass}>Kontakt</NavLink>
 18 |             </nav>
 19 |         </header>
 20 |     )
 21 | }
 22 |
 23 | export default Header

 Z. 1 Importiert NavLink. Das ist eine besondere Form von <Link>, die weiß, ob sie gerade aktiv ist (also ob die URL mit ihrem to-Attribut übereinstimmt).

Z. 2 Importiert das Stylesheet für den Header.

Z. 4 Eine Hilfsfunktion. NavLink ruft diese Funktion auf und übergibt ein Objekt mit der Eigenschaft isActive (Wahrheitswert: true oder false). Wenn die Route aktiv ist, gibt die Funktion den String 'active' zurück, sonst einen leeren String ''.

Z. 6–22 Die eigentliche Komponentenfunktion.

Z. 8 Ein <header>-Tag. In Header.css ist es als sticky definiert (bleibt oben kleben) und hat einen Schatten.

Z. 9–11 Der Logo-Bereich. Das className="logo" wird in Header.css in der Farbe Türkis-Grün (#008c7a) gestylt.

Z. 12 Das <nav>-Element fasst die Links semantisch zusammen.

Z. 13–17 Fünf NavLink-Komponenten. to="/" ist das Ziel (die URL). className={navClass} übergibt die Funktion von Z. 4. React Router fügt dann automatisch die Klasse active hinzu, wenn die Route übereinstimmt. Dadurch wird der aktive Link in Header.css fett und unterstrichen dargestellt.

Z. 23 Exportiert die Header-Komponente.


## Datei: `src/components/ScrollToTop.jsx` (Der Scroll-Helfer)

  1 | import { useEffect } from 'react'
  2 | import { useLocation } from 'react-router-dom'
  3 |
  4 | function ScrollToTop() {
  5 |     const { pathname } = useLocation()
  6 |     useEffect(() => {
  7 |         window.scrollTo(0, 0)
  8 |     }, [pathname])
  9 |     return null
 10 | }
 11 |
 12 | export default ScrollToTop

 Z. 1 Importiert den Hook useEffect aus React. Hooks sind spezielle Funktionen, die in React-Komponenten verwendet werden dürfen (erkennbar am Präfix use).

Z. 2 Importiert useLocation aus React Router. Dieser Hook gibt uns Informationen über die aktuelle URL.

Z. 4–11 Die Komponente.

Z. 5 useLocation() gibt ein Objekt zurück, das unter anderem die Eigenschaft pathname enthält (z.B. /about). Durch die geschweiften Klammern { pathname } (sogenanntes Destructuring) holen wir nur diesen einen Wert heraus.

Z. 6 useEffect führt Code aus, nachdem die Komponente gerendert wurde. Es ist für Dinge gedacht, die „außerhalb" von React passieren (z.B. Timer, Netzwerk-Anfragen oder eben das Scrollen des Browserfensters).

Z. 7 Die eigentliche Aktion: window.scrollTo(0, 0) scrollt das Browserfenster ganz nach oben (x=0, y=0).

Z. 8 Das Dependency-Array. Es sagt React: „Führe den Code in Z. 7 nur dann aus, wenn sich pathname geändert hat." Wenn wir auf „About" klicken, ändert sich der pathname von / zu /about. Die Seite scrollt nach oben. Klicken wir auf denselben Link nochmal, ändert sich nichts, und React führt den Code nicht aus (Optimierung).

Z. 9 Die Komponente gibt null zurück. Sie hat keine sichtbare Oberfläche, sondern führt nur eine Aktion im Hintergrund aus.


Typische Fragen

    Warum steht Header und Footer außerhalb von <Routes>? Weil sie auf jeder Seite sichtbar sein sollen. Wenn sie innerhalb von <Routes> stünden, müsste man sie bei jeder einzelnen Route erneut einbinden – das wäre redundant und fehleranfällig.

    Was ist der Unterschied zwischen <Link> und <NavLink>? Beide erzeugen einen HTML-Link (<a>), aber <NavLink> weiß, ob die Route gerade aktiv ist, und kann sich entsprechend stylen (z.B. fett und unterstrichen). <Link> hat diese Funktion nicht.

    Was ist ein „Hook"? Eine spezielle Funktion in React, die man nur innerhalb von Komponenten aufrufen darf. Sie beginnt immer mit use (z.B. useState, useEffect, useLocation). Hooks geben uns Zugriff auf React-Funktionen wie State, Lifecycle oder den Router.

    Was macht window.scrollTo(0, 0)? Es scrollt das Fenster an die Koordinaten x=0 und y=0, also ganz nach oben links. Das ist wichtig, weil der Browser sonst die Scroll-Position beim Seitenwechsel behält.

Mach es selbst

    Füge in App.jsx eine neue Route hinzu: <Route path="/test" element={<h1>Testseite</h1>} />. Rufe localhost:5173/test im Browser auf. Was passiert?

    Ändere in Header.jsx den Text von NavLink to="/about" von „About" zu „Über uns". Was siehst du?

    Entferne testweise [pathname] in Z. 8 von ScrollToTop.jsx (ersetze es durch []). Scrolle auf der Startseite nach unten und klicke dann auf „About". Was passiert? (Du bleibst unten – weil der Effekt nur einmal beim ersten Rendern ausgeführt wird.)