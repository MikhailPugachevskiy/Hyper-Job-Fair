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


## Datei: `src/pages/About.jsx` (Über uns)

```jsx
  1 | import './About.css'
  2 |
  3 | function About() {
  4 |     return (
  5 |         <div className="about">
  6 |             <h1>Über Hyper Job Fair</h1>
  7 |             <p className="intro">
  8 |                 Wir revolutionieren die klassische Jobmesse mit einem hyper-personalisierten Ansatz.
  9 |                 Basierend auf dem <strong>5I's-Modell</strong> schaffen wir eine Plattform, die
 10 |                 Studierende und Arbeitgeber optimal zusammenbringt.
 11 |             </p>
 12 |
 13 |             <section className="five-is">
 14 |                 <h2>Die 5 I's der Hyper-Personalization</h2>
 15 |                 <div className="is-grid">
 16 |                     <div className="is-card">
 17 |                         <span className="icon">🔍</span>
 18 |                         <h3>Identification</h3>
 19 |                         <p>Erfassung von Profildaten (LinkedIn, Orientierungstest) – die Basis für personalisierte Empfehlungen.</p>
 20 |                     </div>
 21 |                     <div className="is-card">
 22 |                         <span className="icon">🎯</span>
 23 |                         <h3>Individualization</h3>
 24 |                         <p>Matching-Algorithmus und individuelle Feedbackschleifen – jedes Erlebnis ist einzigartig.</p>
 25 |                     </div>
 26 |                     <div className="is-card">
 27 |                         <span className="icon">💬</span>
 28 |                         <h3>Interaction</h3>
 29 |                         <p>Chat, Social Contests, Live-Polls – echte Begegnungen digital und vor Ort.</p>
 30 |                     </div>
 31 |                     <div className="is-card">
 32 |                         <span className="icon">🔗</span>
 33 |                         <h3>Integration</h3>
 34 |                         <p>Nahtlose Einbindung in den gesamten Customer Journey – von der Vorbereitung bis zum Follow-up.</p>
 35 |                     </div>
 36 |                     <div className="is-card">
 37 |                         <span className="icon">🛡️</span>
 38 |                         <h3>Integrity</h3>
 39 |                         <p>GDPR-konform, transparente Datenverarbeitung und vollständige Kontrolle für die Nutzer.</p>
 40 |                     </div>
 41 |                 </div>
 42 |             </section>
 43 |
 44 |             <section className="target">
 45 |                 <h2>Unsere Zielgruppen</h2>
 46 |                 <div className="target-grid">
 47 |                     <div className="card">
 48 |                         <h3>🎓 Studierende &amp; Absolventen</h3>
 49 |                         <p>Unter 30 Jahren, aus aller Welt, auf der Suche nach dem ersten Job oder Praktikum.</p>
 50 |                     </div>
 51 |                     <div className="card">
 52 |                         <h3>🏢 Unternehmen</h3>
 53 |                         <p>Die passenden Talente finden – effizient, datenbasiert und mit echtem menschlichen Kontakt.</p>
 54 |                     </div>
 55 |                 </div>
 56 |                 <p className="cluster-hint">
 57 |                     <strong>3 Cluster</strong> wurden identifiziert: <em>The Networkers</em> (21,5 %),
 58 |                     <em>Involved</em> (47 %) und <em>I don't care</em> (31,4 %). Wir fokussieren die Involved und Networkers.
 59 |                 </p>
 60 |             </section>
 61 |
 62 |             <section className="value">
 63 |                 <h2>Unsere Versprechen</h2>
 64 |                 <ul>
 65 |                     <li><strong>💸 Cheap:</strong> Bezahlung nur bei erfolgreicher Vermittlung – für Studierende kostenfrei.</li>
 66 |                     <li><strong>⚡ Flawless:</strong> Reibungslose Prozesse, digitale Wartelisten, Orientierungstests.</li>
 67 |                     <li><strong>🔒 Secure:</strong> Höchste Datenschutzstandards (GDPR) – jederzeit löschbare Daten.</li>
 68 |                 </ul>
 69 |             </section>
 70 |         </div>
 71 |     )
 72 | }
 73 |
 74 | export default About


     Z. 1 Importiert die spezifischen Styles für die About-Seite.

    Z. 5 Der äußere Wrapper mit der Klasse about. Er dient wieder als „Anker" für die Styles (z.B. .about .intro).

    Z. 6 Die Hauptüberschrift.

    Z. 7–11 Der Einleitungsabsatz. In Z. 9 wird das <strong>-Tag verwendet, um „5I's-Modell" fett darzustellen.

    Z. 13 Der Bereich für die 5 I's.

    Z. 14 Eine Unterüberschrift (<h2>).

    Z. 15 Ein Container für das Grid (in About.css als CSS-Grid definiert). Dadurch werden die fünf Karten automatisch nebeneinander (und bei wenig Platz untereinander) angeordnet.

    Z. 16–20 Die erste Karte (Identification). Jede Karte hat ein Icon (als Emoji), eine Überschrift (<h3>) und einen Beschreibungstext (<p>).

    Z. 21–40 Die restlichen vier Karten. Sie folgen exakt demselben Muster.

    Z. 44–60 Der Bereich für die Zielgruppen.

    Z. 46 Ein Grid für die beiden Zielgruppen-Karten.

    Z. 56–59 Ein besonderer Absatz (.cluster-hint), der in About.css als „Pill" (abgerundeter Balken) gestaltet ist. Hier werden <strong> (fett) und <em> (kursiv) kombiniert, um die Cluster-Namen hervorzuheben.

    Z. 62–69 Der Bereich für die Versprechen.

    Z. 64 Eine ungeordnete Liste (<ul>).

    Z. 65–67 Die drei Listeneinträge (<li>). In About.css ist definiert, dass diese Liste keine Punkte (Bullets) hat und stattdessen jeder Eintrag wie eine kleine Karte aussieht.

Typische Fragen

    Warum verwenden wir <section> und nicht einfach nur <div>? <section> ist semantisch bedeutungsvoller. Ein Screenreader kann daraus schließen, dass es sich um einen eigenständigen inhaltlichen Abschnitt handelt. Ein <div> hat keine semantische Bedeutung.

    Was ist der Unterschied zwischen <strong> und <b>? <strong> bedeutet „wichtiger Inhalt" und wird von Screenreadern betont vorgelesen. <b> ist nur „fett" (rein visuell). In modernem HTML bevorzugt man <strong>.

    Warum schreiben wir &amp; statt &? In JSX (und HTML) ist das kaufmännische Und ein Sonderzeichen. In den meisten Fällen funktioniert auch ein einfaches &, aber &amp; ist der standardisierte Weg und vermeidet Fehler, falls der Code in anderen Kontexten (z.B. in Attributen oder in XML) verwendet wird.

    Wie funktioniert das Grid in About.css ohne Media Query? Durch grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)). Das bedeutet: „Erzeuge so viele Spalten wie möglich, jede mindestens 180px breit, und verteile den restlichen Platz gleichmäßig (1fr)." Wenn der Bildschirm schmaler wird, brechen die Karten automatisch in die nächste Zeile um. Das ist ein sehr elegantes, responsives Muster.

    Warum gibt es in About.jsx keine useState- oder useEffect-Hooks? Weil diese Seite rein statisch ist. Sie zeigt nur Inhalte an und hat keine Interaktion, die einen Zustand erfordern würde.

Mach es selbst

    Ändere in Home.jsx die Zahl 79+ auf 100+. Was siehst du? (Die Zahl in der Statistik wird aktualisiert.)

    Füge in About.jsx einen sechsten is-card-Block hinzu (z.B. mit dem Icon „🚀" und dem Titel „Innovation"). Was passiert mit dem Layout? (Das Grid passt sich automatisch an – die Karten werden etwas schmaler oder rutschen in die nächste Zeile.)

    Ändere in Home.css die Hintergrundfarbe des .hero-Bereichs auf #000000 (schwarz). Was passiert mit dem Text? (Du wirst sehen, dass der Text plötzlich schwer lesbar ist – warum? Weil die Textfarbe in App.css dunkelgrau ist. Das ist ein gutes Beispiel dafür, warum man Kontraste immer prüfen sollte.)