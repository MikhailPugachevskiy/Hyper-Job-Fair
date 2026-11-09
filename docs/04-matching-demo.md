# 4. Matching-Demo: Interaktion mit `useState`

Bisher waren die Seiten hauptsächlich statisch (Home, About). In der **Matching-Demo** passiert endlich etwas Dynamisches: Der Nutzer kann Jobangebote nach links (nicht interessiert) oder rechts (interessiert) wischen.

Dieses Kapitel ist das Wichtigste für dein React-Verständnis. Es zeigt dir, wie man mit **State** (Zustand) arbeitet, wie man auf **Events** (Ereignisse wie Klicks) reagiert und wie man **Listen** rendert.

> **Hinweis:** Die Datei `MatchingDemo.jsx` hat 139 Zeilen und wird hier in Auszügen mit den **originalen Zeilennummern** gezeigt. Nur die vier weiteren Jobangebote (Z. 14–45) sind zusammengefasst.

---

## Die Grundidee: State (`useState`)

In React ist eine Komponente eine Funktion. Wenn diese Funktion aufgerufen wird, um etwas auf dem Bildschirm zu zeichnen, vergisst sie normalerweise alles, was in ihren Variablen stand.

Der Hook `useState` löst dieses Problem. Er ist das „Gedächtnis“ der Komponente. Er speichert einen Wert zwischen den Zeichnungen. Wenn sich dieser Wert ändert, zeichnet React die Komponente automatisch neu.

```jsx
const [wert, setWert] = useState(0)
```

- `wert`: der aktuelle Wert (wird zum Anzeigen genutzt).
- `setWert`: die Funktion, um den Wert zu ändern und ein Neuzeichnen auszulösen.

---

## Datei: `src/pages/MatchingDemo.jsx`

### Teil 1: Import und Daten (Z. 1–46)

```jsx
  1 | import { useState } from 'react'
  2 | import './MatchingDemo.css'
  3 |
  4 | // Fiktive Jobangebote (aus der PDF inspiriert)
  5 | const jobOffers = [
  6 |     {
  7 |         id: 1,
  8 |         company: 'FoodCorp Europe',
  9 |         title: 'Junior Brand Manager',
 10 |         description: 'Verantwortung für die Entwicklung einer bekannten Marke im FMCG-Bereich. Teamarbeit, Kreativität und strategisches Denken gefragt.',
 11 |         tags: ['Marketing', 'FMCG', '1-2 Jahre Erfahrung'],
 12 |         match: 92
 13 |     },
    ...   (Z. 14–45: vier weitere Angebote mit id 2 bis 5, gleicher Aufbau)
 46 | ]
```

- **Z. 1** Importiert den Hook `useState` aus React.
- **Z. 2** Importiert die Styles der Seite.
- **Z. 4** Ein Kommentar: Die Angebote sind erfundene Beispieldaten.
- **Z. 5–46** Die Datenquelle. Hier stehen die 5 Jobangebote als Array von Objekten. Diese Daten sind fest im Code (hardcoded) und ändern sich nie. Sie liegen **außerhalb** der Komponente, weil sie nicht zum State gehören.
- **Z. 7–12** Jedes Angebot hat dieselben sechs Felder: `id` (eindeutig), `company`, `title`, `description`, `tags` (ein Array aus Texten) und `match` (Prozentwert).

### Teil 2: State und Logik (Z. 48–77)

```jsx
 48 | function MatchingDemo() {
 49 |     const [currentIndex, setCurrentIndex] = useState(0)
 50 |     const [matches, setMatches] = useState([])
 51 |     const [noMatches, setNoMatches] = useState([])
 52 |     const [finished, setFinished] = useState(false)
 53 |
 54 |     const current = jobOffers[currentIndex]
 55 |
 56 |     const handleSwipe = (direction) => {
 57 |         if (!current) return
 58 |
 59 |         if (direction === 'right') {
 60 |             setMatches([...matches, current])
 61 |         } else {
 62 |             setNoMatches([...noMatches, current])
 63 |         }
 64 |
 65 |         if (currentIndex + 1 < jobOffers.length) {
 66 |             setCurrentIndex(currentIndex + 1)
 67 |         } else {
 68 |             setFinished(true)
 69 |         }
 70 |     }
 71 |
 72 |     const resetDemo = () => {
 73 |         setCurrentIndex(0)
 74 |         setMatches([])
 75 |         setNoMatches([])
 76 |         setFinished(false)
 77 |     }
```

- **Z. 48** Die Komponente `MatchingDemo`.
- **Z. 49** Der erste State: `currentIndex` (welches Angebot ist gerade dran?). Er startet bei `0` (das erste Angebot).
- **Z. 50** Der zweite State: `matches` (eine Liste der gelikten Jobs). Er startet als leeres Array `[]`.
- **Z. 51** Der dritte State: `noMatches` (eine Liste der abgelehnten Jobs). Er startet ebenfalls leer.
- **Z. 52** Der vierte State: `finished` (ist die Demo vorbei?). Er startet mit `false`.
- **Z. 54** Eine normale Variable (kein State!): `current` holt sich das aktuelle Jobangebot aus dem Array an der Position `currentIndex`. Wenn `currentIndex` z. B. `2` ist, holt es sich das dritte Angebot.
- **Z. 56** Die Funktion `handleSwipe`. Sie nimmt einen Parameter `direction` entgegen (entweder `'left'` oder `'right'`). Diese Funktion wird aufgerufen, wenn der Nutzer auf einen der Buttons klickt.
- **Z. 57** Sicherheitscheck: Wenn es kein aktuelles Angebot gibt, brich die Funktion ab (`return`). Im normalen Ablauf tritt das nicht auf: Beim letzten Angebot wird `currentIndex` nicht mehr erhöht, sondern `finished` auf `true` gesetzt (siehe Z. 67–69). Der Check schützt nur davor, dass ein ungültiger Index zu Fehlern führt.
- **Z. 59–60** Wenn die Richtung `'right'` ist (also „Interessiert“), wird der `matches`-State aktualisiert. Wir erstellen ein neues Array mit dem Spread-Operator (`...matches`). Das kopiert alle bisherigen Matches und fügt das aktuelle Angebot (`current`) am Ende hinzu. **Wichtig:** Wir dürfen das alte Array nicht direkt verändern (z. B. mit `matches.push()`), weil React sonst nicht merkt, dass sich etwas geändert hat.
- **Z. 61–63** Das Gleiche für die linke Seite: Wenn die Richtung `'left'` ist, füge das Angebot zu `noMatches` hinzu.
- **Z. 65** Prüfe, ob es noch weitere Angebote gibt (`currentIndex + 1 < jobOffers.length`). Wenn ja:
- **Z. 66** Erhöhe den Index um 1 (`setCurrentIndex(currentIndex + 1)`). React zeichnet die Komponente neu und zeigt das nächste Jobangebot an.
- **Z. 67–69** Wenn es keine weiteren Angebote gibt (wir sind beim letzten angekommen), setze `finished` auf `true`. Dadurch wird beim nächsten Rendern die Ergebnisansicht angezeigt (siehe Z. 79).
- **Z. 72–77** Die Funktion `resetDemo`. Sie setzt alle States auf ihre Anfangswerte zurück (Index 0, leere Listen, `finished` auf `false`). Das wird aufgerufen, wenn der Nutzer auf „Demo neu starten“ klickt.

### Teil 3: Die Ergebnisansicht (Z. 79–106)

```jsx
 79 |     if (finished) {
 80 |         return (
 81 |             <div className="matching-demo">
 82 |                 <h1>Matching-Demo</h1>
 83 |                 <div className="result-card">
 84 |                     <h2>✅ Demo abgeschlossen!</h2>
 85 |                     <p>Du hast <strong>{matches.length}</strong> von {jobOffers.length} Angeboten nach rechts geswiped.</p>
 86 |                     <div className="result-lists">
 87 |                         <div>
 88 |                             <h3>Deine Matches</h3>
 89 |                             <ul>
 90 |                                 {matches.map(job => <li key={job.id}>{job.company} – {job.title} (Match {job.match}%)</li>)}
 91 |                                 {matches.length === 0 && <li>Keine Matches – vielleicht beim nächsten Mal?</li>}
 92 |                             </ul>
 93 |                         </div>
 94 |                         <div>
 95 |                             <h3>Übergangen</h3>
 96 |                             <ul>
 97 |                                 {noMatches.map(job => <li key={job.id}>{job.company} – {job.title}</li>)}
 98 |                                 {noMatches.length === 0 && <li>Du hast alle interessant gefunden!</li>}
 99 |                             </ul>
100 |                         </div>
101 |                     </div>
102 |                     <button onClick={resetDemo}>Demo neu starten</button>
103 |                 </div>
104 |             </div>
105 |         )
106 |     }
```

- **Z. 79** Das bedingte Rendern: `if (finished)`. Wenn die Demo vorbei ist, gibt die Komponente eine andere Oberfläche zurück (die Ergebnisansicht) und die Funktion endet hier. Der Code darunter wird dann nicht mehr ausgeführt.
- **Z. 85** `{matches.length}` und `{jobOffers.length}` fügen die Anzahlen dynamisch in den Satz ein.
- **Z. 90 und 97** Hier werden **Listen gerendert**: `matches.map(...)` wandelt jeden Job im Array in ein `<li>`-Element um. Das Attribut `key={job.id}` gibt jedem Eintrag eine feste Identität. So erkennt React, welcher Eintrag welcher ist, und muss nicht die ganze Liste neu aufbauen. Der Wert muss innerhalb der Liste eindeutig sein, deshalb nehmen wir die `id`.
- **Z. 91 und 98** Bedingtes Rendern mit `&&` (mehr dazu in Kapitel 5): Nur wenn die Liste leer ist (`length === 0`), erscheint ein Hinweistext.
- **Z. 102** Der Button ruft `resetDemo` auf (Z. 72–77). Hier steht `onClick={resetDemo}` ohne Klammern, weil die Funktion keine Parameter braucht und nicht sofort aufgerufen werden soll.

### Teil 4: Das normale Spielfeld (Z. 108–139)

```jsx
108 |     return (
109 |         <div className="matching-demo">
110 |             <h1>Matching-Demo</h1>
111 |             <p className="demo-hint">👆 Swipe nach rechts, wenn dich der Job interessiert – nach links, wenn nicht.</p>
112 |
113 |             <div className="card-stack">
114 |                 <div className="job-card">
115 |                     <div className="job-header">
116 |                         <span className="company">{current.company}</span>
117 |                         <span className="match-badge">{current.match}% Match</span>
118 |                     </div>
119 |                     <h3>{current.title}</h3>
120 |                     <p>{current.description}</p>
121 |                     <div className="tags">
122 |                         {current.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
123 |                     </div>
124 |                 </div>
125 |             </div>
126 |
127 |             <div className="swipe-buttons">
128 |                 <button className="swipe-left" onClick={() => handleSwipe('left')}>👈 Nicht interessiert</button>
129 |                 <button className="swipe-right" onClick={() => handleSwipe('right')}>👉 Interessiert</button>
130 |             </div>
131 |
132 |             <div className="progress">
133 |                 {currentIndex + 1} von {jobOffers.length} Angeboten
134 |             </div>
135 |         </div>
136 |     )
137 | }
138 |
139 | export default MatchingDemo
```

- **Z. 108** Wenn `finished` den Wert `false` hat, läuft die Funktion bis hierher und gibt das normale Spielfeld zurück.
- **Z. 116–117** Geschweifte Klammern wie `{current.company}` fügen dynamische Daten in das JSX ein. React ersetzt sie durch den tatsächlichen Wert (z. B. „FoodCorp Europe“).
- **Z. 119–120** Genauso für Titel und Beschreibung.
- **Z. 122** Auch die Tags sind eine Liste (`current.tags.map(...)`). Weil ein Tag nur ein Text ohne eigene `id` ist, wird hier der Index `idx` als `key` verwendet. Das ist bei einer festen Liste, die weder umsortiert noch bearbeitet wird, in Ordnung. Bei dynamischen Listen sollte man eine stabile `id` verwenden.
- **Z. 128–129** Das `onClick`-Attribut ist der Event-Handler. Wenn der Nutzer klickt, wird die Pfeilfunktion `() => handleSwipe('left')` ausgeführt. Das ist eine anonyme Funktion, die `handleSwipe` mit dem Parameter `'left'` aufruft. (Man könnte auch `onClick={handleSwipe}` schreiben, aber dann wüsste die Funktion nicht, welche Richtung gemeint ist.)
- **Z. 132–134** Der Fortschrittszähler. Weil er `jobOffers.length` verwendet, passt er sich automatisch an, wenn man Angebote hinzufügt.
- **Z. 139** Exportiert die Komponente, damit `App.jsx` sie importieren kann.

---

## Typische Fragen

**Was ist ein „State“ und warum brauchen wir ihn?**
Ein State ist das Gedächtnis einer Komponente. Ohne ihn würde React bei jedem Neuzeichnen vergessen, welches Angebot gerade dran ist oder welche Jobs schon geliked wurden. Mit `useState` bleiben diese Werte erhalten.

**Warum dürfen wir `matches.push()` nicht verwenden?**
Weil React Änderungen an Objekten und Arrays nur erkennt, wenn die Referenz auf das Objekt geändert wird. `push()` verändert das Array an Ort und Stelle, aber die Referenz bleibt gleich. React würde denken: „Alles beim Alten“ und die Oberfläche nicht aktualisieren. Deshalb erstellen wir mit `[...matches, current]` ein neues Array.

**Was ist der Spread-Operator `...`?**
Er kopiert alle Elemente aus einem Array oder alle Eigenschaften aus einem Objekt in ein neues Array bzw. Objekt. `[...matches]` erstellt eine flache Kopie des `matches`-Arrays.

**Wozu dient `if (!current) return` in Z. 57?**
Es ist eine Absicherung: Gäbe es kein aktuelles Angebot (z. B. weil der Index durch einen Fehler außerhalb des Arrays liegt), würde `handleSwipe` sonst mit `undefined` weiterarbeiten und beim Speichern oder Auslesen Fehler verursachen. Im normalen Ablauf ist `current` immer gültig, weil der Index beim letzten Angebot nicht mehr erhöht wird.

**Warum rufen wir `setMatches`, `setNoMatches`, `setCurrentIndex` und `setFinished` alle in einer Funktion auf?**
React fasst alle State-Updates, die innerhalb desselben Event-Handlers passieren, zu einem einzigen Neuzeichnen zusammen (sogenanntes „Batching“). Das ist eine Optimierung. Es wäre ineffizient, wenn React nach jedem `set...` die Seite neu zeichnen würde.

**Wozu braucht man `key` und warum nimmt man bei den Jobs die `id`, bei den Tags aber den Index?**
`key` hilft React, Listeneinträge eindeutig zu erkennen. Bei den Jobs gibt es mit `id` einen stabilen, eindeutigen Wert. Die Tags sind einfache Texte ohne `id`, deshalb dient der Index als Notlösung. Das ist nur bei statischen Listen unproblematisch.

---

## Mach es selbst

1. Füge ein sechstes Jobangebot zu `jobOffers` hinzu (kopiere ein bestehendes Objekt und gib ihm `id: 6`). Was passiert mit dem Zähler „1 von 5 Angeboten“? (Er zeigt automatisch „1 von 6 Angeboten“, weil wir `jobOffers.length` verwenden.) Achte darauf, dass das neue Objekt auch ein `tags`-Array enthält, sonst gibt `current.tags.map` in Z. 122 einen Fehler.
2. Ändere in Z. 65 `if (currentIndex + 1 < jobOffers.length)` in `if (currentIndex + 1 <= jobOffers.length)`. Was passiert beim letzten Angebot? (Der Index springt auf 5, `current` ist `undefined`, und beim Zeichnen von `current.company` gibt es einen Fehler. Der Check in Z. 57 hilft hier nicht, weil der Fehler beim Rendern auftritt und nicht in `handleSwipe`.)
3. Entferne in `resetDemo` die Zeile `setFinished(false)` (Z. 76). Spiele die Demo bis zum Ende durch und klicke auf „Demo neu starten“. Was passiert? (Die Ergebnisansicht bleibt stehen, weil `finished` weiterhin `true` ist. Genau deshalb muss `resetDemo` auch `finished` zurücksetzen.)
4. Ändere in Z. 98 den Hinweistext oder entferne die ganze Zeile. Was siehst du, wenn du alle Angebote mit „Interessiert“ bestätigst? (Die Liste „Übergangen“ ist dann leer, ohne den Hinweistext bleibt dort einfach eine leere Liste.)
