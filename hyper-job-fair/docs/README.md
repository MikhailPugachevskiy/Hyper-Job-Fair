# Dokumentation zum Lernen

Hier steht, wie der Code von **Hyper Job Fair** funktioniert, Zeile für Zeile erklärt. Die Erklärungen sind zum Lernen und für Vorstellungsgespräche gedacht. Sie sind nicht Teil der Website: Die React-App lädt diese Dateien nie.

## Die Web-App (React und JavaScript)

Lies die Kapitel in dieser Reihenfolge:

| Kapitel | Inhalt | Dateien im Code |
| --- | --- | --- |
| [0. Grundlagen](00-grundlagen.md) | React, JSX, Vite, Projektstruktur, Einstiegsdatei | `index.html`, `main.jsx` |
| [1. Routing](01-routing.md) | React Router, Navigation, aktive Links, ScrollToTop | `App.jsx`, `Header.jsx`, `ScrollToTop.jsx` |
| [2. Komponenten](02-komponenten.md) | Props, verschachtelte Komponenten, Footer | `Header.jsx`, `Footer.jsx` |
| [3. Home & About](03-home-und-about.md) | Statische Inhalte in JSX, Wiederverwendung von CSS-Klassen | `Home.jsx`, `About.jsx` |
| [4. Matching-Demo](04-matching-demo.md) | State (`useState`), Listen, bedingtes Rendern, Event-Handler | `MatchingDemo.jsx` |
| [5. Customer Journey](05-customer-journey.md) | Tabs, State für den aktiven Tab, bedingtes Anzeigen von Blöcken | `CustomerJourney.jsx` |
| [6. Kontaktformular](06-kontaktformular.md) | Kontrollierte Formulare, mehrere States, `preventDefault` | `Contact.jsx` |
| [7. CSS-Architektur](07-css-architektur.md) | Globale Styles vs. Komponenten-Styles, Flexbox, Grid, Farben | `App.css` und alle `.css`-Dateien |

## So sind die Kapitel aufgebaut

1. **Der Code** mit den Zeilennummern, wie er im Projekt steht.
2. **Zeile für Zeile**: Jeder Punkt beginnt mit der Zeilennummer (zum Beispiel „Z. 4") und erklärt, was die Zeile macht und warum.
3. **Typische Fragen**, wie sie in einem Vorstellungsgespräch kommen könnten, mit Antworten.
4. **Mach es selbst**: kleine Aufgaben, die du lokal ausprobieren kannst.

**Zu den Zeilennummern:** Sie stimmen für den Stand des Codes, als die Kapitel geschrieben wurden. Wenn du die Dateien später änderst, verschieben sie sich. Der Codeausschnitt steht aber immer direkt über den Erklärungen, damit man die Zuordnung auch dann findet.