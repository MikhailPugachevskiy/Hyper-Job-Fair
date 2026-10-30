# 7. CSS-Architektur: Styling in einer React-App

In diesem Projekt gibt es keine einzige große CSS-Datei, sondern mehrere kleinere. Das ist in React üblich: Jede Komponente (oder Seite) importiert ihre eigene CSS-Datei. 

Dieses Kapitel erklärt, wie diese Dateien zusammenarbeiten, wie das globale Design (Farben, Schriften) definiert ist und wie die wichtigsten Layout-Techniken (Flexbox und Grid) in diesem Projekt funktionieren.

---

## 1. Die Struktur der CSS-Dateien

Es gibt zwei Arten von CSS-Dateien in diesem Projekt:

1. **Globale Styles (`src/App.css`):** 
   Sie wird einmal in `main.jsx` importiert (`import './App.css'`) und gilt für die gesamte App. Hier stehen das Reset (Standardabstände entfernen), die Grundschrift, die Farben für Überschriften und der generische Button-Stil.

2. **Komponenten-Styles (z.B. `Header.css`, `Home.css`):**
   Sie werden direkt in der jeweiligen Komponente importiert (z.B. `import './Header.css'` in `Header.jsx`). Sie gelten nur für die Elemente, die in dieser Komponente gerendert werden.

**Wichtig:** React macht hier kein echtes „Scoping". Wenn du in `Home.css` die Klasse `.card` stylst, und in `About.css` auch `.card`, dann überschreiben sich diese Styles gegenseitig (je nachdem, welche Datei später geladen wird). Deshalb verwendet dieses Projekt spezifische Selektoren, um Konflikte zu vermeiden:
- In `Home.css` heißt es `.features .card` (nur Karten innerhalb des Features-Bereichs).
- In `About.css` heißt es `.is-card` (ein eigener Name für die Karten in der 5I-Ansicht).

---

## 2. Das globale Design: Farben und Schriften

Die wichtigsten Design-Entscheidungen sind in `App.css` und `Header.css` festgehalten:

- **Hintergrund:** `#f5f5f5` (ein sehr helles Grau) für die gesamte Seite.
- **Hauptfarbe (Türkis-Grün):** `#00b4a0` für Buttons, aktive Tabs und Icons.
- **Dunklere Hauptfarbe:** `#008c7a` für Überschriften und Hover-Effekte.
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



Layout-Techniken: Flexbox vs. Grid

In den CSS-Dateien werden zwei Haupttechniken verwendet, um Elemente anzuordnen:

1. Flexbox (eindimensional)

Flexbox eignet sich hervorragend, um Elemente in einer Reihe oder in einer Spalte anzuordnen. Im Projekt wird es zum Beispiel für den Header verwendet:

/* Auszug aus Header.css */
header {
    display: flex;
    justify-content: space-between; /* Logo links, Navigation rechts */
    align-items: center;            /* Vertikal zentriert */
    padding: 1rem 2rem;
}

justify-content: space-between: Drückt das Logo an den linken Rand und die Navigation an den rechten Rand. Der freie Platz dazwischen wird automatisch verteilt.

align-items: center: Richtet Logo und Navigation auf der vertikalen Achse mittig aus.



2. CSS Grid (zweidimensional)

Grid eignet sich für komplexe Layouts, die sowohl Zeilen als auch Spalten haben. Im Projekt wird es für die Feature-Karten und die 5I-Karten verwendet:

/* Auszug aus Home.css */
.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
}

Das ist ein sehr mächtiger Einzeiler. Er bedeutet:

    display: grid: Aktiviere das Grid-Layout.

    repeat(auto-fit, ...): Erzeuge so viele Spalten wie möglich, aber nur so viele, wie in die aktuelle Breite passen.

    minmax(220px, 1fr): Jede Spalte ist mindestens 220px breit. Wenn mehr Platz da ist, teilen sich die Spalten den restlichen Platz gleichmäßig auf (1fr = ein Bruchteil).

    gap: 1.5rem: Der Abstand zwischen den Karten.


Was passiert also auf einem schmalen Bildschirm? Wenn nicht mehr genug Platz für zwei Karten à 220px ist, bricht das Grid automatisch auf eine Spalte um. Das ist ein vollständig responsives Layout ohne eine einzige Media Query!


Media Queries (für den Feinschliff)

Media Queries werden nur an wenigen Stellen verwendet, um das Layout für sehr kleine Bildschirme (Smartphones) anzupassen. Ein Beispiel aus 
Header.css:

@media (max-width: 700px) {
    header {
        flex-direction: column; /* Logo und Navigation untereinander */
        padding: 0.8rem;
    }
    nav {
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap; /* Navigation umbricht bei Platzmangel */
        justify-content: center;
    }
}

max-width: 700px: Diese Regel gilt nur, wenn der Bildschirm schmaler als 700px ist.

flex-direction: column: Ändert die Richtung von „nebeneinander" zu „untereinander". Das ist auf schmalen Bildschirmen besser lesbar.



Neben den großen Layouts gibt es ein paar Details, die dem Projekt seinen Charakter geben:
Die „Pill"-Form

Viele Elemente (Buttons, Tags, aktive Tabs) haben eine stark abgerundete Form. Das wird durch einen großen border-radius erreicht:

button {
    border-radius: 30px; /* Halb so hoch wie der Button = perfekte Pillenform */
}



Der Hover-Effekt bei Karten

Die Karten in Home.css und About.css heben sich leicht an, wenn man mit der Maus darüber fährt:

```css
.features .card:hover {
    transform: translateY(-4px);
    transition: transform 0.2s; /* Sorgt für eine weiche Animation */
}

translateY(-4px): Verschiebt die Karte um 4 Pixel nach oben. Das erzeugt den Eindruck, als würde sie schweben.

transition: Sorgt dafür, dass diese Bewegung nicht ruckartig, sondern fließend (über 0.2 Sekunden) passiert.



Schatten für Tiefe

Die Karten und der Header haben leichte Schatten, um sich vom Hintergrund abzuheben:

.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

0 4px 12px: Der Schatten ist 0px nach rechts, 4px nach unten verschoben und 12px „weichgezeichnet" (Blur).

rgba(0, 0, 0, 0.05): Eine sehr transparente schwarze Farbe (nur 5% Deckkraft). Das erzeugt einen dezenten, natürlichen Schatten.



Typische Fragen

    Warum nicht einfach ein großes CSS-Framework wie Tailwind oder Bootstrap verwenden? Frameworks sind schnell, aber sie bringen einen eigenen Look und viel „unnötigen" Code mit. Für dieses Projekt wollten wir ein eigenes, maßgeschneidertes Design (das türkis-grüne Farbschema der Koelnmesse) und den Code so klein und verständlich wie möglich halten.

    Könnte man das CSS auch in die JSX-Dateien schreiben (CSS-in-JS)? Ja, Bibliotheken wie styled-components machen das. Aber wir wollten den klassischen Weg gehen (externe CSS-Dateien), weil er für Einsteiger leichter zu verstehen ist und dem Standard in vielen Unternehmen entspricht.

    Was ist der Vorteil von rem gegenüber px? rem bezieht sich auf die Schriftgröße des Wurzelelements (normalerweise 16px). Wenn der Nutzer die Schriftgröße in seinem Browser vergrößert (Barrierefreiheit), skalieren rem-Werte automatisch mit, px-Werte nicht.

    Warum steht in App.css ein *-Selektor ganz am Anfang? Das ist ein „Reset". Es setzt die Standardabstände (margin, padding) aller Elemente auf 0 und sorgt dafür, dass Breiten und Höhen so berechnet werden, wie man es erwartet (box-sizing: border-box). Das ist ein Standard, der in fast jedem modernen Webprojekt verwendet wird.

Mach es selbst

    Ändere in App.css die Hauptfarbe #00b4a0 auf ein kräftiges Lila (z.B. #8b5cf6). Was passiert mit den Buttons, Tabs und Icons? (Du siehst, wie mächtig die zentrale Farbdefinition ist – ein Wert ändert das gesamte Design.)

    Ändere in Home.css den Wert minmax(220px, 1fr) auf minmax(150px, 1fr). Was passiert auf einem mittelgroßen Bildschirm? (Es passen mehr Karten in eine Reihe.)

    Entferne in Header.css das @media (max-width: 700px)-Block. Verkleinere dein Browserfenster auf Handy-Größe. Was passiert? (Die Navigation wird abgeschnitten oder passt nicht mehr – genau deshalb brauchen wir die Media Query.)