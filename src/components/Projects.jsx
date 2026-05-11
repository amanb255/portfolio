import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import projectImage1 from "../assets/projects/project-1.avif";
import projectImage2 from "../assets/projects/project-2.avif";
import projectImage3 from "../assets/projects/project-3.jpeg";
import projectImage4 from "../assets/projects/project-4.jpeg";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Gym Tracker",
      subtitle: "iOS App",
      description: "Flutter • Sprinboot • Tracking",
      image: projectImage1,
      placeholder:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
      technologies: ["Java", "Flutter", "Springboot"],
      link: "https://github.com/amanb255/gymtracker",
    },
    {
      title: "Splitify",
      subtitle: "Expense tracker for your needs!",
      description: "Dashboard, Payment Tracker and bills splitting",
      image: projectImage2,
      placeholder:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
      technologies: ["Graphs", "Spring Boot", "React"],
      link: "https://github.com/amanb255/splitify",
    },
    {
      title: "Dermavision API",
      subtitle: "Backend Engineering",
      description:
        "CNN model for Skin Cancer Detection through image processing",
      image: projectImage3,
      placeholder:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800&fit=crop",
      technologies: ["CNN", "Python", "Flask"],
      link: "https://github.com/amanb255/dermavision-api",
    },
    {
      title: "DermaVision",
      subtitle: "FullStack WebApp",
      description:
        "WebApp with Api integration to store create new scans and reports",
      image: projectImage4,
      placeholder:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop",
      technologies: ["Javascript", "React", "Redux"],
      link: "https://github.com/amanb255/dermavision-frontend",
    },
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container-fluid">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Work</h2>
        </motion.div>

        <div className="projects-masonry">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // 3D rotation effect - cards lay flat and stand up
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [75, 0, 0, -75],
  );

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={cardRef}
      className="project-card-new"
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformPerspective: 1200,
      }}
    >
      <a
        href={project.link}
        className="project-link-wrapper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="project-image-wrapper">
          <img src={project.image || project.placeholder} alt={project.title} />
        </div>

        <motion.div
          className="project-overlay-new"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="project-content-new">
            <span className="project-subtitle">{project.subtitle}</span>
            <h3 className="project-title-new">{project.title}</h3>
            <p className="project-description-new">{project.description}</p>
            <div className="project-tech-new">
              {project.technologies.map((tech, i) => (
                <span key={i} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-cta">
              <span>View Project</span>
              <ArrowUpRight size={20} />
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default Projects;
