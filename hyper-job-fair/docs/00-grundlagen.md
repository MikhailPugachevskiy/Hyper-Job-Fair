# 0. Grundlagen: React, Vite und der Aufbau der App

Diese Datei erklärt zuerst die Bausteine, die im gesamten Projekt vorkommen. Danach wird die Einstiegsdatei `main.jsx` Zeile für Zeile erklärt. Die weiteren Dateien folgen in den nächsten Kapiteln.

---

## 1. Was ist React?

React ist eine JavaScript-Bibliothek, mit der man Oberflächen aus **Komponenten** baut. Eine Komponente ist eine ganz normale Funktion, die beschreibt, wie ein Teil der Seite aussieht. Beispiele aus der App: `Home` (die Startseite), `MatchingDemo` (das Tinder-Swipe-Spiel) oder `Footer` (die Fußzeile).

Drei Ideen genügen, um den ganzen Code zu verstehen:

1. **Eine Komponente gibt JSX zurück.** JSX sieht aus wie HTML, steht aber mitten im JavaScript. Es beschreibt, was auf der Seite stehen soll.
2. **Daten fließen nach unten (Props), Ereignisse nach oben (Funktionen).** Eine Elternkomponente gibt Daten an ihre Kinder weiter. Wenn der Nutzer klickt, ruft das Kind eine Funktion auf, die ihm das Elternteil mitgegeben hat.
3. **Wenn sich der Zustand ändert, zeichnet React neu.** Zustand (State) ist das Gedächtnis einer Komponente. Ändert er sich, ruft React die Komponentenfunktion erneut auf und aktualisiert nur die Teile der Seite, die sich wirklich geändert haben.

## 2. JSX ist nicht HTML

| In HTML | In JSX | Warum |
| --- | --- | --- |
| `class="..."` | `className="..."` | `class` ist in JavaScript ein reserviertes Wort |
| `onclick` | `onClick` | Attribute werden in camelCase geschrieben |
| `style="color: red"` | `style={{ color: "red" }}` | `style` ist ein Objekt, kein Text |
| `<br>`, `<img>` ohne Ende | `<br />`, `<img />` | jedes Element muss geschlossen werden |
| ein Text mit Wert | `{wert}` | in geschweiften Klammern steht ein JavaScript-Ausdruck |

Ein Ausdruck in `{ }` kann eine Variable, ein Funktionsaufruf, ein Ternary (`a ? b : c`) oder `&&` sein. Eine Anweisung wie `if` oder `for` geht dort nicht.

Eine Komponente darf nur **ein** Wurzelelement zurückgeben. Wenn man mehrere Geschwister braucht, ohne ein zusätzliches `<div>` einzufügen, verwendet man ein **Fragment**: `<> ... </>`.

## 3. Die React-Werkzeuge, die hier vorkommen

| Werkzeug | Wofür | Wo in der App |
| --- | --- | --- |
| **Props** | Daten und Funktionen von oben nach unten | `Header`, `Footer` (keine Props), Seiten |
| **`useState`** | merkt sich einen Wert zwischen den Zeichnungen | `MatchingDemo.jsx`, `CustomerJourney.jsx`, `Contact.jsx` |
| **`useEffect`** | führt etwas „außerhalb des Zeichnens" aus | `ScrollToTop.jsx` (scrollt nach oben) |
| **`key`** | gibt Listenelementen eine feste Identität | `MatchingDemo.jsx` (bei `.map`) |
| **kontrollierte Eingabe** | der Wert eines Feldes kommt aus dem State | `Contact.jsx` |
| **bedingtes Zeichnen** | `a && <X />` oder `a ? <X /> : <Y />` | `MatchingDemo.jsx`, `CustomerJourney.jsx`, `Contact.jsx` |

## 4. Der Aufbau des Projekts

Dieses Projekt ist eine **Single Page Application (SPA)**. Das bedeutet: Es gibt nur eine einzige HTML-Datei (`index.html`). Wenn der Nutzer auf „About" klickt, wird die Seite **nicht** neu geladen. Stattdessen tauscht React im Hintergrund nur die Komponente aus, die im `<main>`-Bereich angezeigt wird.


**Das wichtigste Prinzip:** Der Zustand (z.B. „welcher Tab ist offen?" oder „welche Jobs habe ich geliked?") liegt immer in der Komponente, die ihn braucht. Er wird nicht global gespeichert, sondern lokal in der jeweiligen Page. Wenn der Nutzer die Seite wechselt, wird der State zurückgesetzt – das ist bei einer Demo völlig ausreichend.

---

## Datei: `index.html` (Einstieg)

```html
  1 | <!doctype html>
  2 | <html lang="de">
  3 |   <head>
  4 |     <meta charset="UTF-8" />
  5 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  6 |     <meta name="description" content="Hyper Job Fair – Die hyper-personalisierte digitale Jobmesse mit Matching, Chat und individuellem Feedback." />
  7 |     <title>Hyper Job Fair – Die personalisierte Jobmesse</title>
  8 |   </head>
  9 |   <body>
 10 |     <div id="root"></div>
 11 |     <script type="module" src="/src/main.jsx"></script>
 12 |   </body>
 13 | </html>

Z. 1 Sagt dem Browser, dass es sich um eine HTML5-Datei handelt.

Z. 2 Das lang="de"-Attribut teilt Screenreadern und Suchmaschinen mit, dass die Seite auf Deutsch ist (wichtig für Barrierefreiheit und SEO).

Z. 3–8 Der <head>-Bereich enthält Metadaten, die nicht direkt auf der Seite sichtbar sind.

Z. 4 Stellt sicher, dass Umlaute (ä, ö, ü) und Sonderzeichen (€) korrekt dargestellt werden (UTF-8).

Z. 5 Sorgt dafür, dass die Seite auf mobilen Geräten (Smartphones, Tablets) richtig skaliert wird, anstatt verkleinert dargestellt zu werden.

Z. 6 Eine kurze Beschreibung der Seite. Suchmaschinen wie Google nutzen diesen Text in den Suchergebnissen.

Z. 7 Der Text, der im Browser-Tab angezeigt wird.

Z. 10 Das ist der wichtigste Teil! Hier ist ein leerer <div> mit der ID root. React sucht dieses Element und fügt die gesamte App dort ein. Wenn dieser <div> fehlt, bleibt die Seite leer.

Z. 11 Lädt die Datei main.jsx. Das type="module" sagt dem Browser, dass er die Datei als JavaScript-Modul behandeln soll (wichtig für import/export). Der Pfad beginnt mit /, was bedeutet: relativ zum Projekt-Root.

## Datei: `src/main.jsx` (React-Start)

```jsx
  1 | import React from 'react'
  2 | import ReactDOM from 'react-dom/client'
  3 | import { BrowserRouter } from 'react-router-dom'
  4 | import App from './App.jsx'
  5 | import './App.css'
  6 |
  7 | ReactDOM.createRoot(document.getElementById('root')).render(
  8 |   <React.StrictMode>
  9 |     <BrowserRouter>
 10 |       <App />
 11 |     </BrowserRouter>
 12 |   </React.StrictMode>,
 13 | )

     Z. 1 Importiert das React-Paket. Seit React 17 ist dieser Import streng genommen nicht mehr nötig (der JSX-Compiler fügt ihn automatisch ein), aber er schadet nicht und ist in vielen Projekten noch üblich.

    Z. 2 Importiert ReactDOM aus dem Paket react-dom/client. Das ist die moderne API (seit React 18), um eine React-App im Browser zu starten.

    Z. 3 Importiert BrowserRouter aus dem Paket react-router-dom. Der Router sorgt dafür, dass die URL im Browser (z.B. /about) mit der richtigen Komponente verknüpft wird, ohne dass die Seite neu geladen wird.

    Z. 4 Importiert die Hauptkomponente App aus der Datei App.jsx im selben Ordner. Die Endung .jsx schreibt man beim Import normalerweise dazu, hier ist sie explizit angegeben.

    Z. 5 Importiert die globale CSS-Datei App.css. Durch diesen Import wird das Styling auf die gesamte App angewendet.

    Z. 7 Sucht das Element mit der ID root in der index.html und erstellt dort einen React-„Wurzelpunkt". .render(...) zeichnet dann alles, was in den Klammern steht, in dieses Element.

    Z. 8 <React.StrictMode> ist ein Werkzeug für die Entwicklung. Es zeigt zusätzliche Warnungen in der Browser-Konsole an (z.B. wenn man veraltete React-Funktionen verwendet). Auf die spätere Produktionsversion hat es keinen Einfluss.

    Z. 9–11 <BrowserRouter> umschließt die gesamte App. Das bedeutet: Jede Komponente innerhalb dieses Bereichs kann den Router nutzen (z.B. <Link> oder useLocation).

    Z. 10 <App /> ist die eigentliche Anwendung. Sie enthält die Navigation, die Seiten und den Footer.

    Z. 13 Das Komma am Ende ist syntaktisch korrekt (es gehört zur render-Funktion, die mehrere Argumente akzeptieren könnte). Es ist ein optionales „trailing comma", das oft von Formatierungswerkzeugen automatisch gesetzt wird.

Typische Fragen

    Warum gibt es nur eine index.html? Weil wir eine Single Page Application (SPA) bauen. React tauscht den Inhalt im <div id="root"> aus, je nachdem, welche URL gerade aufgerufen wird. Der Browser lädt die HTML-Datei nur einmal.

    Was ist der Unterschied zwischen main.jsx und App.jsx? main.jsx ist der Startpunkt: Es verbindet React mit dem Browser (dem <div id="root">). App.jsx ist die eigentliche Anwendung: Es definiert, welche Seiten es gibt und wie sie verlinkt sind.

    Warum importieren wir App.css in main.jsx und nicht in App.jsx? Das ist eine Design-Entscheidung. Beide Wege funktionieren. Der Import in main.jsx macht deutlich: „Diese CSS-Datei gilt für die gesamte App." (In React ist es üblich, CSS dort zu importieren, wo es gebraucht wird.)

    Was ist BrowserRouter und warum brauchen wir ihn? Ohne Router würde ein Klick auf „About" die Seite neu laden und einen 404-Fehler produzieren, weil es keine echte Datei about.html gibt. Der Router fängt den Klick ab und tauscht nur die React-Komponente aus. Die URL ändert sich trotzdem, sodass man die Seite teilen oder als Lesezeichen speichern kann.

Mach es selbst

    Ändere den Text im <title>-Tag in index.html auf „Meine Jobmesse". Was siehst du im Browser-Tab?

    Entferne testweise <BrowserRouter> aus main.jsx (und die Import-Zeile). Was passiert, wenn du auf „About" klickst? (Du wirst eine Fehlermeldung sehen – warum?)

    Ändere React.StrictMode in <> (ein leeres Fragment). Was ändert sich im Browser? (Nichts – aber du hast gelernt, dass StrictMode nur ein Entwicklungswerkzeug ist.)