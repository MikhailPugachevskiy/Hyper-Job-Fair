import { useState } from 'react'
import './Contact.css'

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Hier könnte ein API-Call stehen – wir simulieren nur.
        setSent(true)
        setTimeout(() => setSent(false), 4000)
    }

    return (
        <div className="contact">
            <h1>Kontakt</h1>
            <p className="sub">
                Du hast Fragen, Ideen oder möchtest mit uns kooperieren? Schreib uns!
            </p>

            <div className="contact-grid">
                <div className="contact-info">
                    <div className="card">
                        <h3>📧 E-Mail</h3>
                        <p>team@hyperjobfair.de</p>
                    </div>
                    <div className="card">
                        <h3>📍 Standort</h3>
                        <p>Köln, Deutschland (virtuell überall erreichbar)</p>
                    </div>
                    <div className="card">
                        <h3>🌐 Social Media</h3>
                        <p>#HyperJobFair – folge uns auf LinkedIn und Instagram!</p>
                    </div>
                </div>

                <div className="contact-form">
                    {sent ? (
                        <div className="success-message">
                            ✅ Vielen Dank! Wir melden uns bei dir.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label>Dein Name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />

                            <label>Deine E-Mail</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />

                            <label>Nachricht</label>
                            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required></textarea>

                            <button type="submit">Absenden</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contact