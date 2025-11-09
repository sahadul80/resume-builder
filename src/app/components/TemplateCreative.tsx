// components/templates/TemplateCreative.tsx
'use client';

import { ResumeData } from '../types/resume';

export default function TemplateCreative({ resumeData }: { resumeData: ResumeData }) {
  const { personal, experience, projects, skills, hobbies } = resumeData;

  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-indigo-50 to-cyan-50 p-8 print:p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full">
        {/* Creative Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
          <div className="flex items-center gap-6">
            {personal.picture && (
              <img
                src={personal.picture}
                alt={personal.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {personal.name || 'Your Name'}
              </h1>
              <p className="text-xl text-purple-100">
                {personal.title || 'Creative Professional'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* About */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                  About Me
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {personal.summary || 'Creative professional summary...'}
                </p>
              </section>

              {/* Experience */}
              {experience.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 text-sm">{exp.company} • {exp.period}</p>
                        <p className="text-gray-500 text-xs">{exp.location}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills */}
              {skills.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                    Skills
                  </h2>
                  <div className="space-y-4">
                    {skills.map((category) => (
                      <div key={category.category}>
                        <h3 className="font-semibold text-gray-700 mb-2">{category.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Hobbies */}
              {hobbies.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-pink-500 rounded-full"></div>
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 rounded-full text-sm"
                      >
                        {hobby.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}