import { useState } from 'react'
import './CustomerJourney.css'

function CustomerJourney() {
    const [activePhase, setActivePhase] = useState('before')

    return (
        <div className="customer-journey">
            <h1>Customer Journey</h1>
            <p className="sub">
                Erlebe die drei Phasen der Hyper-Job-Messe – nahtlos integriert und personalisiert.
            </p>

            <div className="phase-tabs">
                <button
                    className={activePhase === 'before' ? 'active' : ''}
                    onClick={() => setActivePhase('before')}
                >
                    📱 Vor der Messe
                </button>
                <button
                    className={activePhase === 'during' ? 'active' : ''}
                    onClick={() => setActivePhase('during')}
                >
                    🏢 Während der Messe
                </button>
                <button
                    className={activePhase === 'after' ? 'active' : ''}
                    onClick={() => setActivePhase('after')}
                >
                    📊 Nach der Messe
                </button>
            </div>

            <div className="phase-content">
                {activePhase === 'before' && (
                    <div className="phase-card">
                        <h2>Vor der Messe – Perfekt vorbereitet</h2>
                        <ul>
                            <li><strong>LinkedIn-Import</strong> – Profil automatisch übertragen</li>
                            <li><strong>Orientierungstest</strong> – Unternehmen laden Tests hoch, du bekommst bessere Matches</li>
                            <li><strong>Matching-Algorithmus</strong> – Wie Tinder: swipen, matchen, chatten</li>
                            <li><strong>Chat mit Recruitern</strong> – Fragen klären, Termine vereinbaren</li>
                        </ul>
                        <div className="example">
                            <span>Beispiel: Bob, Absolvent, lädt sein LinkedIn-Profil hoch und matched mit 5 Unternehmen.</span>
                        </div>
                    </div>
                )}

                {activePhase === 'during' && (
                    <div className="phase-card">
                        <h2>Während der Messe – Effizient und interaktiv</h2>
                        <ul>
                            <li><strong>ScanYourTicket</strong> – digitaler Einlass</li>
                            <li><strong>Interaktive Karte</strong> – finde die Stände deiner Matches</li>
                            <li><strong>Digitale Wartelisten</strong> – keine langen Schlangen</li>
                            <li><strong>Social Contests</strong> – z.B. „Wie verbesserst du das Arbeitsklima?“ – mit Preisen</li>
                            <li><strong>Live-Polls</strong> – direktes Feedback per App</li>
                        </ul>
                        <div className="example">
                            <span>Beispiel: Bob scannt sein Ticket, geht direkt zu seinen Matches und hat ein erfolgreiches Interview.</span>
                        </div>
                    </div>
                )}

                {activePhase === 'after' && (
                    <div className="phase-card">
                        <h2>Nach der Messe – Nachhaltige Bindung</h2>
                        <ul>
                            <li><strong>Individuelles Feedback</strong> – von Recruitern zu Stärken und Entwicklungspunkten</li>
                            <li><strong>Newsletter</strong> – relevante Job-Updates und Events</li>
                            <li><strong>Bewertungssystem</strong> – teile deine Erfahrungen mit der Community</li>
                            <li><strong>Datenkontrolle</strong> – jederzeit löschbar (GDPR)</li>
                        </ul>
                        <div className="example">
                            <span>Beispiel: Bob erhält detailliertes Feedback, verbessert seine Soft Skills und bekommt den Job!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="journey-visual">
                <div className="milestone">1. Cheap</div>
                <div className="milestone">2. Flawless</div>
                <div className="milestone">3. Secure</div>
            </div>
        </div>
    )
}

export default CustomerJourney