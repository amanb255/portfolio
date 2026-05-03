import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './ImpactMetrics.css';

const ImpactMetrics = () => {
  const metrics = [
    { value: 11, suffix: '+', label: 'Services Migrated to AWS', description: 'Production microservices' },
    { value: 10, suffix: 'TB', label: 'Data Migrated', description: 'Seamless cloud transition' },
    { value: 50, suffix: 'K+', label: 'Events Per Day', description: 'Kafka pipeline throughput' },
    { value: 25, suffix: '%', label: 'Latency Reduction', description: 'P95 performance improvement' },
  ];

  return (
    <section id="impact" className="impact-metrics section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Impact by the Numbers</h2>
          <p className="section-subtitle">
            Measurable results from production systems at scale
          </p>
        </motion.div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MetricCard = ({ metric, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = metric.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, metric.value]);

  return (
    <motion.div
      ref={ref}
      className="metric-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
    >
      <div className="metric-value-wrapper">
        <span className="metric-value">{count}</span>
        <span className="metric-suffix">{metric.suffix}</span>
      </div>
      <h3 className="metric-label">{metric.label}</h3>
      <p className="metric-description">{metric.description}</p>
    </motion.div>
  );
};

export default ImpactMetrics;
