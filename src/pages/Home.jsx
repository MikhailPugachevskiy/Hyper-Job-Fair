import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <h1>Hyper Job Fair</h1>
                <p className="subtitle">
                    Die digitale Jobmesse, die dich und deine Fähigkeiten wirklich versteht.
                </p>
                <p className="description">
                    Mit hyper-personalisiertem Matching, smarter Vorbereitung und nahtloser
                    Integration – vor, während und nach der Messe.
                </p>
                <div className="cta-buttons">
                    <Link to="/matching"><button>Matching ausprobieren</button></Link>
                    <Link to="/about"><button className="secondary">Mehr erfahren</button></Link>
                </div>
            </section>

            <section className="features">
                <div className="card">
                    <h3>🎯 Personalisiertes Matching</h3>
                    <p>Wie Tinder, aber für deine Karriere. Finde die Unternehmen, die wirklich zu dir passen.</p>
                </div>
                <div className="card">
                    <h3>💬 Chat &amp; Termine</h3>
                    <p>Vor der Messe mit Recruitern chatten, Fragen klären und Interviews vereinbaren.</p>
                </div>
                <div className="card">
                    <h3>📊 Feedback &amp; Entwicklung</h3>
                    <p>Nach der Messe individuelles Feedback erhalten und gezielt an deinen Skills arbeiten.</p>
                </div>
            </section>

            <section className="stats">
                <div>
                    <span>79+</span>
                    <p>Befragte Studierende</p>
                </div>
                <div>
                    <span>47%</span>
                    <p>der „Involved“ – sie wollen Job &amp; Service</p>
                </div>
                <div>
                    <span>5 I's</span>
                    <p>Unser Framework für Hyper-Personalization</p>
                </div>
            </section>
        </div>
    )
}

export default Home