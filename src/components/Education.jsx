import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import graduation1 from '../assets/education/graduation-1.jpg';
import graduation2 from '../assets/education/graduation-2.jpg';
import './Education.css';

const Education = () => {
  const education = [
    {
      institution: 'Delhi Technological University (DCE)',
      image: graduation1,
      degree: 'Bachelor of Technology in Software Engineering',
      location: 'Delhi, India',
      period: 'Aug 2018 - May 2022',
      cgpa: '9.01/10.00',
      highlights: [
        'Graduated with distinction (9.01 CGPA)',
        'Strong foundation in algorithms, data structures, and software engineering',
      ],
    },
    {
      institution: 'International School of Beijing',
      image: graduation2,
      degree: 'International Baccalaureate (IB) - Class XII',
      location: 'Beijing, China',
      period: 'Aug 2017 - Apr 2018',
      highlights: [
        'International exposure and cross-cultural experience',
        'Higher Level: Mathematics, Physics, Chemistry',
        'Standard Level: Economics',
      ],
    },
  ];

  return (
    <section id="education" className="education section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Academic foundation and international exposure
          </p>
        </motion.div>

        <div className="education-list">
          {education.map((edu, index) => (
            <EducationItem key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EducationItem = ({ edu, index }) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [index % 2 === 0 ? -100 : 100, 0, 0, index % 2 === 0 ? -100 : 100]
  );

  const contentX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [index % 2 === 0 ? 100 : -100, 0, 0, index % 2 === 0 ? 100 : -100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <div
      ref={itemRef}
      className={`education-item ${index % 2 === 0 ? 'left-image' : 'right-image'}`}
    >
      <motion.div className={`education-image ${index === 1 ? 'adjust-top' : ''}`} style={{ x: imageX, opacity }}>
        <img src={edu.image} alt={edu.institution} />
      </motion.div>

      <motion.div className="education-content" style={{ x: contentX, opacity }}>
        <h3 className="education-institution">{edu.institution}</h3>
        <p className="education-degree">{edu.degree}</p>
        <div className="education-meta">
          <span className="meta-item">
            <Calendar size={14} />
            {edu.period}
          </span>
          <span className="meta-item">
            <MapPin size={14} />
            {edu.location}
          </span>
        </div>
        {edu.cgpa && (
          <div className="education-cgpa">
            <Award size={14} />
            <span>CGPA: {edu.cgpa}</span>
          </div>
        )}
        <ul className="education-highlights">
          {edu.highlights.map((highlight, i) => (
            <HighlightItem
              key={i}
              highlight={highlight}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const HighlightItem = ({ highlight, index, scrollYProgress }) => {
  const x = useTransform(
    scrollYProgress,
    [0.1 + index * 0.03, 0.25 + index * 0.03, 0.85, 0.95],
    [-30, 0, 0, -30]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1 + index * 0.03, 0.25 + index * 0.03, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <motion.li style={{ x, opacity }}>
      {highlight}
    </motion.li>
  );
};

export default Education;
