'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Shield,
  FileText,
  User,
  Activity
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface AssessmentData {
  personalInfo: {
    role: string;
    industry: string;
    companySize: string;
    experience: string;
  };
  aiExperience: {
    currentTools: string[];
    usageFrequency: string;
    challenges: string[];
    previousTraining: string;
  };
  goals: {
    objectives: string[];
    timeline: string;
    commitment: string;
  };
  consent: {
    understoodTerms: boolean;
    contactEmail: string;
    contactPhone: string;
  };
}

export default function AIReadinessAssessment() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: {
      role: '',
      industry: '',
      companySize: '',
      experience: ''
    },
    aiExperience: {
      currentTools: [],
      usageFrequency: '',
      challenges: [],
      previousTraining: ''
    },
    goals: {
      objectives: [],
      timeline: '',
      commitment: ''
    },
    consent: {
      understoodTerms: false,
      contactEmail: '',
      contactPhone: ''
    }
  });

  const totalSteps = 4;

  const aiTools = [
    'ยังไม่เคยใช้เครื่องมือ AI',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Midjourney / DALL-E',
    'Copilot',
    'Make / Zapier',
    'อื่นๆ'
  ];

  const challenges = [
    'ไม่รู้จะเริ่มต้นอย่างไร',
    'ใช้ AI แล้วได้ผลลัพธ์ไม่ตรงใจ',
    'ไม่รู้จะนำ AI ไปใช้กับงานอย่างไร',
    'กังวลเรื่องความปลอดภัยข้อมูล',
    'ทีมงานไม่พร้อมรับ AI',
    'งบประมาณจำกัด',
    'ไม่มีเวลาเรียนรู้',
    'อื่นๆ'
  ];

  const objectives = [
    'ใช้ AI เพิ่มประสิทธิภาพการทำงาน',
    'สร้างธุรกิจใหม่ด้วย AI',
    'นำ AI เข้าองค์กร',
    'สร้างคอนเทนต์ด้วย AI',
    'ทำ AI Automation ลดงานซ้ำซ้อน',
    'วิเคราะห์ข้อมูลด้วย AI',
    'พัฒนาทักษะ Prompt Engineering',
    'เตรียมพร้อมสำหรับอนาคต'
  ];

  const handleInputChange = (section: keyof AssessmentData, field: string, value: string | boolean | string[]) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section: keyof AssessmentData, field: string, value: string) => {
    setAssessmentData(prev => {
      const sectionData = prev[section] as Record<string, unknown>;
      const currentArray = (sectionData[field] as string[]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return assessmentData.personalInfo.role &&
               assessmentData.personalInfo.industry &&
               assessmentData.personalInfo.experience;
      case 2:
        return assessmentData.aiExperience.currentTools.length > 0 &&
               assessmentData.aiExperience.usageFrequency;
      case 3:
        return assessmentData.goals.objectives.length > 0 &&
               assessmentData.goals.commitment;
      case 4:
        return assessmentData.consent.understoodTerms &&
               assessmentData.consent.contactEmail;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    router.push(`/courses/${courseId}`);
  };

  const getReadinessLevel = () => {
    let score = 0;

    // AI experience
    if (assessmentData.aiExperience.currentTools.length > 3) score += 2;
    else if (assessmentData.aiExperience.currentTools.length > 1) score += 1;

    // Usage frequency
    if (assessmentData.aiExperience.usageFrequency === 'daily') score += 2;
    else if (assessmentData.aiExperience.usageFrequency === 'weekly') score += 1;

    // Previous training
    if (assessmentData.aiExperience.previousTraining === 'certified') score += 2;
    else if (assessmentData.aiExperience.previousTraining === 'self-taught') score += 1;

    // Goals clarity
    if (assessmentData.goals.objectives.length > 3) score += 1;

    if (score >= 5) return 'advanced';
    if (score >= 2) return 'intermediate';
    return 'beginner';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-mint-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-mint-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">ข้อมูลทั่วไป</h2>
              <p className="text-gray-400">เพื่อให้เราแนะนำเส้นทางการเรียน AI ที่เหมาะกับคุณ</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                บทบาทของคุณ *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['เจ้าของธุรกิจ / ผู้ประกอบการ', 'ผู้บริหาร / Manager', 'พนักงานบริษัท', 'ฟรีแลนซ์ / ครีเอเตอร์'].map((role) => (
                  <label key={role} className="flex items-center p-4 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/20 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={assessmentData.personalInfo.role === role}
                      onChange={(e) => handleInputChange('personalInfo', 'role', e.target.value)}
                      className="h-4 w-4 text-mint-600"
                    />
                    <span className="ml-3 text-gray-400">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                อุตสาหกรรม / สายงาน *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['การตลาด / โฆษณา', 'เทคโนโลยี / IT', 'การเงิน / บัญชี', 'ค้าปลีก / E-Commerce', 'การศึกษา', 'อื่นๆ'].map((industry) => (
                  <label key={industry} className="flex items-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="industry"
                      value={industry}
                      checked={assessmentData.personalInfo.industry === industry}
                      onChange={(e) => handleInputChange('personalInfo', 'industry', e.target.value)}
                      className="h-4 w-4 text-mint-400"
                    />
                    <span className="ml-2 text-sm text-gray-400">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                ประสบการณ์ทำงาน *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['0-2 ปี', '3-5 ปี', '6-10 ปี', '10+ ปี'].map((exp) => (
                  <label key={exp} className="flex items-center justify-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="experience"
                      value={exp}
                      checked={assessmentData.personalInfo.experience === exp}
                      onChange={(e) => handleInputChange('personalInfo', 'experience', e.target.value)}
                      className="h-4 w-4 text-mint-400 mr-2"
                    />
                    <span className="text-gray-400">{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                ขนาดองค์กร
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1 คน (Solo)', '2-10 คน', '11-50 คน', '50+ คน'].map((size) => (
                  <label key={size} className="flex items-center justify-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="companySize"
                      value={size}
                      checked={assessmentData.personalInfo.companySize === size}
                      onChange={(e) => handleInputChange('personalInfo', 'companySize', e.target.value)}
                      className="h-4 w-4 text-mint-400 mr-2"
                    />
                    <span className="text-sm text-gray-400">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-mint-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">ประสบการณ์ด้าน AI</h2>
              <p className="text-gray-400">ช่วยให้เราเข้าใจระดับความรู้ AI ของคุณ</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                เครื่องมือ AI ที่คุณเคยใช้ *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aiTools.map((tool) => (
                  <label key={tool} className={`flex items-center p-3 border rounded-sm cursor-pointer transition-colors ${
                    assessmentData.aiExperience.currentTools.includes(tool)
                      ? 'border-mint-600 bg-mint-900/50'
                      : 'border-gray-700 hover:bg-gray-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.aiExperience.currentTools.includes(tool)}
                      onChange={() => handleArrayToggle('aiExperience', 'currentTools', tool)}
                      className="h-4 w-4 text-mint-400"
                    />
                    <span className="ml-3 text-sm text-gray-400">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                ความถี่ในการใช้ AI *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'never', label: 'ยังไม่เคยใช้' },
                  { value: 'rarely', label: 'นานๆ ครั้ง' },
                  { value: 'weekly', label: 'ทุกสัปดาห์' },
                  { value: 'daily', label: 'ทุกวัน' }
                ].map((freq) => (
                  <label key={freq.value} className="flex items-center justify-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="usageFrequency"
                      value={freq.value}
                      checked={assessmentData.aiExperience.usageFrequency === freq.value}
                      onChange={(e) => handleInputChange('aiExperience', 'usageFrequency', e.target.value)}
                      className="h-4 w-4 text-mint-400 mr-2"
                    />
                    <span className="text-sm text-gray-400">{freq.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                ปัญหาที่เจอในการใช้ AI
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenges.map((challenge) => (
                  <label key={challenge} className={`flex items-center p-3 border rounded-sm cursor-pointer transition-colors ${
                    assessmentData.aiExperience.challenges.includes(challenge)
                      ? 'border-mint-600 bg-mint-900/50'
                      : 'border-gray-700 hover:bg-gray-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.aiExperience.challenges.includes(challenge)}
                      onChange={() => handleArrayToggle('aiExperience', 'challenges', challenge)}
                      className="h-4 w-4 text-mint-400"
                    />
                    <span className="ml-3 text-sm text-gray-400">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                การเรียนรู้ AI ที่ผ่านมา
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'none', label: 'ยังไม่เคยเรียน' },
                  { value: 'self-taught', label: 'ศึกษาด้วยตัวเอง (YouTube, บทความ)' },
                  { value: 'workshop', label: 'เคยเข้า Workshop / สัมมนา' },
                  { value: 'certified', label: 'เรียนคอร์สออนไลน์ / มี Certificate' }
                ].map((training) => (
                  <label key={training.value} className="flex items-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="previousTraining"
                      value={training.value}
                      checked={assessmentData.aiExperience.previousTraining === training.value}
                      onChange={(e) => handleInputChange('aiExperience', 'previousTraining', e.target.value)}
                      className="h-4 w-4 text-mint-400"
                    />
                    <span className="ml-3 text-sm text-gray-400">{training.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-mint-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-mint-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">เป้าหมายการเรียนรู้</h2>
              <p className="text-gray-400">บอกเราว่าคุณอยากทำอะไรกับ AI</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                สิ่งที่คุณอยากทำได้ด้วย AI *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {objectives.map((objective) => (
                  <label key={objective} className={`flex items-center p-3 border rounded-sm cursor-pointer transition-colors ${
                    assessmentData.goals.objectives.includes(objective)
                      ? 'border-mint-600 bg-mint-900/50'
                      : 'border-gray-700 hover:bg-gray-800/50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.goals.objectives.includes(objective)}
                      onChange={() => handleArrayToggle('goals', 'objectives', objective)}
                      className="h-4 w-4 text-mint-400"
                    />
                    <span className="ml-3 text-sm text-gray-400">{objective}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                ระยะเวลาที่คุณตั้งเป้าจะนำ AI ไปใช้จริง
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['ภายใน 1 เดือน', '1-3 เดือน', '3-6 เดือน', '6+ เดือน'].map((timeline) => (
                  <label key={timeline} className="flex items-center justify-center p-3 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="timeline"
                      value={timeline}
                      checked={assessmentData.goals.timeline === timeline}
                      onChange={(e) => handleInputChange('goals', 'timeline', e.target.value)}
                      className="h-4 w-4 text-mint-400 mr-2"
                    />
                    <span className="text-sm text-gray-400">{timeline}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                เวลาที่คุณสามารถจัดสรรให้กับการเรียน *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'minimal', label: '30 นาที/สัปดาห์', desc: 'เรียนตามสะดวก ทีละนิด' },
                  { value: 'moderate', label: '1-3 ชั่วโมง/สัปดาห์', desc: 'เรียนสม่ำเสมอ ลงมือทำตาม' },
                  { value: 'dedicated', label: '3-5 ชั่วโมง/สัปดาห์', desc: 'เรียนจริงจัง ทำโปรเจกต์จริง' },
                  { value: 'intensive', label: '5+ ชั่วโมง/สัปดาห์', desc: 'เร่งเรียนเต็มที่ ต้องการผลลัพธ์เร็ว' }
                ].map((level) => (
                  <label key={level.value} className="flex items-start p-4 border border-gray-700 rounded-sm cursor-pointer hover:bg-mint-900/50 transition-colors">
                    <input
                      type="radio"
                      name="commitment"
                      value={level.value}
                      checked={assessmentData.goals.commitment === level.value}
                      onChange={(e) => handleInputChange('goals', 'commitment', e.target.value)}
                      className="h-4 w-4 text-mint-400 mt-1"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-100">{level.label}</div>
                      <div className="text-sm text-gray-400">{level.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        const readinessLevel = getReadinessLevel();
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${
                readinessLevel === 'advanced' ? 'bg-mint-900/50' : readinessLevel === 'intermediate' ? 'bg-gray-800' : 'bg-mint-900/50'
              }`}>
                <Shield className={`h-8 w-8 ${
                  readinessLevel === 'advanced' ? 'text-mint-400' : readinessLevel === 'intermediate' ? 'text-mint-400' : 'text-mint-400'
                }`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">ผลประเมิน AI Readiness</h2>
              <p className="text-gray-400">ระดับความพร้อมด้าน AI ของคุณ</p>
            </div>

            {/* Readiness Assessment Result */}
            <div className={`p-6 rounded-sm border-2 ${
              readinessLevel === 'advanced' ? 'bg-mint-900/50 border-mint-700' :
              readinessLevel === 'intermediate' ? 'bg-gray-800 border-gray-600' :
              'bg-mint-900/50 border-mint-700'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className={`h-6 w-6 ${
                  readinessLevel === 'advanced' ? 'text-mint-400' : readinessLevel === 'intermediate' ? 'text-mint-400' : 'text-mint-400'
                }`} />
                <h3 className={`text-lg font-semibold ${
                  readinessLevel === 'advanced' ? 'text-mint-300' : readinessLevel === 'intermediate' ? 'text-mint-300' : 'text-mint-300'
                }`}>
                  ระดับ: {readinessLevel === 'advanced' ? 'ขั้นสูง (Advanced)' : readinessLevel === 'intermediate' ? 'ระดับกลาง (Intermediate)' : 'เริ่มต้น (Beginner)'}
                </h3>
              </div>

              {readinessLevel === 'beginner' && (
                <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-4 mb-4">
                  <p className="text-mint-300">
                    คอร์สนี้เหมาะกับคุณมาก! เราจะพาคุณเริ่มต้นจากพื้นฐาน AI ทีละขั้นตอน พร้อมตัวอย่างจริงที่นำไปใช้ได้ทันที
                  </p>
                </div>
              )}

              {readinessLevel === 'intermediate' && (
                <div className="bg-gray-800 border border-gray-600 rounded-sm p-4 mb-4">
                  <p className="text-mint-300">
                    คุณมีพื้นฐาน AI ที่ดี! คอร์สนี้จะช่วยยกระดับทักษะของคุณ และเรียนรู้เทคนิคขั้นสูงเพื่อนำ AI ไปใช้ได้อย่างมีประสิทธิภาพมากขึ้น
                  </p>
                </div>
              )}

              {readinessLevel === 'advanced' && (
                <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-4 mb-4">
                  <p className="text-mint-300">
                    คุณมีประสบการณ์ AI มาก! คอร์สนี้จะช่วยเติมเต็มในส่วนที่ยังขาด พร้อม Framework และ Case Study ที่นำไปประยุกต์ใช้ในระดับองค์กร
                  </p>
                </div>
              )}
            </div>

            {/* Contact & Consent Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  อีเมลติดต่อ *
                </label>
                <input
                  type="email"
                  value={assessmentData.consent.contactEmail}
                  onChange={(e) => handleInputChange('consent', 'contactEmail', e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border border-gray-700 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={assessmentData.consent.contactPhone}
                  onChange={(e) => handleInputChange('consent', 'contactPhone', e.target.value)}
                  className="w-full px-4 py-3 rounded-sm border border-gray-700 focus:outline-none"
                  placeholder="08X-XXX-XXXX"
                />
              </div>

              <label className="flex items-start p-4 border border-gray-700 rounded-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessmentData.consent.understoodTerms}
                  onChange={(e) => handleInputChange('consent', 'understoodTerms', e.target.checked)}
                  className="h-4 w-4 text-mint-400 mt-1"
                />
                <div className="ml-3 text-sm text-gray-400">
                  <span className="font-medium">ฉันรับทราบและยินยอม *</span>
                  <ul className="mt-2 space-y-1 text-xs text-gray-400">
                    <li>- ฉันยินยอมให้ Antiparallel ใช้ข้อมูลนี้เพื่อปรับปรุงเนื้อหาให้เหมาะกับฉัน</li>
                    <li>- ฉันเข้าใจว่าผลลัพธ์จากการเรียนอาจแตกต่างกันตามบุคคล</li>
                    <li>- ข้อมูลที่ให้มาเป็นความจริงและถูกต้อง</li>
                    <li>- ฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว</li>
                  </ul>
                </div>
              </label>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">

      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="flex items-center space-x-2 text-gray-400 hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับไปหน้าคอร์ส</span>
            </Link>

            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-100">แบบประเมิน AI Readiness</h1>
              <p className="text-sm text-gray-400">ขั้นตอนที่ {currentStep} จาก {totalSteps}</p>
            </div>

            <div className="w-24" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                  index < currentStep ? 'bg-mint-500' :
                  index === currentStep - 1 ? 'bg-mint-300' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-sm shadow-sm border border-gray-700 p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-sm font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-400 border border-gray-600 hover:bg-gray-800/50'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ก่อนหน้า</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-sm font-medium transition-colors ${
                  validateCurrentStep()
                    ? 'bg-mint-600 text-white hover:opacity-90'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>ถัดไป</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!validateCurrentStep()}
                className={`flex items-center space-x-2 px-8 py-3 rounded-sm font-semibold transition-colors ${
                  validateCurrentStep()
                    ? 'bg-mint-600 text-white hover:opacity-90'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>เสร็จสิ้น เริ่มเรียนเลย</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
