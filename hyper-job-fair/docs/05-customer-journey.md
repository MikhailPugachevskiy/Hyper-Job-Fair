# 5. Customer Journey: Tabs und bedingtes Rendern

Die Seite „Customer Journey" zeigt die drei Phasen einer Jobmesse: Vor der Messe, Während der Messe und Nach der Messe. Der Nutzer kann über drei Buttons (Tabs) zwischen diesen Phasen wechseln.

Technisch gesehen ist das eine schöne Übung im **bedingten Rendern**: Wir haben drei große JSX-Blöcke, aber es soll immer nur genau einer davon angezeigt werden. 

---

## Die Idee: Ein State für den aktiven Tab

Anstatt drei separate States zu haben (`zeigeVorher`, `zeigeWaehrend`, `zeigeNachher`), verwenden wir **einen einzigen State**, der sich merkt, welcher Tab gerade aktiv ist. 

```jsx
const [activePhase, setActivePhase] = useState('before')


## Datei: `src/pages/CustomerJourney.jsx`

```jsx
  1 | import { useState } from 'react'
  2 | import './CustomerJourney.css'
  3 |
  4 | function CustomerJourney() {
  5 |     const [activePhase, setActivePhase] = useState('before')
  6 |
  7 |     return (
  8 |         <div className="customer-journey">
  9 |             <h1>Customer Journey</h1>
 10 |             <p className="sub">
 11 |                 Erlebe die drei Phasen der Hyper-Job-Messe – nahtlos integriert und personalisiert.
 12 |             </p>
 13 |
 14 |             <div className="phase-tabs">
 15 |                 <button
 16 |                     className={activePhase === 'before' ? 'active' : ''}
 17 |                     onClick={() => setActivePhase('before')}
 18 |                 >
 19 |                     📱 Vor der Messe
 20 |                 </button>
 21 |                 <button
 22 |                     className={activePhase === 'during' ? 'active' : ''}
 23 |                     onClick={() => setActivePhase('during')}
 24 |                 >
 25 |                     🏢 Während der Messe
 26 |                 </button>
 27 |                 <button
 28 |                     className={activePhase === 'after' ? 'active' : ''}
 29 |                     onClick={() => setActivePhase('after')}
 30 |                 >
 31 |                     📊 Nach der Messe
 32 |                 </button>
 33 |             </div>
 34 |
 35 |             <div className="phase-content">
 36 |                 {activePhase === 'before' && (
 37 |                     <div className="phase-card">
 38 |                         <h2>Vor der Messe – Perfekt vorbereitet</h2>
 39 |                         {/* ... Inhalt ... */}
 40 |                     </div>
 41 |                 )}
 42 |
 43 |                 {activePhase === 'during' && (
 44 |                     <div className="phase-card">
 45 |                         <h2>Während der Messe – Effizient und interaktiv</h2>
 46 |                         {/* ... Inhalt ... */}
 47 |                     </div>
 48 |                 )}
 49 |
 50 |                 {activePhase === 'after' && (
 51 |                     <div className="phase-card">
 52 |                         <h2>Nach der Messe – Nachhaltige Bindung</h2>
 53 |                         {/* ... Inhalt ... */}
 54 |                     </div>
 55 |                 )}
 56 |             </div>
 57 |         </div>
 58 |     )
 59 | }
 60 |
 61 | export default CustomerJourney


    Z. 1 Importiert useState.

    Z. 5 Der State activePhase startet mit dem Wert 'before'. Das bedeutet: Wenn die Seite zum ersten Mal geladen wird, ist der erste Tab aktiv.

    Z. 14 Ein Container für die drei Tab-Buttons.

    Z. 16 Hier passiert die „Magie" für das Styling: Wenn activePhase gerade 'before' ist, gibt der Ausdruck 'active' zurück, andernfalls einen leeren String ''. Die CSS-Klasse active (definiert in CustomerJourney.css) sorgt dann dafür, dass der Button türkis hinterlegt wird.

    Z. 17 Der Klick-Handler: onClick ruft setActivePhase('before') auf. Dadurch wird der State geändert und React zeichnet die Komponente neu.

    Z. 22 Das Gleiche für den zweiten Tab.

    Z. 28 Und für den dritten Tab.

    Z. 35 Ein Container für den Inhalt unterhalb der Tabs.

    Z. 36–41 Bedingtes Rendern mit &&: Der Ausdruck activePhase === 'before' && ( ... ) bedeutet: „Wenn activePhase gleich 'before' ist, rendere den Klammerinhalt. Andernfalls rendere nichts." Das ist ein sehr häufiges React-Muster, um Elemente nur unter bestimmten Bedingungen anzuzeigen.

    Z. 43–48 Das Gleiche für die mittlere Phase (during).

    Z. 50–55 Das Gleiche für die letzte Phase (after).

Wichtig zu wissen: Alle drei Blöcke stehen im Code untereinander. Aber React rendert immer nur den Block, dessen Bedingung true ist. Die anderen beiden werden ignoriert (sie erzeugen kein DOM-Element).


Der komplette Inhalt einer Phase (Beispiel)

```jsx
 36 |                 {activePhase === 'before' && (
 37 |                     <div className="phase-card">
 38 |                         <h2>Vor der Messe – Perfekt vorbereitet</h2>
 39 |                         <ul>
 40 |                             <li><strong>LinkedIn-Import</strong> – Profil automatisch übertragen</li>
 41 |                             <li><strong>Orientierungstest</strong> – Unternehmen laden Tests hoch, du bekommst bessere Matches</li>
 42 |                             <li><strong>Matching-Algorithmus</strong> – Wie Tinder: swipen, matchen, chatten</li>
 43 |                             <li><strong>Chat mit Recruitern</strong> – Fragen klären, Termine vereinbaren</li>
 44 |                         </ul>
 45 |                         <div className="example">
 46 |                             <span>Beispiel: Bob, Absolvent, lädt sein LinkedIn-Profil hoch und matched mit 5 Unternehmen.</span>
 47 |                         </div>
 48 |                     </div>
 49 |                 )}

 