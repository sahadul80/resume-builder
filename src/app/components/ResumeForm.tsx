// components/ResumeForm.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiBriefcase, FiBook, FiCode, FiAward, 
  FiGlobe, FiHeart, FiUsers, FiPlus, FiTrash2, FiUpload 
} from 'react-icons/fi';
import { ResumeData, PersonalInfo, Education, Experience, Project, SkillCategory, Language, Certification, Hobby } from '../types/resume';

interface ResumeFormProps {
  resumeData: ResumeData;
  onUpdate: (section: keyof ResumeData, data: any) => void;
}

export default function ResumeForm({ resumeData, onUpdate }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: FiUser },
    { id: 'education', name: 'Education', icon: FiBook },
    { id: 'experience', name: 'Experience', icon: FiBriefcase },
    { id: 'projects', name: 'Projects', icon: FiCode },
    { id: 'skills', name: 'Skills', icon: FiAward },
    { id: 'languages', name: 'Languages', icon: FiGlobe },
    { id: 'certifications', name: 'Certifications', icon: FiAward },
    { id: 'hobbies', name: 'Hobbies', icon: FiHeart },
    { id: 'references', name: 'References', icon: FiUsers },
  ];

  const updatePersonal = (field: keyof PersonalInfo, value: string) => {
    onUpdate('personal', {
      ...resumeData.personal,
      [field]: value
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePersonal('picture', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      period: '',
      location: '',
      gpa: '',
      achievements: [],
      courses: []
    };
    onUpdate('education', [...resumeData.education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate('education', updated);
  };

  const removeEducation = (id: string) => {
    onUpdate('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const addArrayItem = (field: keyof Education, id: string, value: string) => {
    const education = resumeData.education.find(edu => edu.id === id);
    if (education && (field === 'achievements' || field === 'courses')) {
      const updatedArray = [...(education[field] || []), value];
      updateEducation(id, field, updatedArray);
    }
  };

  const removeArrayItem = (field: keyof Education, id: string, index: number) => {
    const education = resumeData.education.find(edu => edu.id === id);
    if (education && (field === 'achievements' || field === 'courses')) {
      const updatedArray = education[field]?.filter((_, i) => i !== index) || [];
      updateEducation(id, field, updatedArray);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm data={resumeData.personal} onChange={updatePersonal} onImageUpload={handleImageUpload} />;
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
            onAddArrayItem={addArrayItem}
            onRemoveArrayItem={removeArrayItem}
          />
        );
      // Add other sections similarly...
      default:
        return <div>Section coming soon...</div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg h-fit sticky top-8">
      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <div className="p-4 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
}

// Personal Form Component
function PersonalForm({ 
  data, 
  onChange, 
  onImageUpload 
}: { 
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          {data.picture ? (
            <img
              src={data.picture}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <FiUpload className="w-4 h-4" />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Senior Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={data.website || ''}
            onChange={(e) => onChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={data.linkedin || ''}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Passionate software engineer with 5+ years of experience..."
        />
      </div>
    </motion.div>
  );
}

// Education Form Component
function EducationForm({
  education,
  onAdd,
  onUpdate,
  onRemove,
  onAddArrayItem,
  onRemoveArrayItem
}: {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, value: any) => void;
  onRemove: (id: string) => void;
  onAddArrayItem: (field: keyof Education, id: string, value: string) => void;
  onRemoveArrayItem: (field: keyof Education, id: string, index: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <AnimatePresence>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Education #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(edu.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period *
                </label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => onUpdate(edu.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="2015 - 2019"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => onUpdate(edu.id, 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA
              </label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => onUpdate(edu.id, 'gpa', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="3.8/4.0"
              />
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements & Awards
              </label>
              <div className="space-y-2">
                {edu.achievements?.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const updated = [...(edu.achievements || [])];
                        updated[achievementIndex] = e.target.value;
                        onUpdate(edu.id, 'achievements', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Dean's List, Scholarship, etc."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('achievements', edu.id, achievementIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('achievements', edu.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>
            </div>

            {/* Relevant Courses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Courses
              </label>
              <div className="space-y-2">
                {edu.courses?.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => {
                        const updated = [...(edu.courses || [])];
                        updated[courseIndex] = e.target.value;
                        onUpdate(edu.id, 'courses', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Data Structures, Algorithms, etc."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('courses', edu.id, courseIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('courses', edu.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Course
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {education.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No education added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first education entry
          </button>
        </div>
      )}
    </div>
  );
}