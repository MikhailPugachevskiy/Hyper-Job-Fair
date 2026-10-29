# 4. Matching-Demo: Interaktion mit `useState`

Bisher waren die Seiten hauptsächlich statisch (Home, About). In der **Matching-Demo** passiert endlich etwas Dynamisches: Der Nutzer kann Jobangebote nach links (nicht interessiert) oder rechts (interessiert) wischen. 

Dieses Kapitel ist das Wichtigste für dein React-Verständnis. Es zeigt dir, wie man mit **State** (Zustand) arbeitet, wie man auf **Events** (Ereignisse wie Klicks) reagiert und wie man **Listen** rendert.

---

## Die Grundidee: State (`useState`)

In React ist eine Komponente eine Funktion. Wenn diese Funktion aufgerufen wird, um etwas auf dem Bildschirm zu zeichnen, vergisst sie normalerweise alles, was in ihren Variablen stand.

Der Hook `useState` löst dieses Problem. Er ist das „Gedächtnis" der Komponente. Er speichert einen Wert zwischen den Zeichnungen. Wenn sich dieser Wert ändert, zeichnet React die Komponente automatisch neu. 

```jsx
const [wert, setWert] = useState(0)

wert: Der aktuelle Wert (wird zum Anzeigen genutzt).

setWert: Die Funktion, um den Wert zu ändern und ein Neuzeichnen auszulösen.


---

## Datei: `src/pages/MatchingDemo.jsx` 

```jsx
  1 | import { useState } from 'react'
  2 | import './MatchingDemo.css'
  3 |
  4 | const jobOffers = [
  5 |     { id: 1, company: 'FoodCorp Europe', title: 'Junior Brand Manager', match: 92, ... },
  6 |     { id: 2, company: 'TechStart GmbH', title: 'Frontend Developer (React)', match: 78, ... },
  7 |     // ... (insgesamt 5 Jobangebote)
  8 | ]
  9 |
 10 | function MatchingDemo() {
 11 |     const [currentIndex, setCurrentIndex] = useState(0)
 12 |     const [matches, setMatches] = useState([])
 13 |     const [noMatches, setNoMatches] = useState([])
 14 |     const [finished, setFinished] = useState(false)
 15 |
 16 |     const current = jobOffers[currentIndex]
 17 |
 18 |     const handleSwipe = (direction) => {
 19 |         if (!current) return
 20 |
 21 |         if (direction === 'right') {
 22 |             setMatches([...matches, current])
 23 |         } else {
 24 |             setNoMatches([...noMatches, current])
 25 |         }
 26 |
 27 |         if (currentIndex + 1 < jobOffers.length) {
 28 |             setCurrentIndex(currentIndex + 1)
 29 |         } else {
 30 |             setFinished(true)
 31 |         }
 32 |     }
 33 |
 34 |     const resetDemo = () => {
 35 |         setCurrentIndex(0)
 36 |         setMatches([])
 37 |         setNoMatches([])
 38 |         setFinished(false)
 39 |     }
 40 |
 41 |     if (finished) {
 42 |         return ( /* ... Ergebnisansicht ... */ )
 43 |     }
 44 |
 45 |     return (
 46 |         <div className="matching-demo">
 47 |             {/* ... Karte, Buttons ... */}
 48 |         </div>
 49 |     )
 50 | }

Z. 1 Importiert den Hook useState aus React.

Z. 4–8 Die Datenquelle. Hier stehen die 5 Jobangebote als Array von Objekten. Diese Daten sind fest im Code (hardcoded) und ändern sich nie.

Z. 11 Der erste State: currentIndex (welches Angebot ist gerade dran?). Er startet bei 0 (das erste Angebot).

Z. 12 Der zweite State: matches (eine Liste der gelikten Jobs). Er startet als leeres Array [].

Z. 13 Der dritte State: noMatches (eine Liste der abgelehnten Jobs). Er startet ebenfalls leer.

Z. 14 Der vierte State: finished (ist die Demo vorbei?). Er startet mit false.

Z. 16 Eine normale Variable (kein State!): current holt sich das aktuelle Jobangebot aus dem Array an der Position currentIndex. Wenn currentIndex z.B. 2 ist, holt es sich das dritte Angebot.

Z. 18 Die Funktion handleSwipe. Sie nimmt einen Parameter direction entgegen (entweder 'left' oder 'right'). Diese Funktion wird aufgerufen, wenn der Nutzer auf einen der Buttons klickt.

Z. 19 Sicherheitscheck: Wenn es kein aktuelles Angebot gibt (weil wir schon am Ende sind), brich die Funktion ab (return). Das verhindert Fehler.

Z. 21 Wenn die Richtung 'right' ist (also „Interessiert"):

Z. 22 Aktualisiere den matches-State. Wir erstellen ein neues Array mit dem Spread-Operator (...matches). Das kopiert alle bisherigen Matches und fügt das aktuelle Angebot (current) am Ende hinzu. Wichtig: Wir dürfen das alte Array nicht direkt verändern (z.B. matches.push()), weil React sonst nicht merkt, dass sich etwas geändert hat.

Z. 23–25 Das Gleiche für die linke Seite: Wenn die Richtung 'left' ist, füge das Angebot zu noMatches hinzu.

Z. 27 Prüfe, ob es noch weitere Angebote gibt (currentIndex + 1 < 5). Wenn ja:

Z. 28 Erhöhe den Index um 1 (setCurrentIndex(currentIndex + 1)). React zeichnet die Komponente neu und zeigt das nächste Jobangebot an.

Z. 29–31 Wenn es keine weiteren Angebote gibt (wir sind beim letzten angekommen):

Z. 30 Setze finished auf true. Dadurch wird beim nächsten Rendern die Ergebnisansicht angezeigt (siehe Z. 41).

Z. 34–39 Die Funktion resetDemo. Sie setzt alle States auf ihre Anfangswerte zurück (Index 0, leere Listen, finished auf false). Das wird aufgerufen, wenn der Nutzer auf „Demo neu starten" klickt.

Z. 41 Das bedingte Rendern: if (finished). Wenn die Demo vorbei ist, gibt die Komponente eine andere Oberfläche zurück (die Ergebnisansicht mit den Listen der gematchten und abgelehnten Jobs).

Z. 45 Wenn finished false ist, wird das normale Spielfeld zurückgegeben (die Karte mit dem Job, die Buttons, der Fortschritt).


Die Buttons im JSX (Ausschnitt)

```jsx
 48 |             <div className="card-stack">
 49 |                 <div className="job-card">
 50 |                     <div className="job-header">
 51 |                         <span className="company">{current.company}</span>
 52 |                         <span className="match-badge">{current.match}% Match</span>
 53 |                     </div>
 54 |                     <h3>{current.title}</h3>
 55 |                     <p>{current.description}</p>
 56 |                 </div>
 57 |             </div>
 58 |
 59 |             <div className="swipe-buttons">
 60 |                 <button className="swipe-left" onClick={() => handleSwipe('left')}>👈 Nicht interessiert</button>
 61 |                 <button className="swipe-right" onClick={() => handleSwipe('right')}>👉 Interessiert</button>
 62 |             </div>


 Z. 51–52 Geschweifte Klammern {current.company} fügen dynamische Daten in das JSX ein. React ersetzt sie durch den tatsächlichen Wert (z.B. „FoodCorp Europe").

Z. 54–55 Genauso für Titel und Beschreibung.

Z. 60–61 Das onClick-Attribut ist der Event-Handler. Wenn der Nutzer klickt, wird die Pfeilfunktion () => handleSwipe('left') ausgeführt. Das ist eine anonyme Funktion, die handleSwipe mit dem Parameter 'left' aufruft. (Man könnte auch onClick={handleSwipe} schreiben, aber dann wüsste die Funktion nicht, welche Richtung gemeint ist.)


Typische Fragen

    Was ist ein „State" und warum brauchen wir ihn? Ein State ist das Gedächtnis einer Komponente. Ohne ihn würde React bei jedem Neuzeichnen vergessen, welches Angebot gerade dran ist oder welche Jobs schon geliked wurden. Mit useState bleiben diese Werte erhalten.

    Warum dürfen wir matches.push() nicht verwenden? Weil React Änderungen an Objekten und Arrays nur erkennt, wenn die Referenz auf das Objekt geändert wird. push() verändert das Array an Ort und Stelle, aber die Referenz bleibt gleich. React würde denken: „Alles beim Alten" und die Oberfläche nicht aktualisieren. Deshalb erstellen wir mit [...matches, current] ein neues Array.

    Was ist der Spread-Operator ...? Er kopiert alle Elemente aus einem Array oder alle Eigenschaften aus einem Objekt in ein neues Array bzw. Objekt. [...matches] erstellt eine flache Kopie des matches-Arrays.

    Was passiert, wenn wir if (!current) return weglassen? Wenn die Demo vorbei ist, ist current undefined (weil currentIndex außerhalb des Arrays liegt). Ein Zugriff auf current.company würde dann einen Fehler werfen („Cannot read properties of undefined"). Der Check verhindert das.

    Warum rufen wir setMatches, setNoMatches, setCurrentIndex und setFinished alle in einer Funktion auf? React fasst alle State-Updates, die innerhalb desselben Event-Handlers passieren, zu einem einzigen Neuzeichnen zusammen. Das ist eine Optimierung. Es wäre ineffizient, wenn React nach jedem set... die Seite neu zeichnen würde.


Mach es selbst

    Füge ein sechstes Jobangebot zu jobOffers hinzu (z.B. mit id: 6). Was passiert mit dem Zähler „1 von 5"? (Er sollte automatisch „1 von 6" anzeigen, weil wir jobOffers.length verwenden.)

    Ändere if (currentIndex + 1 < jobOffers.length) in if (currentIndex + 1 <= jobOffers.length). Was passiert beim letzten Angebot? (Du bekommst einen Fehler, weil current dann undefined ist – genau deshalb ist der Sicherheitscheck in Z. 19 wichtig!)

    Füge in der resetDemo-Funktion ein setFinished(false) hinzu, falls es noch nicht da ist (es ist da). Warum ist das wichtig? (Ohne diesen Aufruf würde die Demo nach dem Zurücksetzen sofort wieder die Ergebnisansicht anzeigen, weil finished noch true wäre.)