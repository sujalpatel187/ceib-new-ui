// components/CaseForm.js
import { useState } from 'react';
import styles from './CaseAttributes.module.scss';

const CaseAttributes = () => {
  const [formData, setFormData] = useState({
    // Case Identifiers
    caseId: '',
    fileNumber: '',
    caseOrderNumber: '',
    offenceDate: '',
    caseName: '',
    
    // Case Attributes
    caseAttributes: [
      {
        caseCategoryId: '',
        relevantAct: [
          {
            actId: '',
            offenceType: [
              {
                offenceTypeId: ''
              }
            ],
            sectionName: ''
          }
        ]
      }
    ]
  });

  const [errors, setErrors] = useState({});

  // Sample data for dropdowns (replace with actual API calls)
  const caseCategories = [
    { id: '1', name: 'Criminal Case' },
    { id: '2', name: 'Civil Case' },
    { id: '3', name: 'Commercial Case' }
  ];

  const acts = [
    { id: '1', name: 'Indian Penal Code' },
    { id: '2', name: 'Motor Vehicle Act' },
    { id: '3', name: 'Narcotic Drugs Act' }
  ];

  const offenceTypes = [
    { id: '1', name: 'Theft' },
    { id: '2', name: 'Assault' },
    { id: '3', name: 'Fraud' }
  ];

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

  const handleCaseAttributeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const handleRelevantActChange = (attrIndex, actIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: attr.relevantAct.map((act, j) => 
            j === actIndex ? { ...act, [field]: value } : act
          )
        } : attr
      )
    }));
  };

  const handleOffenceTypeChange = (attrIndex, actIndex, offenceIndex, value) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: attr.relevantAct.map((act, j) => 
            j === actIndex ? {
              ...act,
              offenceType: act.offenceType.map((offence, k) => 
                k === offenceIndex ? { offenceTypeId: value } : offence
              )
            } : act
          )
        } : attr
      )
    }));
  };

  const addCaseAttribute = () => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: [
        ...prev.caseAttributes,
        {
          caseCategoryId: '',
          relevantAct: [
            {
              actId: '',
              offenceType: [{ offenceTypeId: '' }],
              sectionName: ''
            }
          ]
        }
      ]
    }));
  };

  const addRelevantAct = (attrIndex) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: [
            ...attr.relevantAct,
            {
              actId: '',
              offenceType: [{ offenceTypeId: '' }],
              sectionName: ''
            }
          ]
        } : attr
      )
    }));
  };

  const addOffenceType = (attrIndex, actIndex) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: attr.relevantAct.map((act, j) => 
            j === actIndex ? {
              ...act,
              offenceType: [...act.offenceType, { offenceTypeId: '' }]
            } : act
          )
        } : attr
      )
    }));
  };

  const removeCaseAttribute = (index) => {
    if (formData.caseAttributes.length > 1) {
      setFormData(prev => ({
        ...prev,
        caseAttributes: prev.caseAttributes.filter((_, i) => i !== index)
      }));
    }
  };

  const removeRelevantAct = (attrIndex, actIndex) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: attr.relevantAct.filter((_, j) => j !== actIndex)
        } : attr
      )
    }));
  };

  const removeOffenceType = (attrIndex, actIndex, offenceIndex) => {
    setFormData(prev => ({
      ...prev,
      caseAttributes: prev.caseAttributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevantAct: attr.relevantAct.map((act, j) => 
            j === actIndex ? {
              ...act,
              offenceType: act.offenceType.filter((_, k) => k !== offenceIndex)
            } : act
          )
        } : attr
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.caseId.trim()) newErrors.caseId = 'Case ID is required';
    if (!formData.fileNumber.trim()) newErrors.fileNumber = 'File Number is required';
    if (!formData.caseOrderNumber.trim()) newErrors.caseOrderNumber = 'Case/Order Number is required';
    if (!formData.offenceDate) newErrors.offenceDate = 'Offence Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form Data:', formData);
      // Here you would typically send the data to your API
      alert('Form submitted successfully!');
    }
  };

  const handleReset = () => {
    setFormData({
      caseId: '',
      fileNumber: '',
      caseOrderNumber: '',
      offenceDate: '',
      caseName: '',
      caseAttributes: [
        {
          caseCategoryId: '',
          relevantAct: [
            {
              actId: '',
              offenceType: [{ offenceTypeId: '' }],
              sectionName: ''
            }
          ]
        }
      ]
    });
    setErrors({});
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.caseForm}>
        {/* Case Identifiers Section */}
        {/* <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Case Identifiers</h2>
          
          <div className={styles.row}>
            <div className={styles.field}>
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
              {errors.caseId && <span className={styles.errorText}>{errors.caseId}</span>}
            </div>
            
            <div className={styles.field}>
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
              {errors.fileNumber && <span className={styles.errorText}>{errors.fileNumber}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
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
              {errors.caseOrderNumber && <span className={styles.errorText}>{errors.caseOrderNumber}</span>}
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>
                Offence Date <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                className={`${styles.input} ${errors.offenceDate ? styles.error : ''}`}
                value={formData.offenceDate}
                onChange={(e) => handleInputChange('offenceDate', e.target.value)}
              />
              {errors.offenceDate && <span className={styles.errorText}>{errors.offenceDate}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Case Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter case name..."
              value={formData.caseName}
              onChange={(e) => handleInputChange('caseName', e.target.value)}
            />
          </div>
        </div> */}

        {/* Case Attributes Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Case Attributes</h2>
            <button
              type="button"
              className={styles.addButton}
              onClick={addCaseAttribute}
            >
              + Add Case Attribute
            </button>
          </div>

          {formData.caseAttributes.map((caseAttr, attrIndex) => (
            <div key={attrIndex} className={styles.caseAttribute}>
              <div className={styles.attributeHeader}>
                <h3>Case Attribute {attrIndex + 1}</h3>
                {formData.caseAttributes.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeCaseAttribute(attrIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Case Category</label>
                <select
                  className={styles.select}
                  value={caseAttr.caseCategoryId}
                  onChange={(e) => handleCaseAttributeChange(attrIndex, 'caseCategoryId', e.target.value)}
                >
                  <option value="">Select case category...</option>
                  {caseCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Relevant Acts */}
              <div className={styles.relevantActs}>
                <div className={styles.subsectionHeader}>
                  <h4>Relevant Acts</h4>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => addRelevantAct(attrIndex)}
                  >
                    + Add Act
                  </button>
                </div>

                {caseAttr.relevantAct.map((act, actIndex) => (
                  <div key={actIndex} className={styles.relevantAct}>
                    <div className={styles.actHeader}>
                      <h5>Act {actIndex + 1}</h5>
                      {caseAttr.relevantAct.length > 1 && (
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => removeRelevantAct(attrIndex, actIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>Act</label>
                        <select
                          className={styles.select}
                          value={act.actId}
                          onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'actId', e.target.value)}
                        >
                          <option value="">Select act...</option>
                          {acts.map(actOption => (
                            <option key={actOption.id} value={actOption.id}>
                              {actOption.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.label}>Section Name</label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter section name..."
                          value={act.sectionName}
                          onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'sectionName', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Offence Types */}
                    <div className={styles.offenceTypes}>
                      <div className={styles.subsectionHeader}>
                        <h6>Offence Types</h6>
                        <button
                          type="button"
                          className={styles.addButton}
                          onClick={() => addOffenceType(attrIndex, actIndex)}
                        >
                          + Add Offence Type
                        </button>
                      </div>

                      {act.offenceType.map((offence, offenceIndex) => (
                        <div key={offenceIndex} className={styles.offenceType}>
                          <div className={styles.offenceHeader}>
                            <label className={styles.label}>Offence Type {offenceIndex + 1}</label>
                            {act.offenceType.length > 1 && (
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => removeOffenceType(attrIndex, actIndex, offenceIndex)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <select
                            className={styles.select}
                            value={offence.offenceTypeId}
                            onChange={(e) => handleOffenceTypeChange(attrIndex, actIndex, offenceIndex, e.target.value)}
                          >
                            <option value="">Select offence type...</option>
                            {offenceTypes.map(offenceOption => (
                              <option key={offenceOption.id} value={offenceOption.id}>
                                {offenceOption.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Save & Continue
          </button>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseAttributes;