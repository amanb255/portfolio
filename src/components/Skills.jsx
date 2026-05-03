import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import { Grid3x3, Globe, ArrowLeftRight } from 'lucide-react';
import * as THREE from 'three';
import './Skills.css';

// Import tech logos
import awsLogo from '../assets/tech-logos/aws.svg';
import ecsFargateLogo from '../assets/tech-logos/ecs-fargate.svg';
import auroraLogo from '../assets/tech-logos/aurora-rds.svg';
import s3Logo from '../assets/tech-logos/s3.svg';
import lambdaLogo from '../assets/tech-logos/lambda.svg';
import vpcLogo from '../assets/tech-logos/vpc.svg';
import kafkaLogo from '../assets/tech-logos/kafka.svg';
import springBootLogo from '../assets/tech-logos/spring-boot.svg';
import javaLogo from '../assets/tech-logos/java.svg';
import microservicesLogo from '../assets/tech-logos/microservices.svg';
import restApisLogo from '../assets/tech-logos/rest-apis.svg';
import terraformLogo from '../assets/tech-logos/terraform.svg';
import dockerLogo from '../assets/tech-logos/docker.svg';
import kubernetesLogo from '../assets/tech-logos/kubernetes.svg';
import githubActionsLogo from '../assets/tech-logos/github-actions.svg';
import postgresqlLogo from '../assets/tech-logos/postgresql.svg';
import redisLogo from '../assets/tech-logos/redis.svg';
import mongodbLogo from '../assets/tech-logos/mongodb.svg';
import reactLogo from '../assets/tech-logos/react.svg';
import reduxLogo from '../assets/tech-logos/redux.svg';
import typescriptLogo from '../assets/tech-logos/typescript.svg';
import nodejsLogo from '../assets/tech-logos/nodejs.svg';
import pythonLogo from '../assets/tech-logos/python.svg';
import cppLogo from '../assets/tech-logos/cpp.svg';
import graphqlLogo from '../assets/tech-logos/graphql.svg';
import datadogLogo from '../assets/tech-logos/datadog.svg';
import splunkLogo from '../assets/tech-logos/splunk.svg';
import jenkinsLogo from '../assets/tech-logos/jenkins.svg';
import gitLogo from '../assets/tech-logos/git.svg';

const Skills = () => {
  const [isFlattened, setIsFlattened] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    { name: 'AWS', logo: awsLogo },
    { name: 'ECS Fargate', logo: ecsFargateLogo },
    { name: 'Aurora RDS', logo: auroraLogo },
    { name: 'S3', logo: s3Logo },
    { name: 'Lambda', logo: lambdaLogo },
    { name: 'VPC', logo: vpcLogo },
    { name: 'Apache Kafka', logo: kafkaLogo },
    { name: 'Spring Boot', logo: springBootLogo },
    { name: 'Java', logo: javaLogo },
    { name: 'Microservices', logo: microservicesLogo },
    { name: 'REST APIs', logo: restApisLogo },
    { name: 'Terraform', logo: terraformLogo },
    { name: 'Docker', logo: dockerLogo },
    { name: 'Kubernetes', logo: kubernetesLogo },
    { name: 'GitHub Actions', logo: githubActionsLogo },
    { name: 'PostgreSQL', logo: postgresqlLogo },
    { name: 'Redis', logo: redisLogo },
    { name: 'MongoDB', logo: mongodbLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Redux', logo: reduxLogo },
    { name: 'TypeScript', logo: typescriptLogo },
    { name: 'Node.js', logo: nodejsLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'C++', logo: cppLogo },
    { name: 'GraphQL', logo: graphqlLogo },
    { name: 'Datadog', logo: datadogLogo },
    { name: 'Splunk', logo: splunkLogo },
    { name: 'Jenkins', logo: jenkinsLogo },
    { name: 'Git', logo: gitLogo }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.h2
          className="skills-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technologies
        </motion.h2>

        <div className="skills-canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <SkillsGlobe
              skills={skills}
              onSelect={setSelectedSkill}
              isFlattened={isFlattened}
            />
          </Canvas>
        </div>

        <div className="skills-controls">
          <motion.div
            className="view-toggle-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              className={`view-option ${!isFlattened ? 'active' : ''}`}
              onClick={() => setIsFlattened(false)}
              aria-label="Globe View"
            >
              <Globe size={18} />
            </button>

            <div className="view-divider">
              <ArrowLeftRight size={16} />
            </div>

            <button
              className={`view-option ${isFlattened ? 'active' : ''}`}
              onClick={() => setIsFlattened(true)}
              aria-label="Grid View"
            >
              <Grid3x3 size={18} />
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedSkill && !isFlattened && (
            <motion.div
              className="skill-tooltip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {selectedSkill}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const SkillsGlobe = ({ skills, onSelect, isFlattened }) => {
  const groupRef = useRef();
  const wireframeRef = useRef();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.3, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const { gl } = useThree();

  // Sphere positions using Fibonacci sphere
  const spherePositions = useMemo(() => {
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const radius = 5;

    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      positions.push([x, y * radius, z]);
    }

    return positions;
  }, [skills.length]);

  // Grid positions for flattened state
  const gridPositions = useMemo(() => {
    const positions = [];
    const cols = 6;
    const spacing = 2.5;
    const rows = Math.ceil(skills.length / cols);
    const offsetX = ((cols - 1) * spacing) / 2;
    const offsetY = ((rows - 1) * spacing) / 2;

    skills.forEach((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      positions.push([
        col * spacing - offsetX,
        -row * spacing + offsetY,
        0
      ]);
    });

    return positions;
  }, [skills.length]);

  useFrame(() => {
    if (groupRef.current && !isFlattened) {
      if (!isDragging.current) {
        rotation.current.x += rotationVelocity.current.x;
        rotation.current.y += rotationVelocity.current.y;

        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;

        // Auto-rotate slowly
        rotation.current.y += 0.002;
      }

      groupRef.current.rotation.x = rotation.current.x;
      groupRef.current.rotation.y = rotation.current.y;
    } else if (groupRef.current && isFlattened) {
      // Reset rotation when flattened
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
    }

    // Fade wireframe when flattening
    if (wireframeRef.current) {
      const targetOpacity = isFlattened ? 0 : 0.15;
      wireframeRef.current.material.opacity = THREE.MathUtils.lerp(
        wireframeRef.current.material.opacity,
        targetOpacity,
        0.1
      );
    }
  });

  const handlePointerDown = (e) => {
    if (isFlattened) return;
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    if (isDragging.current && !isFlattened) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      rotation.current.y += deltaX * 0.01;
      rotation.current.x += deltaY * 0.01;

      rotationVelocity.current.x = deltaY * 0.001;
      rotationVelocity.current.y = deltaX * 0.001;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    gl.domElement.style.cursor = isFlattened ? 'default' : 'grab';
  };

  useEffect(() => {
    gl.domElement.style.cursor = isFlattened ? 'default' : 'grab';
  }, [isFlattened, gl]);

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Wireframe globe */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#DE6E4B"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Latitude/Longitude lines */}
      <mesh>
        <sphereGeometry args={[5.02, 16, 16]} />
        <meshBasicMaterial
          color="#DE6E4B"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          spherePosition={spherePositions[index]}
          gridPosition={gridPositions[index]}
          onSelect={onSelect}
          isFlattened={isFlattened}
          index={index}
        />
      ))}
    </group>
  );
};

const SkillNode = ({ skill, spherePosition, gridPosition, onSelect, isFlattened, index }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(...spherePosition));
  const initialPosition = useRef(new THREE.Vector3(
    spherePosition[0] * 2,
    spherePosition[1] * 2,
    spherePosition[2] * 2
  ));
  const hasAnimatedIn = useRef(false);
  const animationProgress = useRef(0);

  useEffect(() => {
    targetPosition.current.set(
      ...(isFlattened ? gridPosition : spherePosition)
    );
  }, [isFlattened, spherePosition, gridPosition]);

  useFrame(() => {
    if (meshRef.current) {
      // Initial animation
      if (!hasAnimatedIn.current && animationProgress.current < 1) {
        animationProgress.current += 0.02;
        const easedProgress = 1 - Math.pow(1 - animationProgress.current, 3);

        meshRef.current.position.lerpVectors(
          initialPosition.current,
          new THREE.Vector3(...spherePosition),
          easedProgress
        );

        if (animationProgress.current >= 1) {
          hasAnimatedIn.current = true;
        }
      } else {
        // Normal position interpolation after initial animation
        meshRef.current.position.lerp(targetPosition.current, 0.08);
      }

      // Scale on hover
      const targetScale = hovered && !isFlattened ? 1.4 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      );
    }
  });

  return (
    <group
      ref={meshRef}
      position={initialPosition.current}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isFlattened) {
          onSelect(skill.name);
          setTimeout(() => onSelect(null), 2000);
        }
      }}
    >
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={isFlattened ? 5 : 7}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          transition: 'all 0.3s',
          cursor: 'pointer',
        }}
      >
        <div className={`skill-logo-container ${isFlattened ? 'flattened-mode' : ''}`}>
          <img
            src={skill.logo}
            alt={skill.name}
            className="skill-logo-img"
            style={{ opacity: animationProgress.current }}
          />
          {(hovered || isFlattened) && (
            <div
              className="skill-name"
              style={{ opacity: animationProgress.current }}
            >
              {skill.name}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default Skills;
