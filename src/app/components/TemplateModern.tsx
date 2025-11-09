// components/templates/TemplateModern.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, 
  FiGithub, FiAward, FiBriefcase, FiBook, FiCode 
} from 'react-icons/fi';
import { ResumeData } from '../types/resume';

interface TemplateModernProps {
  resumeData: ResumeData;
}

export default function TemplateModern({ resumeData }: TemplateModernProps) {
  const { personal, education, experience, projects, skills, languages, certifications, hobbies } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[297mm] bg-white print:min-h-0"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 print:p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-6">
              {personal.picture && (
                <img
                  src={personal.picture}
                  alt={personal.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                />
              )}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {personal.name || 'Your Name'}
                </h1>
                <p className="text-xl text-blue-100 mb-4">
                  {personal.title || 'Professional Title'}
                </p>
              </div>
            </div>
            <p className="text-blue-100 max-w-2xl leading-relaxed">
              {personal.summary || 'Professional summary goes here...'}
            </p>
          </div>
          
          <motion.div 
            className="flex flex-col gap-3 text-blue-100"
            variants={itemVariants}
          >
            {personal.email && (
              <div className="flex items-center gap-3">
                <FiMail className="text-lg" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-3">
                <FiPhone className="text-lg" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-3">
                <FiMapPin className="text-lg" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-3">
                <FiGlobe className="text-lg" />
                <span>{personal.website}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-3">
                <FiLinkedin className="text-lg" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-3">
                <FiGithub className="text-lg" />
                <span>{personal.github}</span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 print:p-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <FiBriefcase className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              
              <div className="space-y-6">
                {experience.map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    className="border-l-4 border-blue-500 pl-6 py-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <p className="text-gray-600 font-medium">{exp.period}</p>
                        <p className="text-gray-500 text-sm">{exp.location}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <span className="text-blue-500 mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <FiCode className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              </div>
              
              <div className="grid gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 transition-colors print:hidden"
                        >
                          <FiGlobe className="text-lg" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <FiBook className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              </div>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div
                    key={edu.id}
                    variants={itemVariants}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 mb-1">{edu.institution}</p>
                    <p className="text-gray-600 text-sm mb-1">{edu.period}</p>
                    <p className="text-gray-500 text-sm">{edu.location}</p>
                    {edu.gpa && (
                      <p className="text-gray-500 text-sm mt-1">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <FiAward className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
              </div>
              
              <div className="space-y-6">
                {skills.map((skillCategory) => (
                  <div key={skillCategory.category}>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {skillCategory.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <motion.section variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-500 text-sm">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <motion.section variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-3">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {hobby.name}
                  </span>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </motion.div>
  );
}