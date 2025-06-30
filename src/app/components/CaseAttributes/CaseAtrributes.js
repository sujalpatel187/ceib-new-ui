// components/CaseForm.js
import { useState } from 'react';
import styles from './CaseAttributes.module.scss';
import { ValidatedInputWithTooltip, validateFieldStatus, getFieldValidationClass } from '../../utils/pdfValidation';

const CaseAttributes = ({ initialData, pdfCoordinates = {}, validationMap }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const handleRelevantActChange = (attrIndex, actIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: attr.relevant_act.map((act, j) => 
            j === actIndex ? { ...act, [field]: value } : act
          )
        } : attr
      )
    }));
  };

  const handleOffenceTypeChange = (attrIndex, actIndex, offenceIndex, value) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: attr.relevant_act.map((act, j) => 
            j === actIndex ? {
              ...act,
              offence_type: act.offence_type.map((offence, k) => 
                k === offenceIndex ? { offence_type_id: value } : offence
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
      case_attributes: [
        ...prev.case_attributes,
        {
          case_category_id: '',
          relevant_act: [
            {
              act_id: '',
              offence_type: [{ offence_type_id: '' }],
              section_name: ''
            }
          ]
        }
      ]
    }));
  };

  const addRelevantAct = (attrIndex) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: [
            ...attr.relevant_act,
            {
              act_id: '',
              offence_type: [{ offence_type_id: '' }],
              section_name: ''
            }
          ]
        } : attr
      )
    }));
  };

  const addOffenceType = (attrIndex, actIndex) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: attr.relevant_act.map((act, j) => 
            j === actIndex ? {
              ...act,
              offence_type: [...act.offence_type, { offence_type_id: '' }]
            } : act
          )
        } : attr
      )
    }));
  };

  const removeCaseAttribute = (index) => {
    if (formData.case_attributes.length > 1) {
      setFormData(prev => ({
        ...prev,
        case_attributes: prev.case_attributes.filter((_, i) => i !== index)
      }));
    }
  };

  const removeRelevantAct = (attrIndex, actIndex) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: attr.relevant_act.filter((_, j) => j !== actIndex)
        } : attr
      )
    }));
  };

  const removeOffenceType = (attrIndex, actIndex, offenceIndex) => {
    setFormData(prev => ({
      ...prev,
      case_attributes: prev.case_attributes.map((attr, i) => 
        i === attrIndex ? {
          ...attr,
          relevant_act: attr.relevant_act.map((act, j) => 
            j === actIndex ? {
              ...act,
              offence_type: act.offence_type.filter((_, k) => k !== offenceIndex)
            } : act
          )
        } : attr
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    formData.case_attributes.forEach((attr, attrIndex) => {
      if (!attr.case_category_id.trim()) {
        newErrors[`case_category_${attrIndex}`] = 'Case Category is required';
      }
      
      attr.relevant_act.forEach((act, actIndex) => {
        if (!act.act_id.trim()) {
          newErrors[`act_id_${attrIndex}_${actIndex}`] = 'Act is required';
        }
        
        act.offence_type.forEach((offence, offenceIndex) => {
          if (!offence.offence_type_id.trim()) {
            newErrors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`] = 'Offence Type is required';
          }
        });
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  const handleReset = () => {
    setFormData({
      "case_attributes": [
        {
          "case_category_id": "",
          "relevant_act": [
            {
              "act_id": "",
              "offence_type": [
                {
                  "offence_type_id": ""
                }
              ],
              "section_name": ""
            }
          ]
        }
      ]
    });
    setErrors({});
  };

  return (
    <div className={styles.formContainer}>
      {/* <div className={styles.formHeader}>
        <h1>Case Attributes Management</h1>
        <p>Configure case categories, relevant acts, and offence types</p>
      </div> */}

      <form onSubmit={handleSubmit} className={styles.caseForm}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerContent}>
              <h2 className={styles.sectionTitle}>Case Attributes</h2>
              <span className={styles.itemCount}>
                {formData.case_attributes.length} attribute{formData.case_attributes.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              type="button"
              className={styles.addButton}
              onClick={addCaseAttribute}
            >
              <span className={styles.buttonIcon}>+</span>
              Add Case Attribute
            </button>
          </div>

          <div className={styles.attributesList}>
            {formData.case_attributes.map((caseAttr, attrIndex) => (
              <div key={attrIndex} className={styles.caseAttribute}>
                <div className={styles.attributeHeader}>
                  <div className={styles.attributeTitle}>
                    <h3>Case Attribute {attrIndex + 1}</h3>
                    <div className={styles.attributeBadge}>
                      {caseAttr.relevant_act.length} act{caseAttr.relevant_act.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  {formData.case_attributes.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeCaseAttribute(attrIndex)}
                      title="Remove Case Attribute"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className={styles.attributeContent}>
                  <div className={styles.primaryField}>
                    <label className={styles.label}>
                      Case Category <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <ValidatedInputWithTooltip
                        type="text"
                        className={`${styles.input} ${errors[`case_category_${attrIndex}`] ? styles.error : ''}`}
                        placeholder="Enter case category..."
                        value={caseAttr.case_category_id}
                        onChange={(e) => handleCaseAttributeChange(attrIndex, 'case_category_id', e.target.value)}
                        pdfCoordinates={pdfCoordinates}
                      />
                      {caseAttr.case_category_id && (
                        <div className={styles.validationIcon}>✓</div>
                      )}
                    </div>
                    {errors[`case_category_${attrIndex}`] && (
                      <span className={styles.errorText}>{errors[`case_category_${attrIndex}`]}</span>
                    )}
                  </div>

                  <div className={styles.relevantActs}>
                    <div className={styles.subsectionHeader}>
                      <h4>Relevant Acts</h4>
                      <button
                        type="button"
                        className={styles.addButtonSecondary}
                        onClick={() => addRelevantAct(attrIndex)}
                      >
                        + Add Act
                      </button>
                    </div>

                    <div className={styles.actsList}>
                      {caseAttr.relevant_act.map((act, actIndex) => (
                        <div key={actIndex} className={styles.relevantAct}>
                          <div className={styles.actHeader}>
                            <h5>Act {actIndex + 1}</h5>
                            {caseAttr.relevant_act.length > 1 && (
                              <button
                                type="button"
                                className={styles.removeButtonSmall}
                                onClick={() => removeRelevantAct(attrIndex, actIndex)}
                                title="Remove Act"
                              >
                                ×
                              </button>
                            )}
                          </div>

                          <div className={styles.actFields}>
                            <div className={styles.field}>
                              <label className={styles.label}>
                                Act <span className={styles.required}>*</span>
                              </label>
                              <div className={styles.inputWrapper}>
                                <ValidatedInputWithTooltip
                                  type="text"
                                  className={`${styles.input} ${errors[`act_id_${attrIndex}_${actIndex}`] ? styles.error : ''}`}
                                  placeholder="Enter act name..."
                                  value={act.act_id}
                                  onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'act_id', e.target.value)}
                                  pdfCoordinates={pdfCoordinates}
                                />
                                {act.act_id && (
                                  <div className={styles.warningIcon}>⚠</div>
                                )}
                              </div>
                              {errors[`act_id_${attrIndex}_${actIndex}`] && (
                                <span className={styles.errorText}>{errors[`act_id_${attrIndex}_${actIndex}`]}</span>
                              )}
                            </div>

                            <div className={styles.field}>
                              <label className={styles.label}>Section Name</label>
                              <ValidatedInputWithTooltip
                                type="text"
                                className={styles.input}
                                placeholder="Enter section name..."
                                value={act.section_name}
                                onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'section_name', e.target.value)}
                                pdfCoordinates={pdfCoordinates}
                              />
                            </div>
                          </div>

                          <div className={styles.offenceTypes}>
                            <div className={styles.offenceHeader}>
                              <h6>Offence Types</h6>
                              <button
                                type="button"
                                className={styles.addButtonTertiary}
                                onClick={() => addOffenceType(attrIndex, actIndex)}
                              >
                                + Add Offence Type
                              </button>
                            </div>

                            <div className={styles.offenceGrid}>
                              {act.offence_type.map((offence, offenceIndex) => (
                                <div key={offenceIndex} className={styles.offenceItem}>
                                  <div className={styles.offenceItemHeader}>
                                    <span className={styles.offenceLabel}>
                                      Offence Type {offenceIndex + 1}
                                    </span>
                                    {act.offence_type.length > 1 && (
                                      <button
                                        type="button"
                                        className={styles.removeButtonTiny}
                                        onClick={() => removeOffenceType(attrIndex, actIndex, offenceIndex)}
                                        title="Remove Offence Type"
                                      >
                                        ×
                                      </button>
                                    )}
                                  </div>
                                  <div className={styles.inputWrapper}>
                                    <ValidatedInputWithTooltip
                                      type="text"
                                      className={`${styles.input} ${errors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`] ? styles.error : ''}`}
                                      placeholder="Enter offence type..."
                                      value={offence.offence_type_id}
                                      onChange={(e) => handleOffenceTypeChange(attrIndex, actIndex, offenceIndex, e.target.value)}
                                      pdfCoordinates={pdfCoordinates}
                                    />
                                    {offence.offence_type_id && (
                                      <div className={styles.warningIcon}>⚠</div>
                                    )}
                                  </div>
                                  {errors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`] && (
                                    <span className={styles.errorText}>{errors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`]}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <div className={styles.actionButtons}>
            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonIcon}>💾</span>
              Save & Continue
            </button>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              <span className={styles.buttonIcon}>🔄</span>
              Reset Form
            </button>
          </div>
          <div className={styles.formSummary}>
            <span>Total Attributes: {formData.case_attributes.length}</span>
            <span>Total Acts: {formData.case_attributes.reduce((sum, attr) => sum + attr.relevant_act.length, 0)}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CaseAttributes;