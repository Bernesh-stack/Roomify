import Navbar from "components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "components/ui/Button";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar/>
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>

          </div>
          <p>Introducing Rommify 3.0</p>

        </div>

        <h1>Build Beautiful spaces at the speed of thought with roomify</h1>
        <p className="subtitle">
          Rommify is an AI-powered interior design tool that transforms your space
        </p>

        <div className="actions">
          <a className="cta" href="upload">
            Start Building <ArrowRight className="icon"/>
          </a>

          <Button variant="outline" size="lg" className="demo">
            Watch Demo
          </Button>


        </div>
        <div id="upload" className="upload-shell">
          <div className="grid-overlay"/>
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon"/>


              </div>
                              <h3>Upload your space</h3>
                              <p>Supports PNG, JPEG, SVG upto 10MB</p>
            </div>

            <p>Upload images</p>
          </div>

        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Latest Projects</h2>
              <p>Your Latest work and shares , community projects,all in one</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
              <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"/>
              <div className="badge">
                <span>Community</span>
              </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>project Namathon</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('01.01.2027').toLocaleDateString()}</span>
                    <span>created by You</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}
