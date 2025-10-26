'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
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
    age: string;
    weight: string;
    height: string;
    pregnancyWeek: string;
    pregnancyType: string;
  };
  medicalHistory: {
    previousPregnancies: string;
    complications: string[];
    medications: string[];
    conditions: string[];
    doctorApproval: boolean;
    lastCheckup: string;
  };
  currentSymptoms: {
    symptoms: string[];
    severity: string;
    activityLevel: string;
  };
  consent: {
    understoodRisks: boolean;
    emergencyContact: string;
    doctorContact: string;
  };
}

export default function HealthAssessment() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: {
      age: '',
      weight: '',
      height: '',
      pregnancyWeek: '',
      pregnancyType: ''
    },
    medicalHistory: {
      previousPregnancies: '',
      complications: [],
      medications: [],
      conditions: [],
      doctorApproval: false,
      lastCheckup: ''
    },
    currentSymptoms: {
      symptoms: [],
      severity: '',
      activityLevel: ''
    },
    consent: {
      understoodRisks: false,
      emergencyContact: '',
      doctorContact: ''
    }
  });

  const totalSteps = 4;

  const complications = [
    'ไม่มีปัญหาฮอร์โมน',
    'อาการ PMS รุนแรง',
    'ประจำเดือนไม่สม่ำเสมอ',
    'ประจำเดือนมาเยอะหรือน้อยผิดปกติ',
    'ปัญหาต่อมไทรอยด์',
    'ความดันโลหิตสูง',
    'เบาหวาน',
    'อื่นๆ'
  ];

  const medications = [
    'ไม่ได้ใช้ยาใดๆ',
    'ยาคุมกำเนิด',
    'ยาฮอร์โมนทดแทน',
    'ยาต่อมไทรอยด์',
    'ยาลดระดับน้ำตาล',
    'ยารักษาความดันโลหิตสูง',
    'อื่นๆ'
  ];


  const currentSymptoms = [
    'ไม่มีอาการ',
    'คลื่นไส้ อาเจียน',
    'ปวดหลัง',
    'ปวดเอว',
    'บวมมือ เท้า',
    'วิงเวียนศีรษะ',
    'เหนื่อยง่าย',
    'นอนไม่หลับ',
    'ปวดข้อ กล้ามเนื้อ'
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
        return assessmentData.personalInfo.age && 
               assessmentData.personalInfo.pregnancyWeek && 
               assessmentData.personalInfo.pregnancyType;
      case 2:
        return assessmentData.medicalHistory.previousPregnancies && 
               assessmentData.medicalHistory.complications.length > 0 &&
               assessmentData.medicalHistory.lastCheckup;
      case 3:
        return assessmentData.currentSymptoms.symptoms.length > 0 && 
               assessmentData.currentSymptoms.activityLevel;
      case 4:
        return assessmentData.consent.understoodRisks && 
               assessmentData.consent.emergencyContact && 
               assessmentData.consent.doctorContact;
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
    // Process assessment and navigate to pre-class checklist
    router.push(`/courses/${courseId}/checklist`);
  };

  const getRiskLevel = () => {
    let riskFactors = 0;
    
    // Check for high-risk factors
    if (assessmentData.medicalHistory.complications.some(comp => 
      ['อาการ PMS รุนแรง', 'ประจำเดือนไม่สม่ำเสมอ', 'ปัญหาต่อมไทรอยด์', 'ความดันโลหิตสูง', 'เบาหวาน'].includes(comp)
    )) {
      riskFactors += 2;
    }
    
    if (assessmentData.medicalHistory.conditions.some(cond => 
      ['โรคหัวใจ', 'โรคปอด/หอบหืด', 'โรคไต', 'โรคเบาหวาน'].includes(cond)
    )) {
      riskFactors += 2;
    }
    
    if (assessmentData.currentSymptoms.symptoms.some(symptom => 
      ['บวมมือ เท้า', 'วิงเวียนศีรษะ', 'ปวดข้อ กล้ามเนื้อ'].includes(symptom)
    )) {
      riskFactors += 1;
    }
    
    if (parseInt(assessmentData.personalInfo.pregnancyWeek) < 12) {
      riskFactors += 1;
    }
    
    if (riskFactors >= 3) return 'high';
    if (riskFactors >= 1) return 'medium';
    return 'low';
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
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ข้อมูลส่วนบุคคล</h2>
              <p className="text-gray-600">เพื่อให้เราเข้าใจสถานะของคุณมากขึ้น</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อายุ (ปี) *
                </label>
                <input
                  type="number"
                  value={assessmentData.personalInfo.age}
                  onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อายุครรภ์ (สัปดาห์) *
                </label>
                <input
                  type="number"
                  value={assessmentData.personalInfo.pregnancyWeek}
                  onChange={(e) => handleInputChange('personalInfo', 'pregnancyWeek', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  น้ำหนัก (กิโลกรัม)
                </label>
                <input
                  type="number"
                  value={assessmentData.personalInfo.weight}
                  onChange={(e) => handleInputChange('personalInfo', 'weight', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ส่วนสูง (เซนติเมตร)
                </label>
                <input
                  type="number"
                  value={assessmentData.personalInfo.height}
                  onChange={(e) => handleInputChange('personalInfo', 'height', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="160"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                สถานะสุขภาพฮอร์โมนปัจจุบัน *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['สุขภาพดี', 'มีอาการ PMS เล็กน้อย', 'มีปัญหาฮอร์โมนปานกลาง', 'มีปัญหาฮอร์โมนรุนแรง'].map((type) => (
                  <label key={type} className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                    <input
                      type="radio"
                      name="pregnancyType"
                      value={type}
                      checked={assessmentData.personalInfo.pregnancyType === type}
                      onChange={(e) => handleInputChange('personalInfo', 'pregnancyType', e.target.value)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-700">{type}</span>
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
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ประวัติสุขภาพ</h2>
              <p className="text-gray-600">ข้อมูลทางการแพทย์ที่เกี่ยวข้อง</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ความยาววงจรประจำเดือน (วัน) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['21-24', '25-28', '29-32', '33+ หรือไม่สม่ำเสมอ'].map((num) => (
                  <label key={num} className="flex items-center justify-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                    <input
                      type="radio"
                      name="previousPregnancies"
                      value={num}
                      checked={assessmentData.medicalHistory.previousPregnancies === num}
                      onChange={(e) => handleInputChange('medicalHistory', 'previousPregnancies', e.target.value)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 mr-2"
                    />
                    <span className="text-gray-700">{num} วัน</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ภาวะแทรกซ้อนที่เคยเกิดขึ้น *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {complications.map((comp) => (
                  <label key={comp} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                    assessmentData.medicalHistory.complications.includes(comp)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.medicalHistory.complications.includes(comp)}
                      onChange={() => handleArrayToggle('medicalHistory', 'complications', comp)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{comp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ยาที่ใช้ประจำ
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {medications.map((med) => (
                  <label key={med} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                    assessmentData.medicalHistory.medications.includes(med)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.medicalHistory.medications.includes(med)}
                      onChange={() => handleArrayToggle('medicalHistory', 'medications', med)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{med}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ครั้งสุดท้ายที่ไปตรวจครรภ์ *
              </label>
              <input
                type="date"
                value={assessmentData.medicalHistory.lastCheckup}
                onChange={(e) => handleInputChange('medicalHistory', 'lastCheckup', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
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
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">อาการปัจจุบัน</h2>
              <p className="text-gray-600">สถานะสุขภาพและความพร้อมในการออกกำลังกาย</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                อาการที่คุณมีในปัจจุบัน *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSymptoms.map((symptom) => (
                  <label key={symptom} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                    assessmentData.currentSymptoms.symptoms.includes(symptom)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={assessmentData.currentSymptoms.symptoms.includes(symptom)}
                      onChange={() => handleArrayToggle('currentSymptoms', 'symptoms', symptom)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ระดับกิจกรรมการออกกำลังกายปัจจุบัน *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'none', label: 'ไม่เคยออกกำลังกาย', desc: 'นั่งทำงานเป็นส่วนใหญ่' },
                  { value: 'light', label: 'ออกกำลังกายเบาๆ', desc: 'เดินเล่น โยคะ 1-2 ครั้ง/สัปดาห์' },
                  { value: 'moderate', label: 'ออกกำลังกายปานกลาง', desc: 'วิ่ง ว่ายน้ำ 3-4 ครั้ง/สัปดาห์' },
                  { value: 'high', label: 'ออกกำลังกายหนัก', desc: 'ฟิตเนส กีฬาแข่งขัน 5+ ครั้ง/สัปดาห์' }
                ].map((level) => (
                  <label key={level.value} className="flex items-start p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={level.value}
                      checked={assessmentData.currentSymptoms.activityLevel === level.value}
                      onChange={(e) => handleInputChange('currentSymptoms', 'activityLevel', e.target.value)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 mt-1"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        const riskLevel = getRiskLevel();
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
                riskLevel === 'high' ? 'bg-red-100' : riskLevel === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                <Shield className={`h-8 w-8 ${
                  riskLevel === 'high' ? 'text-red-600' : riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">การประเมินความเสี่ยง</h2>
              <p className="text-gray-600">ผลการประเมินและข้อตกลงในการออกกำลังกาย</p>
            </div>

            {/* Risk Assessment Result */}
            <div className={`p-6 rounded-2xl border-2 ${
              riskLevel === 'high' ? 'bg-red-50 border-red-200' : 
              riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' : 
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className={`h-6 w-6 ${
                  riskLevel === 'high' ? 'text-red-600' : riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <h3 className={`text-lg font-semibold ${
                  riskLevel === 'high' ? 'text-red-800' : riskLevel === 'medium' ? 'text-yellow-800' : 'text-green-800'
                }`}>
                  ระดับความเสี่ยง: {riskLevel === 'high' ? 'สูง' : riskLevel === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                </h3>
              </div>
              
              {riskLevel === 'high' && (
                <div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">ต้องได้รับอนุมัติจากแพทย์ก่อน</p>
                      <p className="text-red-700 text-sm mt-1">
                        จากข้อมูลที่คุณให้มา เราแนะนำให้ปรึกษาแพทย์เฉพาะทางด้านฮอร์โมนของคุณก่อนเริ่มออกกำลังกาย
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {riskLevel === 'medium' && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-4">
                  <p className="text-yellow-800">
                    คุณสามารถเริ่มออกกำลังกายได้ แต่ควรระมัดระวังเป็นพิเศษและหยุดทันทีหากมีอาการผิดปกติ
                  </p>
                </div>
              )}
              
              {riskLevel === 'low' && (
                <div className="bg-green-100 border border-green-300 rounded-xl p-4 mb-4">
                  <p className="text-green-800">
                    คุณสามารถเริ่มออกกำลังกายได้อย่างปลอดภัย โปรดปฏิบัติตามคำแนะนำในบทเรียน
                  </p>
                </div>
              )}
            </div>

            {/* Consent Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์ฉุกเฉิน *
                </label>
                <input
                  type="tel"
                  value={assessmentData.consent.emergencyContact}
                  onChange={(e) => handleInputChange('consent', 'emergencyContact', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="08X-XXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์แพทย์ผู้ดูแล *
                </label>
                <input
                  type="tel"
                  value={assessmentData.consent.doctorContact}
                  onChange={(e) => handleInputChange('consent', 'doctorContact', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="02-XXX-XXXX"
                />
              </div>

              <label className="flex items-start p-4 border border-gray-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessmentData.consent.understoodRisks}
                  onChange={(e) => handleInputChange('consent', 'understoodRisks', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 mt-1"
                />
                <div className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">ฉันรับทราบและยินยอม *</span>
                  <ul className="mt-2 space-y-1 text-xs text-gray-600">
                    <li>• ฉันเข้าใจความเสี่ยงที่อาจเกิดขึ้นจากการออกกำลังกายเพื่อปรับสมดุลฮอร์โมน</li>
                    <li>• ฉันจะหยุดออกกำลังกายทันทีหากมีอาการผิดปกติ</li>
                    <li>• ฉันจะปรึกษาแพทย์หากมีข้อสงสัยเกี่ยวกับสุขภาพฮอร์โมน</li>
                    <li>• ข้อมูลที่ให้มาเป็นความจริงและถูกต้อง</li>
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/courses/${courseId}`}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับไปหน้าคอร์ส</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">การประเมินสุขภาพ</h1>
              <p className="text-sm text-gray-600">ขั้นตอนที่ {currentStep} จาก {totalSteps}</p>
            </div>
            
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div 
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                  index < currentStep ? 'bg-orange-500' : 
                  index === currentStep - 1 ? 'bg-orange-300' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>ก่อนหน้า</span>
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  validateCurrentStep()
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>ถัดไป</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!validateCurrentStep()}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-colors ${
                  validateCurrentStep()
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>เสร็จสิ้นการประเมิน</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 