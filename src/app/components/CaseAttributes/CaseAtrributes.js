// components/CaseForm.js
import { useState } from 'react';
import styles from './CaseAttributes.module.scss';

const CaseAttributes = () => {
  const [formData, setFormData] = useState({
    "case_attributes": [
        {
            "case_category_id": "GST",
            "relevant_act": [
                {
                    "act_id": "Central Goods and Services Tax Act, 2017",
                    "offence_type": [
                        {
                            "offence_type_id": "Clandestine removal of goods to evade payment of tax"
                        },
                        {
                            "offence_type_id": "Clandestine removal of taxable goods to evade payment of tax"
                        },
                        {
                            "offence_type_id": "Evaded payment of appropriate GST"
                        },
                        {
                            "offence_type_id": "evaded payment of GST"
                        },
                        {
                            "offence_type_id": "Not Payment Of GST"
                        },
                        {
                            "offence_type_id": "Non payment of GST"
                        },
                        {
                            "offence_type_id": "Mis-declaring of stock to evade the payment of tax"
                        },
                        {
                            "offence_type_id": "Clandestine sale"
                        }
                    ],
                    "section_name": ""
                }
            ]
        }
    ],
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
    
    // Add your validation logic here if needed
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
      // console.log('Form Data:', formData);
      // Here you would typically send the data to your API
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
      <form onSubmit={handleSubmit} className={styles.caseForm}>
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

          {formData.case_attributes.map((caseAttr, attrIndex) => (
            <div key={attrIndex} className={styles.caseAttribute}>
              <div className={styles.attributeHeader}>
                <h3>Case Attribute {attrIndex + 1}</h3>
                {formData.case_attributes.length > 1 && (
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
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter case category..."
                  value={caseAttr.case_category_id}
                  onChange={(e) => handleCaseAttributeChange(attrIndex, 'case_category_id', e.target.value)}
                />
                {errors[`case_category_${attrIndex}`] && (
                  <span className={styles.error}>{errors[`case_category_${attrIndex}`]}</span>
                )}
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

                {caseAttr.relevant_act.map((act, actIndex) => (
                  <div key={actIndex} className={styles.relevant_act}>
                    <div className={styles.actHeader}>
                      <h5>Act {actIndex + 1}</h5>
                      {caseAttr.relevant_act.length > 1 && (
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
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter act name..."
                          value={act.act_id}
                          onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'act_id', e.target.value)}
                        />
                        {errors[`act_id_${attrIndex}_${actIndex}`] && (
                          <span className={styles.error}>{errors[`act_id_${attrIndex}_${actIndex}`]}</span>
                        )}
                      </div>

                      <div className={styles.field}>
                        <label className={styles.label}>Section Name</label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter section name..."
                          value={act.section_name}
                          onChange={(e) => handleRelevantActChange(attrIndex, actIndex, 'section_name', e.target.value)}
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

                      {act.offence_type.map((offence, offenceIndex) => (
                        <div key={offenceIndex} className={styles.offence_type}>
                          <div className={styles.offenceHeader}>
                            <label className={styles.label}>Offence Type {offenceIndex + 1}</label>
                            {act.offence_type.length > 1 && (
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => removeOffenceType(attrIndex, actIndex, offenceIndex)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter offence type..."
                            value={offence.offence_type_id}
                            onChange={(e) => handleOffenceTypeChange(attrIndex, actIndex, offenceIndex, e.target.value)}
                          />
                          {errors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`] && (
                            <span className={styles.error}>{errors[`offence_type_${attrIndex}_${actIndex}_${offenceIndex}`]}</span>
                          )}
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