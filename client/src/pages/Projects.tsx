const projects = [
    {
        name: 'BBB-Leitsystem',
        description: 'A guidance system for the BBBaden University that displays the current status of rooms and their availability in real-time.',
        tech: ['React', 'C#', 'SQLite'],
        github: 'https://github.com/halva2251/BBB-Leitsystem',
        type: 'Hackathon'
    },
    {
        name: 'Budget Buddy',
        description: 'A web application that helps users track their budget and savings goals with an intuitive interface.',
        tech: ['C#', '.NET MVC'],
        github: 'https://github.com/halva2251/BudgetAssistent_.NET_MVC',
        type: 'School'
    },
    {
        name: 'News Digest',
        description: 'An automated news scraping script that filters articles by keywords and delivers a curated digest via email.',
        tech: ['Python', 'PowerShell'],
        github: 'https://github.com/halva2251/news-digest',
        type: 'School'
    }
];

const Projects = () => {
    return (
        <div className="projects">
            <h1>Projects</h1>
            <p className="projects-intro">
                A selection of things I've built — from hackathons to school assignments.
                More to come as I keep learning and experimenting.
            </p>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <article key={index} className="project-card">
                        <div className="project-header">
                            <h2>{project.name}</h2>
                            <span className="project-type">{project.type}</span>
                        </div>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                            {project.tech.map((t, i) => (
                                <span key={i} className="tech-tag">{t}</span>
                            ))}
                        </div>
                        <div className="project-links">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                View on GitHub →
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Projects;