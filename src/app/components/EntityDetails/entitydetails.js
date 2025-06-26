import React, { useState } from 'react';

const OffenderIdentityForm = ({ onDataChange, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    offender_identity_informations: [
      {
        offender_type_id: '',
        offender_name: '',
        details_available: '',
        offender_identity_records: [
          {
            identifier_type_id: '',
            identifier_number: '',
            issue_place: '',
            please_specify: ''
          }
        ],
        personal_details: [
          {
            offender_name: '',
            father_name: '',
            mother_name: '',
            type_of_dob: '',
            age: '',
            dob_range_start: '',
            dob_range_end: '',
            dob_year: '',
            dob: '',
            gender: '',
            nationality_id: '',
            entity_type_id: '',
            business_category: '',
            entity_origin_id: '',
            incorporation_date: '',
            personal_contact_informations: [
              {
                mobile_no: '',
                email: '',
                aliases_name: '',
                spouce_name: ''
              }
            ]
          }
        ],
        bank_details: [
          {
            account_type_id: '',
            account_no: '',
            ifsc: '',
            bank_name: '',
            branch_name: '',
            depository_id: '',
            agent_name: '',
            mobile_number: ''
          }
        ],
        address_details: [
          {
            address_type_id: '',
            master_address_type: '',
            flat_house_no: '',
            premises_building: '',
            post_office: '',
            town_city: '',
            pincode: '',
            district_code: '',
            state_code: '',
            country_id: '',
            designation_role: '',
            business_name: ''
          }
        ]
      }
    ],
    unknown_contact_informations: [
      {
        person_identity_informations_id: '',
        mobile_no: '',
        email: ''
      }
    ]
  });

  const [activeSection, setActiveSection] = useState('basic');

  const handleInputChange = (path, value) => {
    const pathArray = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData));
    
    let current = newData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (key.includes('[') && key.includes(']')) {
        const arrayKey = key.split('[')[0];
        const index = parseInt(key.split('[')[1].split(']')[0]);
        current = current[arrayKey][index];
      } else {
        current = current[key];
      }
    }
    
    const finalKey = pathArray[pathArray.length - 1];
    current[finalKey] = value;
    
    setFormData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const addOffender = () => {
    const newOffender = {
      offender_type_id: '',
      offender_name: '',
      details_available: '',
      offender_identity_records: [
        {
          identifier_type_id: '',
          identifier_number: '',
          issue_place: '',
          please_specify: ''
        }
      ],
      personal_details: [
        {
          offender_name: '',
          father_name: '',
          mother_name: '',
          type_of_dob: '',
          age: '',
          dob_range_start: '',
          dob_range_end: '',
          dob_year: '',
          dob: '',
          gender: '',
          nationality_id: '',
          entity_type_id: '',
          business_category: '',
          entity_origin_id: '',
          incorporation_date: '',
          personal_contact_informations: [
            {
              mobile_no: '',
              email: '',
              aliases_name: '',
              spouce_name: ''
            }
          ]
        }
      ],
      bank_details: [
        {
          account_type_id: '',
          account_no: '',
          ifsc: '',
          bank_name: '',
          branch_name: '',
          depository_id: '',
          agent_name: '',
          mobile_number: ''
        }
      ],
      address_details: [
        {
          address_type_id: '',
          master_address_type: '',
          flat_house_no: '',
          premises_building: '',
          post_office: '',
          town_city: '',
          pincode: '',
          district_code: '',
          state_code: '',
          country_id: '',
          designation_role: '',
          business_name: ''
        }
      ]
    };
    
    setFormData(prev => ({
      ...prev,
      offender_identity_informations: [...prev.offender_identity_informations, newOffender]
    }));
  };

  const removeOffender = (index) => {
    setFormData(prev => ({
      ...prev,
      offender_identity_informations: prev.offender_identity_informations.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (path) => {
    const newData = JSON.parse(JSON.stringify(formData));
    const pathArray = path.split('.');
    
    let current = newData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (key.includes('[') && key.includes(']')) {
        const arrayKey = key.split('[')[0];
        const index = parseInt(key.split('[')[1].split(']')[0]);
        current = current[arrayKey][index];
      } else {
        current = current[key];
      }
    }
    
    const arrayKey = pathArray[pathArray.length - 1];
    const defaultItem = getDefaultItemForArray(arrayKey);
    current[arrayKey].push(defaultItem);
    
    setFormData(newData);
  };

  const getDefaultItemForArray = (arrayKey) => {
    const defaults = {
      offender_identity_records: {
        identifier_type_id: '',
        identifier_number: '',
        issue_place: '',
        please_specify: ''
      },
      personal_contact_informations: {
        mobile_no: '',
        email: '',
        aliases_name: '',
        spouce_name: ''
      },
      bank_details: {
        account_type_id: '',
        account_no: '',
        ifsc: '',
        bank_name: '',
        branch_name: '',
        depository_id: '',
        agent_name: '',
        mobile_number: ''
      },
      address_details: {
        address_type_id: '',
        master_address_type: '',
        flat_house_no: '',
        premises_building: '',
        post_office: '',
        town_city: '',
        pincode: '',
        district_code: '',
        state_code: '',
        country_id: '',
        designation_role: '',
        business_name: ''
      },
      unknown_contact_informations: {
        person_identity_informations_id: '',
        mobile_no: '',
        email: ''
      }
    };
    return defaults[arrayKey] || {};
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden'
    },
    header: {
      padding: '32px 32px 24px 32px',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: 'white'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 0 8px 0',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      margin: 0
    },
    sectionTabs: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: '#f8fafc',
      padding: '0 32px',
      overflowX: 'auto'
    },
    tab: {
      padding: '16px 24px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      fontSize: '15px',
      fontWeight: '500',
      color: '#64748b',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      position: 'relative'
    },
    activeTab: {
      borderBottom: '3px solid #3b82f6',
      color: '#3b82f6',
      backgroundColor: 'white'
    },
    content: {
      padding: '32px'
    },
    offenderCard: {
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    offenderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e2e8f0'
    },
    offenderTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a202c'
    },
    removeButton: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#dc2626'
      }
    },
    section: {
      marginBottom: '32px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: '#ffffff'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#374151',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#374151',
      letterSpacing: '0.025em'
    },
    required: {
      color: '#ef4444'
    },
    input: {
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      backgroundColor: 'white',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
      }
    },
    select: {
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    textarea: {
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '15px',
      backgroundColor: 'white',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'all 0.2s ease'
    },
    addButton: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    primaryButton: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    secondaryButton: {
      background: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      padding: '16px 32px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'flex-end',
      marginTop: '40px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0'
    },
    subSection: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    addOffenderButton: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  const renderBasicInfo = (offender, offenderIndex) => (
    <div style={styles.section}>
      <h4 style={styles.sectionTitle}>Basic Information</h4>
      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Offender Type ID <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            style={styles.input}
            value={offender.offender_type_id}
            onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_type_id`, e.target.value)}
            placeholder="Enter offender type ID"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Offender Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            style={styles.input}
            value={offender.offender_name}
            onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_name`, e.target.value)}
            placeholder="Enter offender name"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Details Available</label>
          <select
            style={styles.select}
            value={offender.details_available}
            onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].details_available`, e.target.value)}
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderIdentityRecords = (offender, offenderIndex) => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span>Identity Records</span>
        <button
          style={styles.addButton}
          onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].offender_identity_records`)}
        >
          <span>+</span> Add Record
        </button>
      </div>
      {offender.offender_identity_records.map((record, recordIndex) => (
        <div key={recordIndex} style={styles.subSection}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Identifier Type ID</label>
              <input
                type="text"
                style={styles.input}
                value={record.identifier_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].identifier_type_id`, e.target.value)}
                placeholder="Enter identifier type"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Identifier Number</label>
              <input
                type="text"
                style={styles.input}
                value={record.identifier_number}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].identifier_number`, e.target.value)}
                placeholder="Enter identifier number"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Issue Place</label>
              <input
                type="text"
                style={styles.input}
                value={record.issue_place}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].issue_place`, e.target.value)}
                placeholder="Enter issue place"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Please Specify</label>
              <input
                type="text"
                style={styles.input}
                value={record.please_specify}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].please_specify`, e.target.value)}
                placeholder="Please specify"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPersonalDetails = (offender, offenderIndex) => (
    <div style={styles.section}>
      <h4 style={styles.sectionTitle}>Personal Details</h4>
      {offender.personal_details.map((person, personIndex) => (
        <div key={personIndex}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Offender Name</label>
              <input
                type="text"
                style={styles.input}
                value={person.offender_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].offender_name`, e.target.value)}
                placeholder="Enter offender name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Father Name</label>
              <input
                type="text"
                style={styles.input}
                value={person.father_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].father_name`, e.target.value)}
                placeholder="Enter father name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mother Name</label>
              <input
                type="text"
                style={styles.input}
                value={person.mother_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].mother_name`, e.target.value)}
                placeholder="Enter mother name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Type of DOB</label>
              <select
                style={styles.select}
                value={person.type_of_dob}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].type_of_dob`, e.target.value)}
              >
                <option value="">Select DOB type</option>
                <option value="exact">Exact Date</option>
                <option value="approximate">Approximate</option>
                <option value="range">Range</option>
                <option value="year_only">Year Only</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Age</label>
              <input
                type="number"
                style={styles.input}
                value={person.age}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].age`, e.target.value)}
                placeholder="Enter age"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>DOB Range Start</label>
              <input
                type="date"
                style={styles.input}
                value={person.dob_range_start}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_range_start`, e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>DOB Range End</label>
              <input
                type="date"
                style={styles.input}
                value={person.dob_range_end}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_range_end`, e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>DOB Year</label>
              <input
                type="number"
                style={styles.input}
                value={person.dob_year}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_year`, e.target.value)}
                placeholder="Enter birth year"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input
                type="date"
                style={styles.input}
                value={person.dob}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob`, e.target.value)}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Gender</label>
              <select
                style={styles.select}
                value={person.gender}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].gender`, e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nationality ID</label>
              <input
                type="text"
                style={styles.input}
                value={person.nationality_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].nationality_id`, e.target.value)}
                placeholder="Enter nationality ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Entity Type ID</label>
              <input
                type="text"
                style={styles.input}
                value={person.entity_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].entity_type_id`, e.target.value)}
                placeholder="Enter entity type ID"
              />
            </div>
          </div>

          <div style={styles.subSection}>
            <div style={styles.sectionTitle}>
              <span>Contact Information</span>
              <button
                style={styles.addButton}
                onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations`)}
              >
                <span>+</span> Add Contact
              </button>
            </div>
            {person.personal_contact_informations.map((contact, contactIndex) => (
              <div key={contactIndex} style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Mobile Number</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={contact.mobile_no}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].mobile_no`, e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={contact.email}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].email`, e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Aliases Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={contact.aliases_name}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].aliases_name`, e.target.value)}
                    placeholder="Enter aliases"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Spouse Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={contact.spouce_name}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].spouce_name`, e.target.value)}
                    placeholder="Enter spouse name"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBankDetails = (offender, offenderIndex) => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span>Bank Details</span>
        <button
          style={styles.addButton}
          onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].bank_details`)}
        >
          <span>+</span> Add Bank
        </button>
      </div>
      {offender.bank_details.map((bank, bankIndex) => (
        <div key={bankIndex} style={styles.subSection}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Account Type ID</label>
              <input
                type="text"
                style={styles.input}
                value={bank.account_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].account_type_id`, e.target.value)}
                placeholder="Enter account type ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Account Number</label>
              <input
                type="text"
                style={styles.input}
                value={bank.account_no}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].account_no`, e.target.value)}
                placeholder="Enter account number"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>IFSC Code</label>
              <input
                type="text"
                style={styles.input}
                value={bank.ifsc}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].ifsc`, e.target.value)}
                placeholder="Enter IFSC code"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bank Name</label>
              <input
                type="text"
                style={styles.input}
                value={bank.bank_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].bank_name`, e.target.value)}
                placeholder="Enter bank name"
              />
            </div>
            // ...existing code...
            <div style={styles.inputGroup}>
              <label style={styles.label}>Branch Name</label>
              <input
                type="text"
                style={styles.input}
                value={bank.branch_name}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].branch_name`,
                    e.target.value
                  )
                }
                placeholder="Enter branch name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Depository ID</label>
              <input
                type="text"
                style={styles.input}
                value={bank.depository_id}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].depository_id`,
                    e.target.value
                  )
                }
                placeholder="Enter depository ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Agent Name</label>
              <input
                type="text"
                style={styles.input}
                value={bank.agent_name}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].agent_name`,
                    e.target.value
                  )
                }
                placeholder="Enter agent name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number</label>
              <input
                type="tel"
                style={styles.input}
                value={bank.mobile_number}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].mobile_number`,
                    e.target.value
                  )
                }
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Address Details Section
  const renderAddressDetails = (offender, offenderIndex) => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span>Address Details</span>
        <button
          style={styles.addButton}
          onClick={() =>
            addArrayItem(
              `offender_identity_informations[${offenderIndex}].address_details`
            )
          }
        >
          <span>+</span> Add Address
        </button>
      </div>
      {offender.address_details.map((address, addressIndex) => (
        <div key={addressIndex} style={styles.subSection}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Address Type ID</label>
              <input
                type="text"
                style={styles.input}
                value={address.address_type_id}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].address_type_id`,
                    e.target.value
                  )
                }
                placeholder="Enter address type ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Master Address Type</label>
              <input
                type="text"
                style={styles.input}
                value={address.master_address_type}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].master_address_type`,
                    e.target.value
                  )
                }
                placeholder="Enter master address type"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Flat/House No</label>
              <input
                type="text"
                style={styles.input}
                value={address.flat_house_no}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].flat_house_no`,
                    e.target.value
                  )
                }
                placeholder="Enter flat/house no"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Premises/Building</label>
              <input
                type="text"
                style={styles.input}
                value={address.premises_building}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].premises_building`,
                    e.target.value
                  )
                }
                placeholder="Enter premises/building"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Post Office</label>
              <input
                type="text"
                style={styles.input}
                value={address.post_office}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].post_office`,
                    e.target.value
                  )
                }
                placeholder="Enter post office"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Town/City</label>
              <input
                type="text"
                style={styles.input}
                value={address.town_city}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].town_city`,
                    e.target.value
                  )
                }
                placeholder="Enter town/city"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pincode</label>
              <input
                type="text"
                style={styles.input}
                value={address.pincode}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].pincode`,
                    e.target.value
                  )
                }
                placeholder="Enter pincode"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>District Code</label>
              <input
                type="text"
                style={styles.input}
                value={address.district_code}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].district_code`,
                    e.target.value
                  )
                }
                placeholder="Enter district code"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>State Code</label>
              <input
                type="text"
                style={styles.input}
                value={address.state_code}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].state_code`,
                    e.target.value
                  )
                }
                placeholder="Enter state code"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Country ID</label>
              <input
                type="text"
                style={styles.input}
                value={address.country_id}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].country_id`,
                    e.target.value
                  )
                }
                placeholder="Enter country ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Designation/Role</label>
              <input
                type="text"
                style={styles.input}
                value={address.designation_role}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].designation_role`,
                    e.target.value
                  )
                }
                placeholder="Enter designation/role"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Business Name</label>
              <input
                type="text"
                style={styles.input}
                value={address.business_name}
                onChange={(e) =>
                  handleInputChange(
                    `offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].business_name`,
                    e.target.value
                  )
                }
                placeholder="Enter business name"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Unknown Contact Informations Section
  const renderUnknownContactInformations = () => (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>
        <span>Unknown Contact Informations</span>
        <button
          style={styles.addButton}
          onClick={() => addArrayItem('unknown_contact_informations')}
        >
          + Add Unknown Contact
        </button>
      </div>
      {formData.unknown_contact_informations.map((contact, contactIndex) => (
        <div key={contactIndex} style={styles.subSection}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Person Identity Informations ID</label>
              <input
                type="text"
                style={styles.input}
                value={contact.person_identity_informations_id}
                onChange={(e) =>
                  handleInputChange(
                    `unknown_contact_informations[${contactIndex}].person_identity_informations_id`,
                    e.target.value
                  )
                }
                placeholder="Enter person identity informations ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number</label>
              <input
                type="tel"
                style={styles.input}
                value={contact.mobile_no}
                onChange={(e) =>
                  handleInputChange(
                    `unknown_contact_informations[${contactIndex}].mobile_no`,
                    e.target.value
                  )
                }
                placeholder="Enter mobile number"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                value={contact.email}
                onChange={(e) =>
                  handleInputChange(
                    `unknown_contact_informations[${contactIndex}].email`,
                    e.target.value
                  )
                }
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Main Render
  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <div style={styles.title}>Offender Identity Form</div>
          <div style={styles.subtitle}>
            Please fill out all the details below. Fields marked with <span style={styles.required}>*</span> are required.
          </div>
        </div>
        <div style={styles.sectionTabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'basic' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('basic')}
          >
            Basic Info
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'identity' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('identity')}
          >
            Identity Records
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'personal' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('personal')}
          >
            Personal Details
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'bank' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('bank')}
          >
            Bank Details
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'address' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('address')}
          >
            Address Details
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeSection === 'unknown' ? styles.activeTab : {})
            }}
            onClick={() => setActiveSection('unknown')}
          >
            Unknown Contacts
          </button>
        </div>
        <div style={styles.content}>
          {formData.offender_identity_informations.map((offender, offenderIndex) => (
            <div key={offenderIndex} style={styles.offenderCard}>
              <div style={styles.offenderHeader}>
                <span style={styles.offenderTitle}>
                  Offender #{offenderIndex + 1}
                </span>
                {formData.offender_identity_informations.length > 1 && (
                  <button
                    style={styles.removeButton}
                    onClick={() => removeOffender(offenderIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
              {activeSection === 'basic' && renderBasicInfo(offender, offenderIndex)}
              {activeSection === 'identity' && renderIdentityRecords(offender, offenderIndex)}
              {activeSection === 'personal' && renderPersonalDetails(offender, offenderIndex)}
              {activeSection === 'bank' && renderBankDetails(offender, offenderIndex)}
              {activeSection === 'address' && renderAddressDetails(offender, offenderIndex)}
            </div>
          ))}
          {activeSection === 'unknown' && renderUnknownContactInformations()}
          <div style={styles.buttonGroup}>
            <button style={styles.addOffenderButton} onClick={addOffender}>
              + Add Offender
            </button>
            <button style={styles.primaryButton} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffenderIdentityForm;
