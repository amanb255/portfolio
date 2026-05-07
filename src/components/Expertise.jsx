import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import awsGif from "../assets/expertise/aws-expertise.mp4";
import eventDrivenGif from "../assets/expertise/event-driven.mp4";
import microservicesGif from "../assets/expertise/microservices.mp4";
import springbootGif from "../assets/expertise/springboot.mp4";
import "./Expertise.css";

const Expertise = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const expertiseAreas = [
    {
      title: "AWS",
      description:
        "Multi-region cloud infrastructure on ECS, Aurora, S3, and Lambda",
      gif: awsGif,
    },
    {
      title: "Event-Driven Architectures",
      description:
        "High-throughput Kafka pipelines with DLQ and replay mechanisms",
      gif: eventDrivenGif,
    },
    {
      title: "Microservices",
      description:
        "Production-grade distributed systems handling millions of requests",
      gif: microservicesGif,
    },
    {
      title: "Spring Boot",
      description:
        "Scalable backend services with REST APIs and optimized performance",
      gif: springbootGif,
    },
  ];

  return (
    <section id="expertise" className="expertise section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="expertise-statement"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="expertise-text">
            Cloud architect specializing in distributed systems, event-driven
            architectures, and production-grade microservices on AWS
          </p>
        </motion.div>

        <div className="expertise-grid">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard
              key={area.title}
              area={area}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertiseCard = ({ area, index, scrollYProgress }) => {
  const cardRef = useRef(null);

  // Staggered domino effect based on index
  const delay = index * 0.05;

  const y = useTransform(
    scrollYProgress,
    [0.1 + delay, 0.3 + delay, 0.7, 0.85],
    [100, 0, 0, -50],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1 + delay, 0.25 + delay, 0.75, 0.9],
    [0, 1, 1, 0],
  );

  const scale = useTransform(
    scrollYProgress,
    [0.1 + delay, 0.3 + delay, 0.7, 0.85],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={cardRef}
      className="expertise-card"
      style={{ y, opacity, scale }}
    >
      <div className="expertise-media">
        <video autoPlay loop muted playsInline>
          <source src={area.gif} type="video/mp4" />
        </video>
      </div>

      <div className="expertise-content">
        <h3 className="expertise-title">{area.title}</h3>
        <p className="expertise-description">{area.description}</p>
      </div>
    </motion.div>
  );
};

export default Expertise;
