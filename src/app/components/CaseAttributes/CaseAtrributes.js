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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
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
      
      onSubmit?.(apiData);
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
    onReset?.();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Case Identifiers</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              CASE ID <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.input} ${errors.caseId ? styles.error : ''}`}
              placeholder="Enter case ID..."
              value={formData.caseId}
              onChange={(e) => handleInputChange('caseId', e.target.value)}
            />
            {errors.caseId && <span className={styles.errorText}>{errors.caseId}</span>}
          </div>
          
          <div className={styles.field}>
            <label className={styles.label}>
              FILE NUMBER <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.input} ${errors.fileNumber ? styles.error : ''}`}
              placeholder="Enter file number..."
              value={formData.fileNumber}
              onChange={(e) => handleInputChange('fileNumber', e.target.value)}
            />
            {errors.fileNumber && <span className={styles.errorText}>{errors.fileNumber}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              CASE/ORDER NUMBER <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.input} ${errors.caseOrderNumber ? styles.error : ''}`}
              placeholder="Enter case/order number..."
              value={formData.caseOrderNumber}
              onChange={(e) => handleInputChange('caseOrderNumber', e.target.value)}
            />
            {errors.caseOrderNumber && <span className={styles.errorText}>{errors.caseOrderNumber}</span>}
          </div>
          
          <div className={styles.field}>
            <label className={styles.label}>
              OFFENCE DATE <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              className={`${styles.input} ${styles.dateInput} ${errors.offenceDate ? styles.error : ''}`}
              value={formData.offenceDate}
              onChange={(e) => handleInputChange('offenceDate', e.target.value)}
            />
            {errors.offenceDate && <span className={styles.errorText}>{errors.offenceDate}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>CASE NAME</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter case name..."
              value={formData.caseName}
              onChange={(e) => handleInputChange('caseName', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            SAVE & CONTINUE
          </button>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseIdentifiers;