import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Multi-Region AWS Migration',
      subtitle: 'Cloud Architecture',
      description: '11 production services • 10TB data • Zero downtime',
      image: 'project-1.jpg',
      placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
      technologies: ['AWS', 'Terraform', 'ECS'],
      link: '#',
    },
    {
      title: 'Event Streaming Pipeline',
      subtitle: 'Distributed Systems',
      description: 'Real-time data processing at 50K events/day',
      image: 'project-2.jpg',
      placeholder: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
      technologies: ['Kafka', 'Spring Boot'],
      link: '#',
    },
    {
      title: 'Microservices Platform',
      subtitle: 'Backend Engineering',
      description: 'Scalable REST APIs with circuit breaking',
      image: 'project-3.jpg',
      placeholder: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800&fit=crop',
      technologies: ['Java', 'Spring Boot'],
      link: '#',
    },
    {
      title: 'Infrastructure Automation',
      subtitle: 'DevOps',
      description: 'CI/CD pipelines with GitHub Actions',
      image: 'project-4.jpg',
      placeholder: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop',
      technologies: ['GitHub Actions', 'Docker'],
      link: '#',
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
    offset: ["start end", "end start"]
  });

  // 3D rotation effect - cards lay flat and stand up
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [75, 0, 0, -75]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [200, 0, -200]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
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
        transformPerspective: 1200
      }}
    >
      <a href={project.link} className="project-link-wrapper">
        <div className="project-image-wrapper">
          <img src={project.placeholder} alt={project.title} />
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
                <span key={i} className="tech-pill">{tech}</span>
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
