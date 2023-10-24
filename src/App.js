import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="about">
        <div className="container">
          <h1>Hello, I'm Md. Rofaz Hasan Rafiu</h1>
          <p>I am a Computer Science student at RUET. I specialize in C, C++, Python, and have a keen interest in backend development, software engineering, and AI.</p>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Skills</h2>
          <ul>
            <li>C</li>
            <li>C++</li>
            <li>Python</li>
            <li>Backend Development</li>
            <li>Software Engineering</li>
            <li>Artificial Intelligence</li>
          </ul>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2>Projects</h2>
          <p>Here are some of my notable projects:</p>
          {/* Add your project details here */}
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>Contact Me</h2>
          <p>You can reach me via email at <a href="mailto:rofaz@example.com">rofaz@example.com</a>. Connect with me on <a href="https://www.linkedin.com/in/rofazrafiu/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://www.facebook.com/rofazrafiu/" target="_blank" rel="noopener noreferrer">Facebook</a>.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
