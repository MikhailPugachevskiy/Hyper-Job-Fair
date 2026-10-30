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

    Z. 37 Ein <div> mit der Klasse phase-card. In CustomerJourney.css definiert sie das Aussehen der weißen Karte.

    Z. 38 Die Überschrift der Phase.

    Z. 39–44 Eine Liste mit den vier wichtigsten Features dieser Phase. Jedes <li> enthält ein <strong>-Tag, um den Feature-Namen hervorzuheben.

    Z. 45–47 Ein Beispiel-Block. Die Klasse .example stylt ihn als abgerundete Box in hellgrün mit kursiver Schrift.

Dieses Muster wiederholt sich exakt für die anderen beiden Phasen (during und after). Der einzige Unterschied sind die Texte.


Die drei „Milestones" am Ende

```jsx
 60 |             <div className="journey-visual">
 61 |                 <div className="milestone">1. Cheap</div>
 62 |                 <div className="milestone">2. Flawless</div>
 63 |                 <div className="milestone">3. Secure</div>
 64 |             </div>

Z. 60 Ein Container für die drei „Versprechen" (Milestones).

Z. 61–63 Drei <div>-Elemente mit der Klasse milestone. In CustomerJourney.css sind sie als türkise Pill-Buttons gestaltet.

Wichtig: Diese drei Milestones sind nicht vom activePhase-State abhängig. Sie sind immer sichtbar, egal welcher Tab gerade aktiv ist. Das ist eine Design-Entscheidung: Die Versprechen gelten für alle Phasen gleichermaßen.


Typische Fragen

    Warum verwenden wir && und nicht ein if? In JSX können wir keine if-Anweisungen direkt schreiben (nur innerhalb von { } als Ausdruck). && ist ein logischer Operator und funktioniert als Ausdruck: „Wenn links true ist, gib rechts zurück, sonst gib links (false) zurück." React rendert false als nichts (es erscheint nicht im DOM).

    Könnte man auch activePhase === 'before' ? (...) : null schreiben? Ja, das ist funktional identisch. && ist nur die kürzere Schreibweise, wenn es keinen else-Fall gibt.

    Warum steht der useState-Aufruf am Anfang der Komponente? React hat eine Regel: Hooks (wie useState) müssen immer in derselben Reihenfolge aufgerufen werden. Deshalb dürfen sie nicht in if-Blöcken oder Schleifen stehen. Indem wir sie ganz oben platzieren, garantieren wir, dass sie bei jedem Rendern in derselben Reihenfolge ausgeführt werden.

    Was passiert, wenn wir den State auf einen Wert setzen, den es nicht gibt (z.B. 'test')? Dann wäre keine der drei Bedingungen (=== 'before', === 'during', === 'after') wahr. Es würde kein Inhalt angezeigt werden. Der Code würde nicht abstürzen, aber der Nutzer sähe nur die Tabs und die Milestones ohne Inhalt. (Deshalb ist es wichtig, den State nur mit den erlaubten Werten zu setzen.)

    Was ist der Unterschied zwischen diesem State und dem State in der Matching-Demo? In der Matching-Demo gab es vier States, die sich unabhängig voneinander ändern konnten (Index, Matches, No-Matches, Finished). Hier gibt es nur einen State, der immer genau einen von drei Werten hat. Das ist ein schönes Beispiel dafür, dass man den State so einfach wie möglich halten sollte.


Mach es selbst

    Ändere den Startwert von activePhase auf 'during'. Welcher Tab ist beim Laden der Seite aktiv?

    Füge einen vierten Tab hinzu (z.B. mit data-phase="extra" und einem neuen Button). Was passiert, wenn du ihn anklickst? (Du siehst keinen Inhalt, weil es keinen {activePhase === 'extra' && (...)}-Block gibt.)

    Ändere in CustomerJourney.css die Farbe der aktiven Tabs (background: #00b4a0;) auf #ef4444 (rot). Was passiert?

    Überlege: Warum ist es besser, einen einzigen State (activePhase) zu verwenden, anstatt drei separate (showBefore, showDuring, showAfter)? (Weil man so nicht versehentlich zwei Tabs gleichzeitig aktiv haben kann. Der Zustand ist eindeutig.)