# 3. Home & About: Inhalte in JSX strukturieren

In diesem Kapitel schauen wir uns die beiden Seiten an, die hauptsächlich dazu dienen, Informationen zu präsentieren: die Startseite (`Home.jsx`) und die "Über uns"-Seite (`About.jsx`). 

Da diese Seiten keine komplexe Logik (wie Zustände oder Berechnungen) enthalten, steht hier das **semantische HTML** und die **Strukturierung von JSX** im Vordergrund. Du wirst sehen, wie man HTML-Elemente in React kombiniert und wie man CSS-Klassen wiederverwendet.

---

## Datei: `src/pages/Home.jsx` (Die Startseite)

```jsx
  1 | import { Link } from 'react-router-dom'
  2 | import './Home.css'
  3 |
  4 | function Home() {
  5 |     return (
  6 |         <div className="home">
  7 |             <section className="hero">
  8 |                 <h1>Hyper Job Fair</h1>
  9 |                 <p className="subtitle">
 10 |                     Die digitale Jobmesse, die dich und deine Fähigkeiten wirklich versteht.
 11 |                 </p>
 12 |                 <p className="description">
 13 |                     Mit hyper-personalisiertem Matching, smarter Vorbereitung und nahtloser
 14 |                     Integration – vor, während und nach der Messe.
 15 |                 </p>
 16 |                 <div className="cta-buttons">
 17 |                     <Link to="/matching"><button>Matching ausprobieren</button></Link>
 18 |                     <Link to="/about"><button className="secondary">Mehr erfahren</button></Link>
 19 |                 </div>
 20 |             </section>
 21 |
 22 |             <section className="features">
 23 |                 <div className="card">
 24 |                     <h3>🎯 Personalisiertes Matching</h3>
 25 |                     <p>Wie Tinder, aber für deine Karriere. Finde die Unternehmen, die wirklich zu dir passen.</p>
 26 |                 </div>
 27 |                 <div className="card">
 28 |                     <h3>💬 Chat &amp; Termine</h3>
 29 |                     <p>Vor der Messe mit Recruitern chatten, Fragen klären und Interviews vereinbaren.</p>
 30 |                 </div>
 31 |                 <div className="card">
 32 |                     <h3>📊 Feedback &amp; Entwicklung</h3>
 33 |                     <p>Nach der Messe individuelles Feedback erhalten und gezielt an deinen Skills arbeiten.</p>
 34 |                 </div>
 35 |             </section>
 36 |
 37 |             <section className="stats">
 38 |                 <div>
 39 |                     <span>79+</span>
 40 |                     <p>Befragte Studierende</p>
 41 |                 </div>
 42 |                 <div>
 43 |                     <span>47%</span>
 44 |                     <p>der „Involved“ – sie wollen Job &amp; Service</p>
 45 |                 </div>
 46 |                 <div>
 47 |                     <span>5 I's</span>
 48 |                     <p>Unser Framework für Hyper-Personalization</p>
 49 |                 </div>
 50 |             </section>
 51 |         </div>
 52 |     )
 53 | }
 54 |
 55 | export default Home


 Z. 1 Importiert Link aus React Router. Im Gegensatz zu NavLink (aus dem Header) fügt Link keine aktive Klasse hinzu, sondern lädt einfach nur die Zielseite ohne Neuladen.

Z. 2 Importiert die spezifischen Styles für die Startseite.

Z. 6 <div className="home"> ist der äußerste Wrapper. Er dient in Home.css als „Anker" für spezifische Styles (z.B. .home .hero), damit diese nicht versehentlich auf andere Seiten wirken.

Z. 7 Ein <section>-Tag. Semantisch gruppiert es den einleitenden Bereich (Hero). Das ist besser für die Barrierefreiheit als ein reines <div>.

Z. 8 Die Hauptüberschrift der Seite. Jede Seite sollte genau eine <h1> haben.

Z. 9 Ein Absatz mit dem Untertitel.

Z. 12 Ein Absatz mit der Beschreibung.

Z. 16 Ein Container (div), der die beiden Buttons nebeneinander anordnet (gesteuert durch Flexbox in Home.css).

Z. 17 Ein <Link>, der auf /matching verweist. Das ist die React-Router-Variante des <a href>-Tags.

Z. 18 Ein weiterer <Link>. Der Button hat hier die zusätzliche Klasse secondary. Das ermöglicht in Home.css ein anderes Styling (z.B. einen hellgrauen Hintergrund), um den primären vom sekundären Button zu unterscheiden.

Z. 22 Ein <section> für die Feature-Karten.

Z. 23–25 Die erste Karte. Sie verwendet die Klasse .card, die global in App.css definiert ist (weißer Hintergrund, Schatten). Home.css fügt über .features .card noch einen Hover-Effekt hinzu.

Z. 28 Das &amp; ist eine HTML-Entity, die im Browser als kaufmännisches Und (&) dargestellt wird. In JSX könnte man auch einfach & schreiben, aber die Entity ist sicherer, falls der Code später in ein anderes Format (z.B. XML) exportiert wird.

Z. 37 Ein <section> für die Statistiken (die drei Zahlen).

Z. 39, 43, 47 Die Zahl selbst steht in einem <span>-Element. Das ist wichtig, weil die Zahl in Home.css eine andere Schriftgröße (2.2rem) und Farbe bekommt als der Text darunter.

Z. 40, 44, 48 Die Beschreibung der Zahl steht in einem <p>.



