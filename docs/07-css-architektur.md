# 7. CSS-Architektur: Styling in einer React-App

In diesem Projekt gibt es keine einzige große CSS-Datei, sondern mehrere kleinere. Das ist in React üblich: Jede Komponente (oder Seite) importiert ihre eigene CSS-Datei. 

Dieses Kapitel erklärt, wie diese Dateien zusammenarbeiten, wie das globale Design (Farben, Schriften) definiert ist und wie die wichtigsten Layout-Techniken (Flexbox und Grid) in diesem Projekt funktionieren.

---

## 1. Die Struktur der CSS-Dateien

Es gibt zwei Arten von CSS-Dateien in diesem Projekt:

1. **Globale Styles (`src/App.css`):** 
   Sie wird einmal in `main.jsx` importiert (`import './App.css'`) und gilt für die gesamte App. Hier stehen das Reset (Standardabstände entfernen), die Grundschrift, die Farben für Überschriften, der generische Button-Stil und die globale Klasse `.card`.

2. **Komponenten-Styles (z. B. `Header.css`, `Home.css`):**
   Sie werden direkt in der jeweiligen Komponente importiert (z. B. `import './Header.css'` in `Header.jsx`). Sie sind **gedanklich** einer Komponente zugeordnet, technisch gelten sie aber trotzdem für die ganze App.

**Wichtig:** React macht hier kein echtes „Scoping". Alle importierten CSS-Dateien landen im selben globalen Stylesheet. Wenn du in `Home.css` die Klasse `.card` stylst und in `About.css` auch `.card`, dann überschreiben sich diese Styles gegenseitig (je nachdem, welche Datei später geladen wird). Deshalb verwendet dieses Projekt spezifische Selektoren, um Konflikte zu vermeiden:

- In `Home.css` heißt es `.features .card` (nur Karten innerhalb des Features-Bereichs).
- In `About.css` heißt es `.is-card` (ein eigener Name für die Karten in der 5I-Ansicht).
- In `Contact.css` heißt es `.contact-info .card` (nur Karten innerhalb der Kontaktinfos).

---

## 2. Das globale Design: Farben und Schriften

Die wichtigsten Design-Entscheidungen sind in `App.css` und `Header.css` festgehalten:

- **Hintergrund:** `#f5f5f5` (ein sehr helles Grau) für die gesamte Seite.
- **Hauptfarbe (Türkis-Grün):** `#00b4a0` für Buttons, `h3`-Überschriften, aktive Tabs und Milestones.
- **Dunklere Hauptfarbe:** `#008c7a` für `h1`- und `h2`-Überschriften, das Logo und Hover-Effekte.
- **Schriftart:** `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (eine Systemschrift, die auf allen Geräten gut aussieht).

```css
/* Auszug aus App.css */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

h1, h2, h3 {
    font-weight: 300; /* Dünne Schrift für einen modernen Look */
    letter-spacing: 0.5px;
}

h1 {
    font-size: 2.8rem;
    color: #008c7a;
}
```

Die Zeile `font-weight: 300` sorgt für dünne Schrift und damit für einen modernen Look.

> **Hinweis:** Die Farbwerte sind in den einzelnen CSS-Dateien jeweils direkt eingetragen (z. B. `#00b4a0` in `App.css`, `Header.css`, `CustomerJourney.css`, `MatchingDemo.css` und `Contact.css`). Es gibt keine zentrale Definition. Wer die Hauptfarbe ändern will, muss sie überall ersetzen (siehe Aufgabe 1 und die Verbesserungsidee am Ende).

---

## 3. Layout-Techniken: Flexbox vs. Grid

In den CSS-Dateien werden zwei Haupttechniken verwendet, um Elemente anzuordnen:

### Flexbox (eindimensional)

Flexbox eignet sich hervorragend, um Elemente in einer Reihe oder in einer Spalte anzuordnen. Im Projekt wird es zum Beispiel für den Header verwendet:

```css
/* Header.css */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;
}
```

- `display: flex`: Aktiviert Flexbox. Logo und Navigation stehen nebeneinander.
- `justify-content: space-between`: Drückt das Logo an den linken Rand und die Navigation an den rechten Rand. Der freie Platz dazwischen wird automatisch verteilt.
- `align-items: center`: Richtet Logo und Navigation auf der vertikalen Achse mittig aus.
- `position: sticky` mit `top: 0`: Der Header bleibt beim Scrollen oben kleben. `z-index: 100` sorgt dafür, dass er über dem restlichen Inhalt liegt.

### CSS Grid (zweidimensional)

Grid eignet sich für komplexe Layouts, die sowohl Zeilen als auch Spalten haben. Im Projekt wird es für die Feature-Karten und die 5I-Karten verwendet:

```css
/* Auszug aus Home.css */
.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}
```

Das ist ein sehr mächtiger Einzeiler (`grid-template-columns`). Er bedeutet:

- `display: grid`: Aktiviere das Grid-Layout.
- `repeat(auto-fit, ...)`: Erzeuge so viele Spalten, wie in die aktuelle Breite passen.
- `minmax(220px, 1fr)`: Jede Spalte ist mindestens 220px breit. Wenn mehr Platz da ist, teilen sich die Spalten den restlichen Platz gleichmäßig auf (`1fr` = ein Bruchteil).
- `gap`: 1.5rem: Der Abstand zwischen den Karten.

**Was passiert also auf einem schmalen Bildschirm?** Wenn nicht mehr genug Platz für zwei Karten à 220 px ist, bricht das Grid automatisch auf eine Spalte um. Das ist ein responsives Layout ohne Media Query. Dasselbe Muster nutzt `About.css` für die 5I-Karten (`minmax(180px, 1fr)`).

---

## 4. Media Queries (für den Feinschliff)

Media Queries werden nur an wenigen Stellen verwendet, um das Layout für kleine Bildschirme (Smartphones) anzupassen: in `App.css` (768 px), `Header.css` (700 px), `Contact.css` (700 px) und `MatchingDemo.css` (500 px). Das Beispiel aus `Header.css

```css
@media (max-width: 700px) {
    header {
        flex-direction: column; 
        padding: 0.8rem;
    }

    nav {
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap; 
        justify-content: center;
    }

    nav a {
        margin: 0 0.8rem 0.4rem 0;
    }
}
```

- `max-width: 700px`: Diese Regel gilt nur, wenn der Bildschirm schmaler als 700px ist.
- `flex-direction: column`: Ändert die Richtung von „nebeneinander" zu „untereinander". Logo und Navigation stehen dann übereinander, das ist auf schmalen Bildschirmen besser lesbar.
- `flex-wrap: wrap` bei `nav`: Die Links brechen in die nächste Zeile um, wenn der Platz nicht reicht.
- `nav a`: Auf kleinen Bildschirmen bekommen die Links einen anderen Abstand (rechts und unten statt links wie auf dem Desktop).

--- 

## 5. Details, die dem Projekt seinen Charakter geben

### Die „Pill"-Form

Viele Elemente (Buttons, Tags, aktive Tabs) haben eine stark abgerundete Form. Das wird durch einen großen `border-radius` erreicht. Im Projekt hat der generische Button in `App.css` diese Regel:

```css
button {
    cursor: pointer;
    border: none;
    background: #00b4a0;
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 30px;
    font-size: 1rem;
    transition: background 0.2s;
}
```

Ein Wert, der mindestens halb so groß ist wie die Höhe des Elements, ergibt eine perfekte Pillenform. Mit einem sehr großen Wert (z. B. `999px`) klappt das unabhängig von der Höhe.

### Der Hover-Effekt bei Karten

Die Karten in `Home.css` heben sich leicht an, wenn man mit der Maus darüber fährt. `About.css` macht das für `.is-card` genauso, dort kommt zusätzlich ein Schatten in Türkis dazu.

```css
/* Auszug aus Home.css */
.features .card {
    text-align: center;
    transition: transform 0.2s;
}

.features .card:hover {
    transform: translateY(-4px);
}
```

- `translateY(-4px)`: Verschiebt die Karte um 4 Pixel nach oben. Das erzeugt den Eindruck, als würde sie schweben.
- `transition`: Sorgt dafür, dass diese Bewegung nicht ruckartig, sondern fließend (über 0.2 Sekunden) passiert. Weil die Eigenschaft in der Basisregel (`.features .card`) steht und nicht in `:hover`, ist sowohl das Anheben als auch das Zurückgleiten animiert.

### Schatten für Tiefe

Die Karten und der Header haben leichte Schatten, um sich vom Hintergrund abzuheben:

```css
/* Auszug aus App.css */
.card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
}
```

- `0 4px 12px`: Der Schatten ist 0 px nach rechts und 4 px nach unten verschoben und mit 12 px Unschärfe (Blur) weichgezeichnet.
- `rgba(0, 0, 0, 0.05)`: eine sehr transparente schwarze Farbe (nur 5 % Deckkraft). Das erzeugt einen dezenten, natürlichen Schatten.

### Der aktive Navigationslink

React Router setzt auf dem aktiven `NavLink` die Klasse `active` (siehe Kapitel 1). In `Header.css` wird sie so gestaltet:

```css
nav a.active {
    color: #008c7a;
    border-bottom-color: #00b4a0;
}
```

Alle Links haben schon einen unsichtbaren Unterstrich (`border-bottom: 2px solid transparent`). Beim aktiven Link wird nur die Farbe dieser Linie sichtbar gemacht und der Text dunkler gefärbt. So springt das Layout nicht.

---

## Typische Fragen

**Warum nicht einfach ein großes CSS-Framework wie Tailwind oder Bootstrap verwenden?**
Frameworks sind schnell, aber sie bringen einen eigenen Look und viel „unnötigen“ Code mit. Für dieses Projekt wollten wir ein eigenes, maßgeschneidertes Design (das türkis-grüne Farbschema der Koelnmesse) und den Code so klein und verständlich wie möglich halten.

**Könnte man das CSS auch in die JSX-Dateien schreiben (CSS-in-JS)?**
Ja, Bibliotheken wie `styled-components` machen das. Aber wir wollten den klassischen Weg gehen (externe CSS-Dateien), weil er für Einsteiger leichter zu verstehen ist und dem Standard in vielen Unternehmen entspricht.

**Was ist der Vorteil von `rem` gegenüber `px`?**
`rem` bezieht sich auf die Schriftgröße des Wurzelelements (normalerweise 16 px). Wenn der Nutzer die Schriftgröße in seinem Browser vergrößert (Barrierefreiheit), skalieren `rem`-Werte automatisch mit, `px`-Werte nicht.

**Warum steht in `App.css` ein `*`-Selektor ganz am Anfang?**
Das ist ein „Reset“. Es setzt die Standardabstände (`margin`, `padding`) aller Elemente auf 0 und sorgt dafür, dass Breiten und Höhen so berechnet werden, wie man es erwartet (`box-sizing: border-box`). Das ist ein Standard, der in fast jedem modernen Webprojekt verwendet wird.

**Was würdest du am CSS verbessern?**
Die Farben zentral als CSS-Variablen definieren (siehe unten), damit man das Farbschema an einer einzigen Stelle ändern kann.

---

## Verbesserungsidee: Farben als CSS-Variablen

Mit sogenannten Custom Properties könnte man die Farben einmal definieren und überall verwenden:

```css
/* Beispiel (so noch nicht im Projekt) */
:root {
    --color-primary: #00b4a0;
    --color-primary-dark: #008c7a;
}

button {
    background: var(--color-primary);
}

button:hover {
    background: var(--color-primary-dark);
}
```

Dann würde eine Änderung in `:root` das gesamte Design ändern.

## Mach es selbst

1. Ändere in `App.css` die Hauptfarbe `#00b4a0` auf ein kräftiges Lila (z. B. `#8b5cf6`). Was passiert mit den Buttons und den `h3`-Überschriften? Und was mit den aktiven Tabs auf der Seite „Customer Journey“? (Die Buttons und `h3`-Überschriften ändern sich, die aktiven Tabs und Milestones bleiben türkis, weil die Farbe in `CustomerJourney.css` separat eingetragen ist. Das zeigt, warum zentrale Variablen sinnvoll wären.)
2. Ändere in `Home.css` den Wert `minmax(220px, 1fr)` auf `minmax(150px, 1fr)`. Was passiert auf einem mittelgroßen Bildschirm? (Es passen mehr Karten in eine Reihe.)
3. Entferne in `Header.css` den `@media (max-width: 700px)`-Block. Verkleinere dein Browserfenster auf Handy-Größe. Was passiert? (Die Navigation wird abgeschnitten oder passt nicht mehr. Genau deshalb brauchen wir die Media Query.)
4. Verschiebe `transition: transform 0.2s;` aus `.features .card` in die Regel `.features .card:hover`. Was ändert sich beim Wegbewegen der Maus? (Die Karte springt jetzt zurück, statt sanft zurückzugleiten.)
5. Führe die Verbesserungsidee aus: Lege `--color-primary` in `:root` an und ersetze die Farbe im Button-Stil von `App.css` durch `var(--color-primary)`. Funktioniert der Button wie vorher?