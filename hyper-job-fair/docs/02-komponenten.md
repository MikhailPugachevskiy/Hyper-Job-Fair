# 2. Komponenten: Header und Footer

In React besteht die Oberfläche aus vielen kleinen, wiederverwendbaren Bausteinen, den sogenannten **Komponenten**. Man kann sie sich wie eigene HTML-Tags vorstellen, die man selbst definiert. In diesem Kapitel schauen wir uns an, wie unsere Navigation (`Header`) und unsere Fußzeile (`Footer`) aufgebaut sind und wie React mit CSS umgeht.

---

## 1. Komponenten und Props

Eine React-Komponente ist eine JavaScript-Funktion, die JSX zurückgibt. Man verwendet sie in einer anderen Komponente, indem man ihren Namen wie ein HTML-Tag schreibt (z.B. `<Header />`).

**Props** (Kurz für „Properties") sind die Parameter, die man einer Komponente übergibt. Sie funktionieren wie HTML-Attribute. Wenn man einer Komponente Daten von außen mitgeben möchte, schreibt man sie als Attribut in das Tag:

```jsx
// Beispiel: So würde man Props übergeben
<Footer copyrightText="© 2026 Hyper Job Fair" />

## Datei: `src/components/Header.jsx` (Der Header)

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

 Z. 6 Der Name der Komponente. In React müssen Komponentennamen immer mit einem Großbuchstaben beginnen (Header, nicht header). Das ist der wichtigste Unterschied zu normalen HTML-Tags, die immer klein geschrieben werden.

Z. 8–19 Das return der Funktion gibt das JSX zurück. Das <header>-Element bildet das semantische Grundgerüst für den Kopfbereich. Alles, was in diesem Tag steht, wird auf der Seite gerendert.

Z. 9 <div className="logo"> ist ein normales HTML-Element innerhalb der Komponente. Wir können so viele HTML-Elemente verschachteln, wie wir wollen.

Z. 12 Das <nav>-Element ist das semantische Element für Navigationsbereiche. Screenreader können so gezielt zu dieser Navigation springen.

Z. 23 export default Header macht die Komponente für andere Dateien importierbar. In App.jsx haben wir sie mit import Header from './components/Header' eingebunden.


## Datei: `src/components/Footer.jsx` (Der Footer)


  1 | import './Footer.css'
  2 |
  3 | function Footer() {
  4 |     return (
  5 |         <footer>
  6 |             <p>&copy; 2026 Hyper Job Fair – Personalisierte Jobmesse neu gedacht.</p>
  7 |             <p>Basierend auf dem Konzept der 5I's (Identifikation, Individualisierung, Interaktion, Integration, Integrität).</p>
  8 |         </footer>
  9 |     )
 10 | }
 11 |
 12 | export default Footer

 Z. 1 Importiert das Stylesheet für den Footer.

Z. 3 Der Name der Komponente (Footer mit großem F).

Z. 5 Ein <footer>-Tag. Auch das ist ein semantisches HTML-Element.

Z. 6 Ein Absatz. Das &copy; ist eine HTML-Entity und wird im Browser als Copyright-Symbol (©) dargestellt. In JSX schreibt man Entities genauso wie in HTML.

Z. 7 Ein zweiter Absatz mit dem Hinweis auf das 5I-Modell.

Z. 12 Der Export, damit die Komponente in App.jsx verwendet werden kann.



Typische Fragen

    Was ist der Unterschied zwischen einer Komponente und einer normalen Funktion? Eine Komponente gibt JSX zurück und wird in React mit <KomponentenName /> verwendet. Eine normale Funktion gibt irgendeinen Wert zurück. (In React kann eine Komponente auch andere Hooks wie useState enthalten, was normale Funktionen nicht dürfen.)

    Warum schreiben wir export default Header und nicht export Header? export default erlaubt es, die Komponente beim Import beliebig zu benennen (z.B. import Nav from './Header'). Bei export müsste der Name exakt übereinstimmen. In React-Projekten ist export default bei Komponenten üblich.

    Kann ich CSS auch direkt in JSX schreiben? Ja, mit dem style-Attribut. Aber das ist oft unübersichtlich, weil man ein Objekt übergeben muss (z.B. style={{ color: 'red' }}). In diesem Projekt verwenden wir externe CSS-Dateien, was wartbarer ist.

    Warum heißt die CSS-Datei Header.css und nicht header.css? Konvention: Komponenten-Dateien beginnen mit Großbuchstaben (Header.jsx), also benennt man die zugehörige CSS-Datei genauso. Das macht die Struktur übersichtlich.

Mach es selbst

    Ändere den Text im Footer auf „© 2027 Hyper Job Fair – Alle Rechte vorbehalten". Was siehst du?

    Füge im Header.jsx einen neuen NavLink hinzu, der auf /test zeigt (die Route hast du in Kapitel 1 selbst angelegt). Was passiert beim Klick darauf?

    Ändere in Header.css die Hintergrundfarbe (background: white;) auf background: #e0f5f0; (ein helles Türkis). Was passiert? (Der Header bekommt einen farbigen Hintergrund.)