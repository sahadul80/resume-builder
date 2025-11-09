'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiPrinter, FiEye, FiEdit3, FiLayout } from 'react-icons/fi';
import TemplateModern from './TemplateModern';
import TemplateProfessional from './TemplateProfessional';
import TemplateCreative from './TemplateCreative';
import ResumeForm from './ResumeForm';
import { ResumeData, TemplateStyle, ResumeDataSection, ResumeDataValue } from '../types/resume';

const initialResumeData: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    picture: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  hobbies: [],
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateStyle>('modern');
  const [isEditing, setIsEditing] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const templates: { id: TemplateStyle; name: string; description: string }[] = [
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary design with emphasis on visuals' },
    { id: 'professional', name: 'Professional', description: 'Traditional layout perfect for corporate roles' },
    { id: 'creative', name: 'Creative', description: 'Innovative design for creative and tech roles' },
  ];

  const updateResumeData = <T extends ResumeDataSection>(
    section: T, 
    data: ResumeDataValue<T>
  ) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      setIsGeneratingPDF(true);
      await downloadPDF(resumeRef.current, `${resumeData.personal.name || 'resume'}-${currentTemplate}`);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    const props = { resumeData };
    
    switch (currentTemplate) {
      case 'modern':
        return <TemplateModern {...props} />;
      case 'professional':
        return <TemplateProfessional {...props} />;
      case 'creative':
        return <TemplateCreative {...props} />;
      default:
        return <TemplateModern {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 print:py-0 print:bg-white">
      {/* Header Controls */}
      <div className="max-w-7xl mx-auto mb-8 print:hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
              <p className="text-gray-600">Create your perfect resume with our professional templates</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {isEditing ? <FiEye className="text-lg" /> : <FiEdit3 className="text-lg" />}
                {isEditing ? 'Preview' : 'Edit'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiDownload className="text-lg" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                <FiPrinter className="text-lg" />
                Print
              </motion.button>
            </div>
          </div>

          {/* Template Selector */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiLayout className="text-blue-600" />
              Choose Template
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentTemplate(template.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    currentTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      currentTemplate === template.id ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className={`font-semibold ${
                      currentTemplate === template.id ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {template.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Form Sidebar - Only show when editing */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="xl:col-span-4 print:hidden"
              >
                <ResumeForm
                  resumeData={resumeData}
                  onUpdate={updateResumeData}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resume Preview - Takes remaining space */}
          <div className={`${isEditing ? 'xl:col-span-8' : 'xl:col-span-12'}`}>
            <motion.div
              key={currentTemplate}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
              ref={resumeRef}
            >
              {renderTemplate()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* PDF Generation Overlay */}
      <AnimatePresence>
        {isGeneratingPDF && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Generating PDF
              </h3>
              <p className="text-gray-600">
                Please wait while we prepare your resume...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          
          body {
            background: white !important;
            color: black !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Mock PDF generator function (replace with your actual implementation)
const downloadPDF = async (element: HTMLElement, filename: string): Promise<void> => {
  // Your PDF generation logic here
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('PDF generated for:', filename);
      resolve();
    }, 2000);
  });
};