# Hyper Job Fair 🚀
**Digitales Marketing Gruppenprojekt (Universität zu Köln) – Gruppe C2**

## 📌 Über das Projekt
**Hyper Job Fair** ist eine Web-Applikation, die das Konzept der Hyper-Personalisierung auf klassische Jobmessen anwendet. Basierend auf dem **5I's-Modell** (Identification, Individualization, Interaction, Integration, Integrity) wurde eine Plattform entwickelt, die den gesamten Customer Journey – vor, während und nach der Messe – effizienter und personalisierter gestaltet.

Die Webseite dient als interaktiver Prototyp, um die in der theoretischen Ausarbeitung und Marktforschung (79 befragte Studierende) gewonnenen Erkenntnisse zu präsentieren. Ein besonderer Fokus lag dabei auf der Erstellung einer sauberen, wartbaren Codebasis sowie einer umfassenden Dokumentation zum Lernen.

## ✨ Features
- **Landing Page:** Übersicht über das Projekt und die Kernvorteile.
- **About:** Detaillierte Erklärung des 5I's-Modells, der Zielgruppen und der drei Kernversprechen (*Cheap, Flawless, Secure*).
- **Matching-Demo:** Eine interaktive "Tinder-ähnliche" Swipe-Funktion, bei der Nutzer fiktive Jobangebote liken oder ablehnen können.
- **Customer Journey:** Eine interaktive Darstellung der drei Phasen (Vor, Während und Nach der Messe) mit detaillierten Features (z.B. LinkedIn-Import, Live-Polls, individuelles Feedback).
- **Kontakt:** Ein funktionales Kontaktformular (Frontend-Simulation) für Kooperationsanfragen.

## 🛠 Technologien
Das Projekt wurde mit modernen Web-Technologien umgesetzt:
- **React.js** (v18) – Komponentenbasierte UI-Entwicklung
- **Vite** – Blitzschneller Build-Tool und Dev-Server
- **React Router** (v6) – Client-Side Routing für die Navigation
- **Vanilla CSS** – Maßgeschneidertes Responsive Design im Koelnmesse-inspirierten Farbschema (Hellgrau & Türkis-Grün)
- *(Archiv)*: Eine rein statische HTML/CSS/JS-Version des Projekts liegt ebenfalls im Ordner `static-version/`.

## 📚 Dokumentation zum Lernen (`docs/`)
Ein großer Bestandteil dieses Projekts ist die **Lern-Dokumentation**. Der gesamte React-Code wurde Zeile für Zeile analysiert und in einem eigenen `docs/`-Ordner festgehalten. Dies dient nicht nur dem besseren Verständnis für die Gruppenmitglieder, sondern zeigt auch potenziellen Arbeitgebern die tiefe Auseinandersetzung mit der Technologie.

Die Dokumentation ist in folgende Kapitel unterteilt (zu finden im Ordner [`docs/`](docs/)):
- **[0. Grundlagen](docs/00-grundlagen.md)**: React, JSX, Vite, Projektstruktur, Einstiegsdatei
- **[1. Routing](docs/01-routing.md)**: React Router, Navigation, aktive Links, ScrollToTop
- **[2. Komponenten](docs/02-komponenten.md)**: Props, verschachtelte Komponenten, Footer
- **[3. Home & About](docs/03-home-und-about.md)**: Statische Inhalte in JSX, Wiederverwendung von CSS-Klassen
- **[4. Matching-Demo](docs/04-matching-demo.md)**: State (`useState`), Listen, bedingtes Rendern, Event-Handler
- **[5. Customer Journey](docs/05-customer-journey.md)**: Tabs, State für den aktiven Tab, bedingtes Anzeigen von Blöcken
- **[6. Kontaktformular](docs/06-kontaktformular.md)**: Kontrollierte Formulare, mehrere States, `preventDefault`
- **[7. CSS-Architektur](docs/07-css-architektur.md)**: Globale Styles vs. Komponenten-Styles, Flexbox, Grid, Farben

## 🚀 Installation & Start

Voraussetzung: [Node.js](https://nodejs.org/) muss auf dem System installiert sein.

1. Repository klonen:
   ```bash
   git clone https://github.com/MikhailPugachevskiy/Hyper-Job-Fair.git