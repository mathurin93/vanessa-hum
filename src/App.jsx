import { useEffect, useMemo, useState } from 'react';
import { processSteps, projects, services, siteConfig } from './siteData.js';

const categories = ['All', 'Conservation', 'Windows', 'Chalkboards', 'Events', 'Community'];

function BrandMark({ compact = false }) {
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-hidden="true">
      <span>left</span>
      <span>handed</span>
    </span>
  );
}

function BirdIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M7 37c11-1 20-7 27-19 0 9 4 15 12 18 4 2 8 2 12 1-6 8-14 12-24 12-12 0-21-4-27-12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M35 20c5-5 10-7 15-5-3 5-7 8-13 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="45" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.6" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p className="section-intro">{text}</p> : null}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [formMessage, setFormMessage] = useState('');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleInquiry = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const projectType = String(form.get('projectType') || '').trim();
    const details = String(form.get('details') || '').trim();

    if (!name || !email || !details) {
      setFormMessage('Please include your name, email and a short project description.');
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name}: ${projectType}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\nProject details:\n${details}`,
    );

    setFormMessage('Your email app is opening with the project details filled in.');
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="site-shell">
      <header className="site-header" id="home">
        <nav className="navbar container" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label={`${siteConfig.brandName} home`}>
            <BrandMark compact />
            <span className="brand-copy">
              <strong>{siteConfig.brandName}</strong>
              <small>Art · Science · Conservation</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span className={`menu-lines${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>

          <div className="desktop-menu">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a className="button button--dark button--small" href="#contact">
              Start a project
            </a>
          </div>
        </nav>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
          <div className="container mobile-menu__inner">
            {['work', 'services', 'about', 'process', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={closeMenu}>
                {item === 'contact' ? 'Start a project' : item}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Hand lettering · Window murals · Public art</p>
              <h1>
                Where art, science <em>&amp; conservation</em> meet.
              </h1>
              <p className="hero-text">
                Vanessa creates expressive chalk art, glass illustrations and bird-friendly murals that transform everyday spaces into opportunities for connection and learning.
              </p>
              <div className="hero-actions">
                <a className="button button--dark" href="#work">
                  Explore the work <ArrowIcon />
                </a>
                <a className="button button--outline" href="#about">
                  Meet Vanessa
                </a>
              </div>
              <div className="hero-meta" aria-label="Artist highlights">
                <div>
                  <strong>Art</strong>
                  <span>Handmade visual storytelling</span>
                </div>
                <div>
                  <strong>Science</strong>
                  <span>Research-informed design</span>
                </div>
                <div>
                  <strong>Community</strong>
                  <span>Public learning through creativity</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal reveal--delay">
              <div className="hero-arch">
                <img src="./images/bird-window-mural.jpg" alt="Vanessa creating a bird-friendly illustration on a large window" />
                <div className="hero-arch__overlay" />
                <div className="hero-script">create with purpose</div>
                <BirdIcon className="hero-bird hero-bird--one" />
                <BirdIcon className="hero-bird hero-bird--two" />
              </div>
              <div className="floating-card floating-card--top">
                <span>Based in Canada</span>
                <strong>Ottawa → Burnaby</strong>
              </div>
              <div className="floating-card floating-card--bottom">
                <BirdIcon />
                <span>Bird-friendly art for safer spaces</span>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip" aria-label="Selected institutions">
          <div className="container logo-strip__inner">
            <span>University of Ottawa</span>
            <span>Ottawa Public Library</span>
            <span>Bamfield Marine Sciences Centre</span>
            <span>Simon Fraser University</span>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="split-heading">
              <SectionHeading eyebrow="What Vanessa creates" title="Artwork made to belong in the moment." />
              <p>
                Each project is shaped around its setting, audience and purpose—whether the goal is to welcome, celebrate, explain, protect or simply make someone stop and look.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-card__top">
                    <span>{service.number}</span>
                    <BirdIcon />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section portfolio" id="work">
          <div className="container">
            <div className="portfolio-header">
              <SectionHeading
                eyebrow="Selected work"
                title="A portfolio with personality and purpose."
                text="Explore a selection of hand-lettered installations, chalk artwork, community projects and conservation-focused murals."
              />

              <div className="filters" aria-label="Filter portfolio projects">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={activeCategory === category ? 'is-active' : ''}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="portfolio-grid" aria-live="polite">
              {filteredProjects.map((project, index) => (
                <article className={`project-card project-card--${project.size}`} key={project.title}>
                  <img src={`./images/${project.image}`} alt={project.title} />
                  <div className="project-card__shade" />
                  <div className="project-card__content">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-card__number">{String(index + 1).padStart(2, '0')}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="about-collage">
              <figure className="about-image about-image--main">
                <img src="./images/window-mural-artist.jpg" alt="Vanessa drawing a detailed mural on glass" />
              </figure>
              <figure className="about-image about-image--small">
                <img src="./images/floral-glass.jpg" alt="White botanical line art drawn on a glass surface" />
              </figure>
              <div className="about-stamp">
                <BirdIcon />
                <span>Art for birds, people and place</span>
              </div>
            </div>

            <div className="about-copy">
              <p className="eyebrow">About Vanessa</p>
              <h2>Creative practice grounded in curiosity.</h2>
              <p>
                Born and raised in Ottawa, Ontario, Vanessa has always been passionate about both art and science. Her creative practice began with calligraphy, menu boards, signage and illustration, which led her to explore art on glass and create bird-friendly window murals—combining her artistic skills with her interest in wildlife conservation.
              </p>
              <p>
                Creating bird-friendly murals sparked Vanessa’s journey into avian conservation and inspired her Master’s research at Simon Fraser University in Burnaby, British Columbia, where she studied bird-window collisions and high-risk building features.
              </p>
              <p>
                Vanessa’s work sits at the intersection of science, art and community engagement. She transforms everyday spaces into opportunities for connection and learning, using creative approaches to inspire conversations about bird protection and promote safer spaces for wildlife.
              </p>
              <a className="text-link" href="#contact">
                Collaborate with Vanessa <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="conservation-section">
          <div className="container conservation-grid">
            <div className="conservation-copy">
              <p className="eyebrow eyebrow--light">Art as a conservation tool</p>
              <h2>Making glass visible. Making science approachable.</h2>
              <p>
                Bird-friendly murals can help communicate risk, invite people to notice their built environment and create a visible starting point for education about bird-window collisions.
              </p>
              <div className="conservation-points">
                <div>
                  <strong>Research-informed</strong>
                  <span>Grounded in Vanessa’s graduate research and conservation experience.</span>
                </div>
                <div>
                  <strong>Site-responsive</strong>
                  <span>Designed around the architecture, surrounding habitat and audience.</span>
                </div>
                <div>
                  <strong>Community-facing</strong>
                  <span>Created to encourage questions, dialogue and shared responsibility.</span>
                </div>
              </div>
            </div>

            <div className="conservation-visual">
              <img src="./images/winter-window.jpg" alt="White bird-friendly window art on glass overlooking a city" />
              <div className="conservation-caption">
                <BirdIcon />
                <p>Public art that helps people see windows—and bird safety—differently.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="container process-grid">
            <div className="process-intro">
              <SectionHeading
                eyebrow="The process"
                title="Thoughtful, collaborative and completely custom."
                text="From the first conversation to the final hand-drawn detail, the process stays clear, flexible and connected to the purpose of the space."
              />
              <a className="button button--dark" href="#contact">
                Tell Vanessa about your idea <ArrowIcon />
              </a>
            </div>

            <div className="process-list">
              {processSteps.map((step) => (
                <article className="process-step" key={step.number}>
                  <span className="process-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container">
            <div className="quote-card">
              <div className="quote-card__mark">“</div>
              <p className="eyebrow eyebrow--light">The work in one sentence</p>
              <blockquote>
                Transforming everyday surfaces into meaningful places for art, learning and connection.
              </blockquote>
              <div className="quote-card__footer">
                <span>Vanessa · lefthanded.ness</span>
                <BirdIcon />
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Start a project</p>
              <h2>Let’s make a space more visible, meaningful and memorable.</h2>
              <p>
                Share the location, approximate dimensions, preferred timing and the idea behind the project. Vanessa can then follow up with next steps and availability.
              </p>
              <div className="contact-details">
                <div>
                  <small>Location</small>
                  <strong>{siteConfig.location}</strong>
                </div>
                <div>
                  <small>Instagram</small>
                  <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
                    @{siteConfig.brandName}
                  </a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleInquiry}>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@example.com" />
                </label>
              </div>

              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="Bird-friendly window mural">
                  <option>Bird-friendly window mural</option>
                  <option>Chalkboard or menu</option>
                  <option>Event or celebration signage</option>
                  <option>Illustration or public art</option>
                  <option>Something else</option>
                </select>
              </label>

              <label>
                <span>Tell Vanessa about the project</span>
                <textarea
                  name="details"
                  rows="6"
                  placeholder="Include the city, space, approximate dimensions, ideal date and creative direction."
                />
              </label>

              <button className="button button--dark" type="submit">
                Prepare project email <ArrowIcon />
              </button>
              <p className="form-note" aria-live="polite">
                {formMessage || 'This form opens your email app. Replace the placeholder email in src/siteData.js before publishing.'}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandMark />
            <div>
              <strong>{siteConfig.brandName}</strong>
              <span>Art, science and conservation.</span>
            </div>
          </div>

          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="instagram-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.brandName}</span>
          <span>Designed for Vanessa’s creative practice.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
