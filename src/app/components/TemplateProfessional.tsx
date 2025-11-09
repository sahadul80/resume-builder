// components/templates/TemplateProfessional.tsx
'use client';

import { ResumeData } from '../types/resume';

export default function TemplateProfessional({ resumeData }: { resumeData: ResumeData }) {
  const { personal, education, experience, skills } = resumeData;

  return (
    <div className="min-h-[297mm] bg-white p-12 print:p-8 font-serif">
      {/* Professional Header */}
      <div className="text-center border-b-2 border-gray-300 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personal.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {personal.title || 'Professional Title'}
        </p>
        <div className="flex justify-center gap-6 text-gray-500 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Experience - Professional Style */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{exp.period}</p>
                        <p className="text-gray-500 text-sm">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.period}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                SKILLS
              </h2>
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.category}</h3>
                    <p className="text-gray-600">{category.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}