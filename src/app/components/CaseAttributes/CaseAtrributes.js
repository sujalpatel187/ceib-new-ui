// components/CaseIdentifiers.jsx
import { useState } from 'react';
import styles from './CaseIdentifiers.module.scss';

const CaseIdentifiers = ({ onSubmit, onReset }) => {
  const [formData, setFormData] = useState({
    caseId: '',
    fileNumber: '',
    caseOrderNumber: '',
    offenceDate: '',
    caseName: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.caseId.trim()) {
      newErrors.caseId = 'Case ID is required';
    }
    
    if (!formData.fileNumber.trim()) {
      newErrors.fileNumber = 'File Number is required';
    }
    
    if (!formData.caseOrderNumber.trim()) {
      newErrors.caseOrderNumber = 'Case/Order Number is required';
    }
    
    if (!formData.offenceDate) {
      newErrors.offenceDate = 'Offence Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProgress = () => {
    const fields = ['caseId', 'fileNumber', 'caseOrderNumber', 'offenceDate', 'caseName'];
    const filledFields = fields.filter(field => formData[field].trim() !== '').length;
    return (filledFields / fields.length) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Transform data to match API structure
        const apiData = {
          case_id: formData.caseId,
          file_number: formData.fileNumber,
          case_order_number: formData.caseOrderNumber,
          offence_date: formData.offenceDate,
          case_name: formData.caseName,
          case_attributes: [
            {
              case_category_id: "",
              relevant_act: [
                {
                  act_id: "",
                  offence_type: [
                    {
                      offence_type_id: ""
                    }
                  ],
                  section_name: ""
                }
              ]
            }
          ]
        };
        
        await onSubmit?.(apiData);
        setShowSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
        
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      caseId: '',
      fileNumber: '',
      caseOrderNumber: '',
      offenceDate: '',
      caseName: ''
    });
    setErrors({});
    setShowSuccess(false);
    onReset?.();
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    // Implement draft saving logic here
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Case Identifiers</h2>
        <p className={styles.subtitle}>
          Please fill out the case identification details. Fields marked with <span className={styles.required}>*</span> are required.
        </p>
      </div>

      {/* Form Content */}
      <div className={styles.formContent}>
        {/* Required Fields Notice
        <div className={styles.requiredFields}>
          <div className={styles.requiredTitle}>Required Information</div>
          <p className={styles.requiredText}>
            Complete all required fields (*) to proceed to the next step. Optional fields can be filled later.
          </p>
        </div> */}

        {/* Progress Indicator */}
        <div className={styles.progressIndicator}>
          <div className={styles.progressTitle}>Form Completion Progress</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            {Math.round(calculateProgress())}% Complete
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className={`${styles.alert} ${styles.success}`}>
            Case identifiers have been successfully saved!
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
          {/* Basic Case Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span>📋</span> Basic Case Information
            </h3>
            
            <div className={`${styles.formRow} ${styles.twoColumns}`}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Case ID <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.caseId ? styles.error : ''}`}
                  placeholder="Enter case ID..."
                  value={formData.caseId}
                  onChange={(e) => handleInputChange('caseId', e.target.value)}
                />
                {errors.caseId && <div className={styles.errorMessage}>{errors.caseId}</div>}
                <div className={styles.helperText}>Unique identifier for this case</div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  File Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.fileNumber ? styles.error : ''}`}
                  placeholder="Enter file number..."
                  value={formData.fileNumber}
                  onChange={(e) => handleInputChange('fileNumber', e.target.value)}
                />
                {errors.fileNumber && <div className={styles.errorMessage}>{errors.fileNumber}</div>}
                <div className={styles.helperText}>Official file reference number</div>
              </div>
            </div>

            <div className={`${styles.formRow} ${styles.twoColumns}`}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Case/Order Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.caseOrderNumber ? styles.error : ''}`}
                  placeholder="Enter case/order number..."
                  value={formData.caseOrderNumber}
                  onChange={(e) => handleInputChange('caseOrderNumber', e.target.value)}
                />
                {errors.caseOrderNumber && <div className={styles.errorMessage}>{errors.caseOrderNumber}</div>}
                <div className={styles.helperText}>Court case or administrative order number</div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Offence Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  className={`${styles.input} ${styles.dateInput} ${errors.offenceDate ? styles.error : ''}`}
                  value={formData.offenceDate}
                  onChange={(e) => handleInputChange('offenceDate', e.target.value)}
                />
                {errors.offenceDate && <div className={styles.errorMessage}>{errors.offenceDate}</div>}
                <div className={styles.helperText}>Date when the offence occurred</div>
              </div>
            </div>

            <div className={`${styles.formRow} ${styles.singleColumn}`}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Case Name</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter case name..."
                  value={formData.caseName}
                  onChange={(e) => handleInputChange('caseName', e.target.value)}
                />
                <div className={styles.helperText}>Descriptive name or title for the case (optional)</div>
              </div>
            </div>
          </div>

          {/* Entry Information */}
          <div className={styles.entryInfo}>
            <span className={styles.entryLabel}>Last Updated:</span>
            <span className={styles.entryDetails}>
              {new Date().toLocaleString()} by System User
            </span>
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.draftButton}
              onClick={handleSaveDraft}
              disabled={isLoading}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className={styles.successButton}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseIdentifiers;