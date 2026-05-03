import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import './Articles.css';

const Articles = () => {
  const articles = [
    {
      title: 'Building Resilient Kafka Pipelines at Scale',
      excerpt: 'Learn how we designed and implemented a production-grade Kafka pipeline handling 50K+ events per day with DLQ, circuit breaking, and replay mechanisms.',
      image: 'article-1.jpg',
      readTime: '8 min read',
      date: 'Coming Soon',
      link: '#',
      tags: ['Kafka', 'Distributed Systems', 'AWS'],
    },
    {
      title: 'Migrating to Multi-Region AWS: Lessons Learned',
      excerpt: 'A comprehensive guide to migrating 11 production services and 10TB of data from on-prem to multi-region AWS with zero downtime.',
      image: 'article-2.jpg',
      readTime: '12 min read',
      date: 'Coming Soon',
      link: '#',
      tags: ['AWS', 'Cloud Migration', 'DevOps'],
    },
  ];

  return (
    <section id="articles" className="articles section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Articles & Writing</h2>
          <p className="section-subtitle">
            Sharing knowledge about distributed systems and cloud architecture
          </p>
        </motion.div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              className="article-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="article-image">
                {/* Placeholder for article image */}
                <div className="article-image-placeholder">
                  <div className="placeholder-gradient"></div>
                  <p className="placeholder-text">
                    Add cover: <code>{article.image}</code>
                  </p>
                </div>
                {/* Uncomment when images are added:
                <img src={`/src/assets/images/articles/${article.image}`} alt={article.title} />
                */}
              </div>

              <div className="article-content">
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-tags">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="article-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="article-link-wrapper">
                  <span className="read-more">
                    Read Article
                    <ExternalLink size={16} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="articles-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="cta-text">More articles coming soon on Substack</p>
          <a href="#" className="btn btn-secondary">
            Follow on Substack
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles;
