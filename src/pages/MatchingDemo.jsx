import { useState } from 'react'
import './MatchingDemo.css'

// Fiktive Jobangebote (aus der PDF inspiriert)
const jobOffers = [
    {
        id: 1,
        company: 'FoodCorp Europe',
        title: 'Junior Brand Manager',
        description: 'Verantwortung für die Entwicklung einer bekannten Marke im FMCG-Bereich. Teamarbeit, Kreativität und strategisches Denken gefragt.',
        tags: ['Marketing', 'FMCG', '1-2 Jahre Erfahrung'],
        match: 92
    },
    {
        id: 2,
        company: 'TechStart GmbH',
        title: 'Frontend Developer (React)',
        description: 'Gestalte die nächste Generation unserer SaaS-Plattform. Arbeite mit einem agilen Team und modernsten Technologien.',
        tags: ['React', 'TypeScript', 'Remote möglich'],
        match: 78
    },
    {
        id: 3,
        company: 'GreenEnergy AG',
        title: 'Projektmanager Nachhaltigkeit',
        description: 'Leite Projekte im Bereich erneuerbare Energien. Koordiniere internationale Teams und treibe die Energiewende voran.',
        tags: ['Projektmanagement', 'Englisch', 'Reisebereitschaft'],
        match: 65
    },
    {
        id: 4,
        company: 'DigitalHealth Solutions',
        title: 'Data Analyst',
        description: 'Analysiere Gesundheitsdaten, entwickle Dashboards und unterstütze Ärzte bei der Entscheidungsfindung.',
        tags: ['Python', 'SQL', 'Gesundheitswesen'],
        match: 85
    },
    {
        id: 5,
        company: 'EduFuture',
        title: 'Learning & Development Specialist',
        description: 'Gestalte innovative Lernangebote für junge Talente. Arbeite mit Universitäten und Unternehmen zusammen.',
        tags: ['Bildung', 'Didaktik', 'Kreativität'],
        match: 70
    }
]

function MatchingDemo() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [matches, setMatches] = useState([])
    const [noMatches, setNoMatches] = useState([])
    const [finished, setFinished] = useState(false)

    const current = jobOffers[currentIndex]

    const handleSwipe = (direction) => {
        if (!current) return

        if (direction === 'right') {
            setMatches([...matches, current])
        } else {
            setNoMatches([...noMatches, current])
        }

        if (currentIndex + 1 < jobOffers.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setFinished(true)
        }
    }

    const resetDemo = () => {
        setCurrentIndex(0)
        setMatches([])
        setNoMatches([])
        setFinished(false)
    }

    if (finished) {
        return (
            <div className="matching-demo">
                <h1>Matching-Demo</h1>
                <div className="result-card">
                    <h2>✅ Demo abgeschlossen!</h2>
                    <p>Du hast <strong>{matches.length}</strong> von {jobOffers.length} Angeboten nach rechts geswiped.</p>
                    <div className="result-lists">
                        <div>
                            <h3>Deine Matches</h3>
                            <ul>
                                {matches.map(job => <li key={job.id}>{job.company} – {job.title} (Match {job.match}%)</li>)}
                                {matches.length === 0 && <li>Keine Matches – vielleicht beim nächsten Mal?</li>}
                            </ul>
                        </div>
                        <div>
                            <h3>Übergangen</h3>
                            <ul>
                                {noMatches.map(job => <li key={job.id}>{job.company} – {job.title}</li>)}
                                {noMatches.length === 0 && <li>Du hast alle interessant gefunden!</li>}
                            </ul>
                        </div>
                    </div>
                    <button onClick={resetDemo}>Demo neu starten</button>
                </div>
            </div>
        )
    }

    return (
        <div className="matching-demo">
            <h1>Matching-Demo</h1>
            <p className="demo-hint">👆 Swipe nach rechts, wenn dich der Job interessiert – nach links, wenn nicht.</p>

            <div className="card-stack">
                <div className="job-card">
                    <div className="job-header">
                        <span className="company">{current.company}</span>
                        <span className="match-badge">{current.match}% Match</span>
                    </div>
                    <h3>{current.title}</h3>
                    <p>{current.description}</p>
                    <div className="tags">
                        {current.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
                    </div>
                </div>
            </div>

            <div className="swipe-buttons">
                <button className="swipe-left" onClick={() => handleSwipe('left')}>👈 Nicht interessiert</button>
                <button className="swipe-right" onClick={() => handleSwipe('right')}>👉 Interessiert</button>
            </div>

            <div className="progress">
                {currentIndex + 1} von {jobOffers.length} Angeboten
            </div>
        </div>
    )
}

export default MatchingDemo