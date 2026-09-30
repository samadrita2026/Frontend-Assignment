import "../App.css";


// 1. Header Component
function Header() {
  return (
    <header className="header">

      <div className="logo">
        My Portfolio
      </div>

      <Navbar />

    </header>
  );
}


// 2. Navigation Component
function Navbar() {
  return (
    <nav className="navbar">

      <a href="#about">About</a>

      <a href="#education">Education</a>

      <a href="#skills">Skills</a>

      <a href="#contact">Contact</a>

    </nav>
  );
}


// 3. About Component
function About() {
  return (
    <section id="about" className="section">

      <h2>About Me</h2>

      <p>
        Hello! I am a student interested in web development
        and modern technologies. I enjoy learning new skills
        and creating simple and useful websites.
      </p>

    </section>
  );
}


// 4. Education Component
function Education() {
  return (
    <section id="education" className="section">

      <h2>Education</h2>

      <div className="card">

        <h3>BCA</h3>

        <p>
          Techno India University
        </p>

        <p>
          2023 - Present
        </p>

      </div>

    </section>
  );
}


// 5. Skills Component
function Skills() {
  return (
    <section id="skills" className="section">

      <h2>Skills</h2>

      <div className="skills">

        <span>HTML</span>

        <span>CSS</span>

        <span>JavaScript</span>

        <span>TypeScript</span>

        <span>Git</span>

      </div>

    </section>
  );
}


// 6. Contact Component
function Contact() {
  return (
    <section id="contact" className="section">

      <h2>Contact</h2>

      <p>
        <strong>Email:</strong> samadrita2808@gmail.com
      </p>

      <p>
        <strong>Phone:</strong> +91 62912 93131
      </p>

      <p>
        <strong>Location:</strong> India
      </p>

    </section>
  );
}


// 7. Footer Component
function Footer() {
  return (
    <footer className="footer">

      <p>
        © 2026 My Portfolio
      </p>

    </footer>
  );
}


// Main App Component
function App() {
  return (
    <>

      <Header />

      <main>

        {/* Hero Section */}
        <section className="hero">

          <h1>
            Hi, I'm <span>Samadrita Sengupta</span>
          </h1>

          <p>
            A student passionate about web development
            and modern technologies.
          </p>

          <a href="#about" className="button">
            Explore My Portfolio
          </a>

        </section>


        <About />

        <Education />

        <Skills />

        <Contact />

      </main>


      <Footer />

    </>
  );
}


export default App;