import { Link } from 'react-router-dom';

const skills = ['C#', 'Python', 'React', '.NET', 'Docker', 'Git', 'AWS/Azure', 'Linux'];

const About = () => {
    return (
        <div className="about">
            <h1>About Me</h1>

            <section className="about-intro">
                <p>
                    Hi, I'm <strong>Yevhenii Sauliak</strong>, also known as <strong>Yen</strong> or
                    <strong> halva</strong> online. I'm currently studying Computer Science in Baden,
                    Switzerland, with a focus on Software Development.
                </p>
                <p>
                    I enjoy coding and learning new things — whether that's new technologies,
                    video games, TV shows, philosophy, or exploring new genres of music.
                    Curiosity keeps me going.
                </p>
            </section>

            <section className="about-skills">
                <h2>Skills & Tools</h2>
                <div className="skills-list">
                    {skills.map((skill, i) => (
                        <span key={i} className="skill-tag">
              {skill}
                            {skill === 'Linux' && <span className="skill-note"> (yes, I run it on my main PC, I'm that guy)</span>}
            </span>
                    ))}
                </div>
            </section>

            <section className="about-learning">
                <h2>Currently Learning</h2>
                <p>
                    I attend an optional robotics class at school — it's actually really fun!
                    I'm also working through Cisco Cybersecurity courses online. Always expanding the toolkit.
                </p>
            </section>

            <section className="about-life">
                <h2>Outside of Code</h2>
                <p>
                    When I'm not in front of a screen, you'll find me riding my mountain bike,
                    binging TV shows and movies, gaming, traveling with friends, or at a concert
                    throwing my hands in the moshpit.
                </p>
            </section>

            <section className="about-photos">
                <h2>Gallery</h2>
                <div className="photo-grid">
                    <div className="photo-placeholder">Photo coming soon</div>
                    <div className="photo-placeholder">Photo coming soon</div>
                    <div className="photo-placeholder">Photo coming soon</div>
                </div>
            </section>

            <section className="about-cta">
                <p>
                    I'm always looking for new challenges and opportunities to grow.
                    Feel free to <Link to="/contact">reach out</Link> if you want to collaborate or just chat!
                </p>
            </section>
        </div>
    );
};

export default About;