import { useState } from 'react';

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const res = await fetch('https://formspree.io/f/mpqqpyvl', {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="contact">
            <h1>Contact</h1>
            <p className="contact-intro">
                Want to collaborate, have a question, or just say hi? Feel free to reach out.
            </p>

            <div className="contact-content">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                    {status === 'success' && <p className="form-status success">Message sent! I'll get back to you soon.</p>}
                    {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
                </form>

                <div className="contact-links">
                    <h2>Or find me elsewhere</h2>
                    <ul>
                        <li>
                            <a href="https://github.com/halva2251" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/yevhenii-sauliak/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/sauliak.yevhenii/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Contact;