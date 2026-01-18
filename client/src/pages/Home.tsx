import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <p className="greeting">Hey, I'm</p>
                <h1 className="name">Yevhenii Sauliak</h1>
                <p className="nickname">but you can call me <span>Yen</span></p>

                <p className="tagline">
                    Curious by default, builder by choice. As an IT student and C# developer,
                    I turn complex data and models into clean, practical software.
                    Always iterating, always learning.
                </p>

                <div className="cta-section">
                    <p>
                        Feel free to explore my <Link to="/projects">projects</Link> and <Link to="/personal">interests</Link>.
                        If you have any questions or want to connect, don't hesitate to <Link to="/contact">reach out</Link>.
                    </p>
                    <p className="cta-joke">
                        Or just hire me right now. No pressure. 👀
                    </p>
                </div>

                <div className="cta-buttons">
                    <Link to="/projects" className="btn btn-primary">View Projects</Link>
                    <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;