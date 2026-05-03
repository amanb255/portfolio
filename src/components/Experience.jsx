import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('optum');

  const experiences = {
    optum: [
      {
        role: 'Senior Software Engineer',
        period: 'July 2025 - Present',
        location: 'Gurugram, India',
        achievements: [
          'Led end-to-end migration of 11 production services (~10TB data) from on-prem to multi-region AWS (ECS Fargate, Aurora, S3, EFS)',
          'Designed multi-channel data ingestion architecture handling API-based, file-based (EFS), and Kafka event ingestion',
          'Owned Kafka pipeline reliability across 20+ producers/consumers (~50K events/day) with DLQ, alerting, and replay mechanisms',
          'Optimized API and database performance under peak load (~200-300 RPM), reducing p95 latency by ~25%',
          'Migrated 14 services from Jenkins to GitHub Actions for faster CI/CD workflows',
        ],
        technologies: ['AWS', 'ECS Fargate', 'Kafka', 'Aurora RDS', 'Terraform', 'Spring Boot'],
      },
      {
        role: 'Associate Software Engineer II',
        period: 'June 2022 - July 2025',
        location: 'Gurugram, India',
        achievements: [
          'Built backend microservices using Spring Boot and REST APIs, reducing redundant API calls and improving response efficiency',
          'Developed full-stack feature (React + Spring Boot) integrating PWC loan APIs, increasing customer adoption by 10%',
          'Designed and optimized customer portal using React, Redux, and Zustand, improving UI responsiveness by ~30%',
        ],
        technologies: ['Spring Boot', 'React', 'Redux', 'Zustand', 'REST APIs', 'Microservices'],
      },
    ],
    siemens: [
      {
        role: 'Software Intern',
        period: 'Jan 2022 - Jun 2022',
        location: 'Noida, India',
        achievements: [
          'Improved log processing efficiency by 20% using C++ Boost Serialization for structured log handling',
          'Built PyQt-based data retrieval tool, eliminating manual filtering and reducing data access time',
        ],
        technologies: ['C++', 'Boost', 'PyQt', 'Python'],
      },
    ],
    exim: [
      {
        role: 'Software Intern',
        period: 'May 2021 - Jun 2021',
        location: 'Mumbai, India',
        achievements: [
          'Built a chatbot with MySQL-backed persistence, improving user adoption by 25%',
          'Automated basic query handling, reducing manual support load',
        ],
        technologies: ['Python', 'MySQL', 'NLP'],
      },
    ],
  };

  const tabs = [
    { id: 'optum', label: 'Optum' },
    { id: 'siemens', label: 'Siemens' },
    { id: 'exim', label: 'EXIM' },
  ];

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Work Experience</h2>
        </motion.div>

        <div className="experience-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="experience-content">
          {experiences[activeTab].map((exp, index) => (
            <ExperienceItem key={index} exp={exp} company={activeTab} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ exp, company }) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.div
      ref={itemRef}
      className="experience-item"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="experience-header">
        <h3 className="experience-role">{exp.role}</h3>
        <p className="experience-company" data-company={company}>
          {company === 'optum' ? 'Optum UHG' : company === 'siemens' ? 'Siemens' : 'Export-Import (EXIM) Bank of India'}
        </p>
        <div className="experience-details">
          <span className="detail-item">
            <Calendar size={16} />
            {exp.period}
          </span>
          <span className="detail-item">
            <MapPin size={16} />
            {exp.location}
          </span>
        </div>
      </div>

      <ul className="experience-achievements">
        {exp.achievements.map((achievement, i) => (
          <AchievementItem
            key={i}
            achievement={achievement}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </ul>

      <div className="experience-technologies">
        {exp.technologies.map((tech, i) => (
          <span key={i} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const AchievementItem = ({ achievement, index, scrollYProgress }) => {
  const x = useTransform(
    scrollYProgress,
    [0.1 + index * 0.03, 0.3 + index * 0.03, 0.85, 0.95],
    [-50, 0, 0, -50]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1 + index * 0.03, 0.3 + index * 0.03, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <motion.li style={{ x, opacity }}>
      {achievement}
    </motion.li>
  );
};

export default Experience;
