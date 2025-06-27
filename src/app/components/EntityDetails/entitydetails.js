import React, { useState } from 'react';
import styles from './OffenderIdentityForm.module.scss';

const OffenderIdentityForm = ({ onDataChange, initialData}) => {
  const [formData, setFormData] = useState(initialData);

  const [activeSection, setActiveSection] = useState('basic');

  const sections = [
    { id: 'basic', title: 'Basic Info', icon: '👤' },
    { id: 'identity', title: 'Identity Records', icon: '🆔' },
    { id: 'personal', title: 'Personal Details', icon: '📋' },
    { id: 'bank', title: 'Bank Details', icon: '🏦' },
    { id: 'address', title: 'Address Details', icon: '📍' },
    { id: 'unknown', title: 'Unknown Contacts', icon: '❓' }
  ];

  // Helper functions for date format conversion
  const convertToInputFormat = (dateStr) => {
    if (!dateStr) return '';
    // If date is in DD/MM/YYYY format, convert to YYYY-MM-DD
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  const convertToDisplayFormat = (dateStr) => {
    if (!dateStr) return '';
    // If date is in YYYY-MM-DD format, convert to DD/MM/YYYY
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    return dateStr;
  };

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

  const renderBasicInfo = (offender, offenderIndex) => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>👤</span> Basic Information
        </h4>
      </div>
      <div className={`${styles.formGrid} ${styles.threeColumns}`}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Offender Type ID <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            value={offender.offender_type_id}
            onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_type_id`, e.target.value)}
            placeholder="Enter offender type ID"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Offender Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            value={offender.offender_name}
            onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_name`, e.target.value)}
            placeholder="Enter offender name"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Details Available</label>
          <select
            className={styles.select}
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
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>🆔</span> Identity Records
        </h4>
        <button
          type="button"
          className={`${styles.addButton} ${styles.warningAdd}`}
          onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].offender_identity_records`)}
        >
          <span>+</span> Add Record
        </button>
      </div>
      {offender.offender_identity_records.map((record, recordIndex) => (
        <div key={recordIndex} className={`${styles.subSection} ${styles.identitySection}`}>
          <div className={`${styles.formGrid} ${styles.twoColumns}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Identifier Type ID</label>
              <input
                type="text"
                className={styles.input}
                value={record.identifier_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].identifier_type_id`, e.target.value)}
                placeholder="Enter identifier type"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Identifier Number</label>
              <input
                type="text"
                className={styles.input}
                value={record.identifier_number}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].identifier_number`, e.target.value)}
                placeholder="Enter identifier number"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Issue Place</label>
              <input
                type="text"
                className={styles.input}
                value={record.issue_place}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].offender_identity_records[${recordIndex}].issue_place`, e.target.value)}
                placeholder="Enter issue place"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Please Specify</label>
              <input
                type="text"
                className={styles.input}
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
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>📋</span> Personal Details
        </h4>
      </div>
      {offender.personal_details.map((person, personIndex) => (
        <div key={personIndex}>
          <div className={`${styles.formGrid} ${styles.threeColumns}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Offender Name</label>
              <input
                type="text"
                className={styles.input}
                value={person.offender_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].offender_name`, e.target.value)}
                placeholder="Enter offender name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Father Name</label>
              <input
                type="text"
                className={styles.input}
                value={person.father_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].father_name`, e.target.value)}
                placeholder="Enter father name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mother Name</label>
              <input
                type="text"
                className={styles.input}
                value={person.mother_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].mother_name`, e.target.value)}
                placeholder="Enter mother name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Type of DOB</label>
              <select
                className={styles.select}
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
            <div className={styles.formGroup}>
              <label className={styles.label}>Age</label>
              <input
                type="number"
                className={styles.input}
                value={person.age}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].age`, e.target.value)}
                placeholder="Enter age"
              />
            </div>
            
            {/* Fixed Date of Birth field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Birth</label>
              <input
                type="date"
                className={styles.input}
                value={person.dob} // Now properly handles YYYY-MM-DD format
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob`, e.target.value)}
              />
            </div>
            
            {/* DOB Range Start field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>DOB Range Start</label>
              <input
                type="date"
                className={styles.input}
                value={person.dob_range_start}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_range_start`, e.target.value)}
              />
            </div>
            
            {/* DOB Range End field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>DOB Range End</label>
              <input
                type="date"
                className={styles.input}
                value={person.dob_range_end}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_range_end`, e.target.value)}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>DOB Year</label>
              <input
                type="number"
                className={styles.input}
                value={person.dob_year}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].dob_year`, e.target.value)}
                placeholder="Enter birth year"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Gender</label>
              <select
                className={styles.select}
                value={person.gender}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].gender`, e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nationality ID</label>
              <input
                type="text"
                className={styles.input}
                value={person.nationality_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].nationality_id`, e.target.value)}
                placeholder="Enter nationality ID"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Entity Type ID</label>
              <input
                type="text"
                className={styles.input}
                value={person.entity_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].entity_type_id`, e.target.value)}
                placeholder="Enter entity type ID"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Business Category</label>
              <input
                type="text"
                className={styles.input}
                value={person.business_category}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].business_category`, e.target.value)}
                placeholder="Enter business category"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Entity Origin ID</label>
              <input
                type="text"
                className={styles.input}
                value={person.entity_origin_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].entity_origin_id`, e.target.value)}
                placeholder="Enter entity origin ID"
              />
            </div>
            
            {/* Fixed Incorporation Date field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Incorporation Date</label>
              <input
                type="date"
                className={styles.input}
                value={person.incorporation_date}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].incorporation_date`, e.target.value)}
              />
            </div>
          </div>

          <div className={`${styles.subSection} ${styles.contactSection}`}>
            <div className={styles.subSectionHeader}>
              <h5 className={styles.subSectionTitle}>
                <span>📞</span> Contact Information
              </h5>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations`)}
              >
                <span>+</span> Add Contact
              </button>
            </div>
            {person.personal_contact_informations.map((contact, contactIndex) => (
              <div key={contactIndex} className={`${styles.formGrid} ${styles.fourColumns}`}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Mobile Number</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={contact.mobile_no}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].mobile_no`, e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={contact.email}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].email`, e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Aliases Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={contact.aliases_name}
                    onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].personal_details[${personIndex}].personal_contact_informations[${contactIndex}].aliases_name`, e.target.value)}
                    placeholder="Enter aliases"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Spouse Name</label>
                  <input
                    type="text"
                    className={styles.input}
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
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>🏦</span> Bank Details
        </h4>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].bank_details`)}
        >
          <span>+</span> Add Bank
        </button>
      </div>
      {offender.bank_details.map((bank, bankIndex) => (
        <div key={bankIndex} className={`${styles.subSection} ${styles.bankSection}`}>
          <div className={`${styles.formGrid} ${styles.threeColumns}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Account Type ID</label>
              <input
                type="text"
                className={styles.input}
                value={bank.account_type_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].account_type_id`, e.target.value)}
                placeholder="Enter account type ID"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Account Number</label>
              <input
                type="text"
                className={styles.input}
                value={bank.account_no}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].account_no`, e.target.value)}
                placeholder="Enter account number"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>IFSC Code</label>
              <input
                type="text"
                className={styles.input}
                value={bank.ifsc}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].ifsc`, e.target.value)}
                placeholder="Enter IFSC code"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Bank Name</label>
              <input
                type="text"
                className={styles.input}
                value={bank.bank_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].bank_name`, e.target.value)}
                placeholder="Enter bank name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Branch Name</label>
              <input
                type="text"
                className={styles.input}
                value={bank.branch_name}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].branch_name`, e.target.value)}
                placeholder="Enter branch name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="tel"
                className={styles.input}
                value={bank.mobile_number}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].bank_details[${bankIndex}].mobile_number`, e.target.value)}
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAddressDetails = (offender, offenderIndex) => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>📍</span> Address Details
        </h4>
        <button
          type="button"
          className={`${styles.addButton} ${styles.primaryAdd}`}
          onClick={() => addArrayItem(`offender_identity_informations[${offenderIndex}].address_details`)}
        >
          <span>+</span> Add Address
        </button>
      </div>
      {offender.address_details.map((address, addressIndex) => (
        <div key={addressIndex} className={`${styles.subSection} ${styles.addressSection}`}>
          <div className={`${styles.formGrid} ${styles.threeColumns}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Flat/House No</label>
              <input
                type="text"
                className={styles.input}
                value={address.flat_house_no}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].flat_house_no`, e.target.value)}
                placeholder="Enter flat/house no"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Premises/Building</label>
              <input
                type="text"
                className={styles.input}
                value={address.premises_building}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].premises_building`, e.target.value)}
                placeholder="Enter premises/building"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Town/City</label>
              <input
                type="text"
                className={styles.input}
                value={address.town_city}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].town_city`, e.target.value)}
                placeholder="Enter town/city"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pincode</label>
              <input
                type="text"
                className={styles.input}
                value={address.pincode}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].pincode`, e.target.value)}
                placeholder="Enter pincode"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>State Code</label>
              <input
                type="text"
                className={styles.input}
                value={address.state_code}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].state_code`, e.target.value)}
                placeholder="Enter state code"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Country ID</label>
              <input
                type="text"
                className={styles.input}
                value={address.country_id}
                onChange={(e) => handleInputChange(`offender_identity_informations[${offenderIndex}].address_details[${addressIndex}].country_id`, e.target.value)}
                placeholder="Enter country ID"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUnknownContactInformations = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>
          <span>❓</span> Unknown Contact Informations
        </h4>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => addArrayItem('unknown_contact_informations')}
        >
          <span>+</span> Add Unknown Contact
        </button>
      </div>
      {formData.unknown_contact_informations.map((contact, contactIndex) => (
        <div key={contactIndex} className={`${styles.subSection} ${styles.unknownSection}`}>
          <div className={`${styles.formGrid} ${styles.threeColumns}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Person Identity Informations ID</label>
              <input
                type="text"
                className={styles.input}
                value={contact.person_identity_informations_id}
                onChange={(e) => handleInputChange(`unknown_contact_informations[${contactIndex}].person_identity_informations_id`, e.target.value)}
                placeholder="Enter person identity informations ID"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="tel"
                className={styles.input}
                value={contact.mobile_no}
                onChange={(e) => handleInputChange(`unknown_contact_informations[${contactIndex}].mobile_no`, e.target.value)}
                placeholder="Enter mobile number"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={contact.email}
                onChange={(e) => handleInputChange(`unknown_contact_informations[${contactIndex}].email`, e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.formContainer}>
      {/* Header */}
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Entity Details Form</h2>
        <p className={styles.formSubtitle}>
          Please fill out all the details below. Fields marked with <span className={styles.required}>*</span> are required.
        </p>
      </div>

      {/* Section Navigation */}
      <div className={styles.sectionTabs}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.sectionTab} ${activeSection === section.id ? styles.activeTab : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className={styles.tabIcon}>{section.icon}</span>
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className={styles.formContent}>
        {formData.offender_identity_informations.map((offender, offenderIndex) => (
          <div key={offenderIndex} className={styles.offenderCard}>
            <div className={styles.offenderHeader}>
              <h3 className={styles.offenderTitle}>
                Offender #{offenderIndex + 1}
                <span className={styles.offenderNumber}>#{offenderIndex + 1}</span>
              </h3>
              {formData.offender_identity_informations.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeOffender(offenderIndex)}
                >
                  Remove Offender
                </button>
              )}
            </div>

            {/* Render content based on active section */}
            {activeSection === 'basic' && renderBasicInfo(offender, offenderIndex)}
            {activeSection === 'identity' && renderIdentityRecords(offender, offenderIndex)}
            {activeSection === 'personal' && renderPersonalDetails(offender, offenderIndex)}
            {activeSection === 'bank' && renderBankDetails(offender, offenderIndex)}
            {activeSection === 'address' && renderAddressDetails(offender, offenderIndex)}
          </div>
        ))}

        {/* Unknown Contact Informations */}
        {activeSection === 'unknown' && renderUnknownContactInformations()}

        {/* Entry Info */}
        <div className={styles.entryInfo}>
          <span className={styles.entryLabel}>Last Updated:</span>
          <span className={styles.entryDetails}>
            {new Date().toLocaleString()} by System User
          </span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.addButton}
            onClick={addOffender}
          >
            <span>+</span> Add Offender
          </button>
          <button
            type="button"
            className={styles.draftButton}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.primaryButton}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffenderIdentityForm;