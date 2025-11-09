'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiBriefcase, FiBook, FiCode, FiAward, 
  FiGlobe, FiHeart, FiUsers, FiPlus, FiTrash2, FiUpload,
  FiGithub, FiExternalLink
} from 'react-icons/fi';
import { 
  ResumeData, 
  PersonalInfo, 
  Education, 
  Experience, 
  Project, 
  SkillCategory, 
  Language, 
  Certification, 
  Hobby,
  ResumeDataSection,
  ResumeDataValue
} from '../types/resume';

interface ResumeFormProps {
  resumeData: ResumeData;
  onUpdate: <T extends ResumeDataSection>(section: T, data: ResumeDataValue<T>) => void;
}

type EducationArrayField = 'achievements' | 'courses';
type ExperienceArrayField = 'description' | 'technologies' | 'achievements';
type ProjectArrayField = 'technologies' | 'highlights';

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

  // Personal Info Handlers
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

  // Education Handlers
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

  const updateEducation = (id: string, field: keyof Education, value: string | string[]) => {
    const updated = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate('education', updated);
  };

  const removeEducation = (id: string) => {
    onUpdate('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const addEducationArrayItem = (field: EducationArrayField, id: string, value: string) => {
    const education = resumeData.education.find(edu => edu.id === id);
    if (education) {
      const currentArray = education[field] || [];
      const updatedArray = [...currentArray, value];
      updateEducation(id, field, updatedArray);
    }
  };

  const removeEducationArrayItem = (field: EducationArrayField, id: string, index: number) => {
    const education = resumeData.education.find(edu => edu.id === id);
    if (education) {
      const currentArray = education[field] || [];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      updateEducation(id, field, updatedArray);
    }
  };

  // Experience Handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      location: '',
      description: [],
      technologies: [],
      achievements: []
    };
    onUpdate('experience', [...resumeData.experience, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    const updated = resumeData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate('experience', updated);
  };

  const removeExperience = (id: string) => {
    onUpdate('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const addExperienceArrayItem = (field: ExperienceArrayField, id: string, value: string) => {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      const currentArray = experience[field] || [];
      const updatedArray = [...currentArray, value];
      updateExperience(id, field, updatedArray);
    }
  };

  const removeExperienceArrayItem = (field: ExperienceArrayField, id: string, index: number) => {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      const currentArray = experience[field] || [];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      updateExperience(id, field, updatedArray);
    }
  };

  // Projects Handlers
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      highlights: []
    };
    onUpdate('projects', [...resumeData.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    const updated = resumeData.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onUpdate('projects', updated);
  };

  const removeProject = (id: string) => {
    onUpdate('projects', resumeData.projects.filter(proj => proj.id !== id));
  };

  const addProjectArrayItem = (field: ProjectArrayField, id: string, value: string) => {
    const project = resumeData.projects.find(proj => proj.id === id);
    if (project) {
      const currentArray = project[field] || [];
      const updatedArray = [...currentArray, value];
      updateProject(id, field, updatedArray);
    }
  };

  const removeProjectArrayItem = (field: ProjectArrayField, id: string, index: number) => {
    const project = resumeData.projects.find(proj => proj.id === id);
    if (project) {
      const currentArray = project[field] || [];
      const updatedArray = currentArray.filter((_, i) => i !== index);
      updateProject(id, field, updatedArray);
    }
  };

  // Skills Handlers
  const addSkillCategory = () => {
    const newSkillCategory: SkillCategory = {
      category: '',
      items: []
    };
    onUpdate('skills', [...resumeData.skills, newSkillCategory]);
  };

  const updateSkillCategory = (index: number, field: keyof SkillCategory, value: string | string[]) => {
    const updated = resumeData.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    onUpdate('skills', updated);
  };

  const removeSkillCategory = (index: number) => {
    onUpdate('skills', resumeData.skills.filter((_, i) => i !== index));
  };

  const addSkillItem = (categoryIndex: number, value: string) => {
    const category = resumeData.skills[categoryIndex];
    if (category) {
      const updatedItems = [...category.items, value];
      updateSkillCategory(categoryIndex, 'items', updatedItems);
    }
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const category = resumeData.skills[categoryIndex];
    if (category) {
      const updatedItems = category.items.filter((_, i) => i !== itemIndex);
      updateSkillCategory(categoryIndex, 'items', updatedItems);
    }
  };

  // Languages Handlers
  const addLanguage = () => {
    const newLanguage: Language = {
      language: '',
      proficiency: 'Basic'
    };
    onUpdate('languages', [...resumeData.languages, newLanguage]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = resumeData.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    onUpdate('languages', updated);
  };

  const removeLanguage = (index: number) => {
    onUpdate('languages', resumeData.languages.filter((_, i) => i !== index));
  };

  // Certifications Handlers
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    onUpdate('certifications', [...resumeData.certifications, newCertification]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updated = resumeData.certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onUpdate('certifications', updated);
  };

  const removeCertification = (id: string) => {
    onUpdate('certifications', resumeData.certifications.filter(cert => cert.id !== id));
  };

  // Hobbies Handlers
  const addHobby = () => {
    const newHobby: Hobby = {
      name: '',
      description: ''
    };
    onUpdate('hobbies', [...resumeData.hobbies, newHobby]);
  };

  const updateHobby = (index: number, field: keyof Hobby, value: string) => {
    const updated = resumeData.hobbies.map((hobby, i) =>
      i === index ? { ...hobby, [field]: value } : hobby
    );
    onUpdate('hobbies', updated);
  };

  const removeHobby = (index: number) => {
    onUpdate('hobbies', resumeData.hobbies.filter((_, i) => i !== index));
  };

  // References Handlers
  const updateReferences = (references: string[]) => {
    onUpdate('references', references);
  };

  const addReference = () => {
    const currentReferences = resumeData.references || [];
    updateReferences([...currentReferences, '']);
  };

  const updateReference = (index: number, value: string) => {
    const currentReferences = resumeData.references || [];
    const updated = currentReferences.map((ref, i) => i === index ? value : ref);
    updateReferences(updated);
  };

  const removeReference = (index: number) => {
    const currentReferences = resumeData.references || [];
    const updated = currentReferences.filter((_, i) => i !== index);
    updateReferences(updated);
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
            onAddArrayItem={addEducationArrayItem}
            onRemoveArrayItem={removeEducationArrayItem}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={resumeData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
            onAddArrayItem={addExperienceArrayItem}
            onRemoveArrayItem={removeExperienceArrayItem}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onRemove={removeProject}
            onAddArrayItem={addProjectArrayItem}
            onRemoveArrayItem={removeProjectArrayItem}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={resumeData.skills}
            onAddCategory={addSkillCategory}
            onUpdateCategory={updateSkillCategory}
            onRemoveCategory={removeSkillCategory}
            onAddItem={addSkillItem}
            onRemoveItem={removeSkillItem}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            languages={resumeData.languages}
            onAdd={addLanguage}
            onUpdate={updateLanguage}
            onRemove={removeLanguage}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            certifications={resumeData.certifications}
            onAdd={addCertification}
            onUpdate={updateCertification}
            onRemove={removeCertification}
          />
        );
      case 'hobbies':
        return (
          <HobbiesForm
            hobbies={resumeData.hobbies}
            onAdd={addHobby}
            onUpdate={updateHobby}
            onRemove={removeHobby}
          />
        );
      case 'references':
        return (
          <ReferencesForm
            references={resumeData.references || []}
            onAdd={addReference}
            onUpdate={updateReference}
            onRemove={removeReference}
          />
        );
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
interface PersonalFormProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PersonalForm({ data, onChange, onImageUpload }: PersonalFormProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={data.github || ''}
            onChange={(e) => onChange('github', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://github.com/username"
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
interface EducationFormProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, value: string | string[]) => void;
  onRemove: (id: string) => void;
  onAddArrayItem: (field: EducationArrayField, id: string, value: string) => void;
  onRemoveArrayItem: (field: EducationArrayField, id: string, index: number) => void;
}

function EducationForm({
  education,
  onAdd,
  onUpdate,
  onRemove,
  onAddArrayItem,
  onRemoveArrayItem
}: EducationFormProps) {
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

// Experience Form Component
interface ExperienceFormProps {
  experience: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Experience, value: string | string[]) => void;
  onRemove: (id: string) => void;
  onAddArrayItem: (field: ExperienceArrayField, id: string, value: string) => void;
  onRemoveArrayItem: (field: ExperienceArrayField, id: string, index: number) => void;
}

function ExperienceForm({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onAddArrayItem,
  onRemoveArrayItem
}: ExperienceFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <AnimatePresence>
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Experience #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(exp.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Job Title"
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
                  value={exp.period}
                  onChange={(e) => onUpdate(exp.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Jan 2020 - Present"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => onUpdate(exp.id, 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description & Responsibilities
              </label>
              <div className="space-y-2">
                {exp.description?.map((desc, descIndex) => (
                  <div key={descIndex} className="flex items-center gap-2">
                    <textarea
                      value={desc}
                      onChange={(e) => {
                        const updated = [...(exp.description || [])];
                        updated[descIndex] = e.target.value;
                        onUpdate(exp.id, 'description', updated);
                      }}
                      rows={2}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('description', exp.id, descIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('description', exp.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Description
                </button>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <div className="space-y-2">
                {exp.technologies?.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const updated = [...(exp.technologies || [])];
                        updated[techIndex] = e.target.value;
                        onUpdate(exp.id, 'technologies', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="React, Node.js, TypeScript, etc."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('technologies', exp.id, techIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('technologies', exp.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Technology
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements
              </label>
              <div className="space-y-2">
                {exp.achievements?.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const updated = [...(exp.achievements || [])];
                        updated[achievementIndex] = e.target.value;
                        onUpdate(exp.id, 'achievements', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Specific accomplishments and results..."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('achievements', exp.id, achievementIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('achievements', exp.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {experience.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No work experience added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first work experience
          </button>
        </div>
      )}
    </div>
  );
}

// Projects Form Component
interface ProjectsFormProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Project, value: string | string[]) => void;
  onRemove: (id: string) => void;
  onAddArrayItem: (field: ProjectArrayField, id: string, value: string) => void;
  onRemoveArrayItem: (field: ProjectArrayField, id: string, index: number) => void;
}

function ProjectsForm({
  projects,
  onAdd,
  onUpdate,
  onRemove,
  onAddArrayItem,
  onRemoveArrayItem
}: ProjectsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Project #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(project.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onUpdate(project.id, 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Project Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={project.description}
                onChange={(e) => onUpdate(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Brief description of the project..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Link
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => onUpdate(project.id, 'link', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://project-url.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <input
                  type="text"
                  value={project.period || ''}
                  onChange={(e) => onUpdate(project.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Jan 2023 - Mar 2023"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={project.role || ''}
                onChange={(e) => onUpdate(project.id, 'role', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Full-stack Developer, Project Lead, etc."
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <div className="space-y-2">
                {project.technologies?.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const updated = [...(project.technologies || [])];
                        updated[techIndex] = e.target.value;
                        onUpdate(project.id, 'technologies', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('technologies', project.id, techIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('technologies', project.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Technology
                </button>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Features & Highlights
              </label>
              <div className="space-y-2">
                {project.highlights?.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const updated = [...(project.highlights || [])];
                        updated[highlightIndex] = e.target.value;
                        onUpdate(project.id, 'highlights', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Specific features or accomplishments..."
                    />
                    <button
                      onClick={() => onRemoveArrayItem('highlights', project.id, highlightIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddArrayItem('highlights', project.id, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Highlight
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {projects.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first project
          </button>
        </div>
      )}
    </div>
  );
}

// Skills Form Component
interface SkillsFormProps {
  skills: SkillCategory[];
  onAddCategory: () => void;
  onUpdateCategory: (index: number, field: keyof SkillCategory, value: string | string[]) => void;
  onRemoveCategory: (index: number) => void;
  onAddItem: (categoryIndex: number, value: string) => void;
  onRemoveItem: (categoryIndex: number, itemIndex: number) => void;
}

function SkillsForm({
  skills,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
  onAddItem,
  onRemoveItem
}: SkillsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={onAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Skill Category
        </button>
      </div>

      <AnimatePresence>
        {skills.map((skillCategory, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Skill Category #{categoryIndex + 1}
              </h4>
              <button
                onClick={() => onRemoveCategory(categoryIndex)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={skillCategory.category}
                onChange={(e) => onUpdateCategory(categoryIndex, 'category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Programming Languages, Tools, Frameworks, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Level
              </label>
              <select
                value={skillCategory.proficiency || ''}
                onChange={(e) => onUpdateCategory(categoryIndex, 'proficiency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select proficiency level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <div className="space-y-2">
                {skillCategory.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...skillCategory.items];
                        updated[itemIndex] = e.target.value;
                        onUpdateCategory(categoryIndex, 'items', updated);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="JavaScript, React, Python, etc."
                    />
                    <button
                      onClick={() => onRemoveItem(categoryIndex, itemIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddItem(categoryIndex, '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {skills.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No skill categories added yet</p>
          <button
            onClick={onAddCategory}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first skill category
          </button>
        </div>
      )}
    </div>
  );
}

// Languages Form Component
interface LanguagesFormProps {
  languages: Language[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof Language, value: string) => void;
  onRemove: (index: number) => void;
}

function LanguagesForm({
  languages,
  onAdd,
  onUpdate,
  onRemove
}: LanguagesFormProps) {
  const proficiencyOptions: Language['proficiency'][] = [
    'Basic',
    'Conversational',
    'Professional',
    'Native'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      <AnimatePresence>
        {languages.map((language, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Language #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language *
                </label>
                <input
                  type="text"
                  value={language.language}
                  onChange={(e) => onUpdate(index, 'language', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="English, Spanish, French, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency *
                </label>
                <select
                  value={language.proficiency}
                  onChange={(e) => onUpdate(index, 'proficiency', e.target.value as Language['proficiency'])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {proficiencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {languages.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiGlobe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No languages added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first language
          </button>
        </div>
      )}
    </div>
  );
}

// Certifications Form Component
interface CertificationsFormProps {
  certifications: Certification[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Certification, value: string) => void;
  onRemove: (id: string) => void;
}

function CertificationsForm({
  certifications,
  onAdd,
  onUpdate,
  onRemove
}: CertificationsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      <AnimatePresence>
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Certification #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(cert.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification Name *
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => onUpdate(cert.id, 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => onUpdate(cert.id, 'issuer', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Issued *
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => onUpdate(cert.id, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Jan 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate URL
                </label>
                <input
                  type="url"
                  value={cert.url || ''}
                  onChange={(e) => onUpdate(cert.id, 'url', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://credential-url.com"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {certifications.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No certifications added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first certification
          </button>
        </div>
      )}
    </div>
  );
}

// Hobbies Form Component
interface HobbiesFormProps {
  hobbies: Hobby[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof Hobby, value: string) => void;
  onRemove: (index: number) => void;
}

function HobbiesForm({
  hobbies,
  onAdd,
  onUpdate,
  onRemove
}: HobbiesFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Hobbies & Interests</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Hobby
        </button>
      </div>

      <AnimatePresence>
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Hobby #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hobby Name *
              </label>
              <input
                type="text"
                value={hobby.name}
                onChange={(e) => onUpdate(index, 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Photography, Hiking, Reading, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={hobby.description || ''}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Brief description of your interest in this hobby..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon Name (Optional)
              </label>
              <input
                type="text"
                value={hobby.icon || ''}
                onChange={(e) => onUpdate(index, 'icon', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="camera, book, music, etc."
              />
              <p className="text-sm text-gray-500 mt-1">
                Use simple icon names that might be available in icon libraries
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {hobbies.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No hobbies added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first hobby
          </button>
        </div>
      )}
    </div>
  );
}

// References Form Component
interface ReferencesFormProps {
  references: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

function ReferencesForm({
  references,
  onAdd,
  onUpdate,
  onRemove
}: ReferencesFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">References</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Reference
        </button>
      </div>

      <AnimatePresence>
        {references.map((reference, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">
                Reference #{index + 1}
              </h4>
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Details *
              </label>
              <textarea
                value={reference}
                onChange={(e) => onUpdate(index, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Name, Position, Company, Email, Phone...
Example: 
John Smith
Senior Manager at ABC Company
john.smith@email.com
+1 (555) 123-4567"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {references.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No references added yet</p>
          <button
            onClick={onAdd}
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first reference
          </button>
        </div>
      )}
    </div>
  );
}