
import { siteConfig } from './siteData.js';

const imageUrl = (filename) => `${import.meta.env.BASE_URL}images/${filename}`;

const portfolioProjects = [
  {
    title: 'University of Ottawa',
    location: 'Ottawa, ON',
    category: 'Bird-Friendly Murals',
    image: 'University of Ottawa - Ottawa, ON 2.jpeg',
    size: 'wide',
  },
  {
    title: 'Ottawa Public Library Centrepointe',
    location: 'Ottawa, ON',
    category: 'Bird-Friendly Murals',
    image: 'Ottawa Public Library Centrepointe - Ottawa, ON.jpeg',
    size: 'tall',
  },
  {
    title: 'Bamfield Marine Sciences Centre',
    location: 'Bamfield, BC',
    category: 'Bird-Friendly Murals',
    image: 'Bamfield Marine Science Centre - Bamfield, BC.jpg',
    size: 'standard',
  },
  {
    title: 'Local Public Eatery Lansdowne',
    location: 'Ottawa, ON',
    category: 'Chalkboards & Signage',
    image: 'Local Public Eatery Lansdowne - Ottawa, ON.jpg',
    size: 'standard',
  },
  {
    title: 'Oresta',
    location: 'Ottawa, ON',
    category: 'Chalkboards & Signage',
    image: 'Oresta - Ottawa, ON.jpeg',
    size: 'wide',
  },
  {
    title: 'Ottawa Valley Wild Bird Care Centre',
    location: 'Ottawa, ON',
    category: 'Community Art',
    image: 'Ottawa Valley Wild Bird Care Centre - Ottawa, ON.jpeg',
    size: 'standard',
  },
  {
    title: 'University of Ottawa',
    location: 'Ottawa, ON',
    category: 'Bird-Friendly Murals',
    image: 'University of Ottawa - Ottawa, ON 3.jpeg',
    size: 'standard',
  },
  {
    title: 'Ottawa Public Library Centrepointe',
    location: 'Ottawa, ON',
    category: 'Bird-Friendly Murals',
    image: 'Ottawa Public Library Centrepointe - Ottawa, ON 2.jpeg',
    size: 'standard',
  },
  {
    title: 'Bamfield Marine Sciences Centre',
    location: 'Bamfield, BC',
    category: 'Community Art',
    image: 'Bamfield Marine Science Centre - Bamfield, BC 2.jpg',
    size: 'standard',
  },
  {
    title: 'Ottawa Project',
    location: 'Ottawa, ON',
    category: 'Chalkboards & Signage',
    image: 'Ottawa, ON.jpeg',
    size: 'standard',
  },
];

const categories = ['All', 'Bird-Friendly Murals', 'Chalkboards & Signage', 'Community Art'];

const services = [
  {
    number: '01',
    title: 'Bird-Friendly Murals',
    description: 'Window artwork that combines visual storytelling with bird conservation.',
  },
  {
    number: '02',
    title: 'Chalkboards & Signage',
    description: 'Hand-lettered menus, storefront features and custom signs.',
  },
  {
    number: '03',
    title: 'Public & Community Art',
    description: 'Creative installations designed to engage, educate and connect.',
  },
];

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
      <path
        d="M35 20c5-5 10-7 15-5-3 5-7 8-13 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="45" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M14 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    if (activeCategory === 'All') return portfolioProjects;
    return portfolioProjects.filter((project) => project.category === activeCategory);
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
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a className="button button--dark button--small" href="#contact">
              Start a project
            </a>
          </div>
        </nav>

        <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
          <div className="container mobile-menu__inner">
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#contact" onClick={closeMenu}>Start a project</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-grain" aria-hidden="true" />

          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Artist · Researcher · Conservationist</p>

              <h1>
                Where art, science <em>&amp; conservation</em> meet.
              </h1>

              <p className="hero-text">
                Vanessa creates hand-lettered artwork and bird-friendly murals that transform everyday spaces through creativity, education and conservation.
              </p>

              <div className="hero-actions">
                <a className="button button--dark" href="#work">
                  Explore the work <ArrowIcon />
                </a>

                <a className="button button--outline" href="#about">
                  Meet Vanessa
                </a>
              </div>

              <div className="hero-meta" aria-label="Vanessa's creative practice">
                <div>
                  <strong>Art</strong>
                  <span>Hand-drawn creativity</span>
                </div>
                <div>
                  <strong>Science</strong>
                  <span>Research-informed</span>
                </div>
                <div>
                  <strong>Conservation</strong>
                  <span>Safer spaces for birds</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal reveal--delay">
              <div className="hero-arch">
                <img src={imageUrl('Hero-Image.png')} alt="Vanessa creating artwork on glass" />
                <div className="hero-arch__overlay" />
                <BirdIcon className="hero-bird hero-bird--one" />
                <BirdIcon className="hero-bird hero-bird--two" />
              </div>
            </div>
          </div>
        </section>

        <section className="section portfolio" id="work">
          <div className="container">
            <div className="portfolio-header">
              <SectionHeading
                eyebrow="Selected work"
                title="Creative work with purpose."
                text="Murals, lettering and public art created across Ontario and British Columbia."
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
                <article className={`project-card project-card--${project.size}`} key={`${project.title}-${project.image}`}>
                  <img
                    src={imageUrl(project.image)}
                    alt={`${project.title}, ${project.location}`}
                    loading={index > 2 ? 'lazy' : 'eager'}
                  />

                  <div className="project-card__shade" />

                  <div className="project-card__content">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <small>{project.location}</small>
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
                <img src={imageUrl('Vanessa_Hum Bio.jpeg')} alt="Vanessa Hum" loading="lazy" />
              </figure>

              <div className="about-stamp">
                <BirdIcon />
                <span>Art for birds, people and place</span>
              </div>
            </div>

            <div className="about-copy">
              <p className="eyebrow">About Vanessa</p>
              <h2>Creativity grounded in curiosity.</h2>

              <p>
                Born and raised in Ottawa, Vanessa began with calligraphy, signage and illustration before expanding her practice to artwork on glass and bird-friendly window murals.
              </p>

              <p>
                Her interest in these murals led to graduate research at Simon Fraser University studying bird-window collisions. Today, her work brings together art, science and community engagement.
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
              <p className="eyebrow eyebrow--light">Art + conservation</p>
              <h2>Making glass visible.</h2>

              <p>
                Vanessa uses public art to make bird conservation more visible, approachable and connected to the spaces people use every day.
              </p>

              <div className="conservation-points">
                <div>
                  <strong>Research</strong>
                  <span>Informed by her work studying bird-window collisions.</span>
                </div>
                <div>
                  <strong>Design</strong>
                  <span>Artwork responds to each building and environment.</span>
                </div>
                <div>
                  <strong>Community</strong>
                  <span>Public art creates opportunities for conversation and learning.</span>
                </div>
              </div>
            </div>

            <div className="conservation-visual">
              <img
                src={imageUrl('university main picture.jpeg')}
                alt="Large bird-friendly window artwork"
                loading="lazy"
              />

              <div className="conservation-caption">
                <BirdIcon />
                <p>Art that helps make windows safer and conservation more visible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="split-heading">
              <SectionHeading eyebrow="Services" title="Made for your space." />
              <p>Custom artwork for businesses, institutions and community spaces.</p>
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

        <section className="section contact" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Start a project</p>
              <h2>Have a space in mind?</h2>

              <p>
                Share a few details about the location, size and creative direction and Vanessa can follow up with next steps.
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
                  <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
                </label>

                <label>
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                </label>
              </div>

              <label>
                <span>Project type</span>
                <select name="projectType" defaultValue="Bird-friendly window mural">
                  <option>Bird-friendly window mural</option>
                  <option>Chalkboard or signage</option>
                  <option>Public or community art</option>
                  <option>Illustration</option>
                  <option>Something else</option>
                </select>
              </label>

              <label>
                <span>Tell Vanessa about the project</span>
                <textarea
                  name="details"
                  rows="5"
                  placeholder="Location, approximate size, timing and your idea."
                  required
                />
              </label>

              <button className="button button--dark" type="submit">
                Prepare project email <ArrowIcon />
              </button>

              <p className="form-note" aria-live="polite">
                {formMessage || 'Submitting opens your email app with the project details prepared.'}
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
              <span>Art · Science · Conservation</span>
            </div>
          </div>

          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="instagram-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.brandName}</span>
          <span>Art, science and conservation.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
