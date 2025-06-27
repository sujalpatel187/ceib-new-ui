// components/DGGIForm.jsx
import { useState } from 'react';
import styles from './DGGIForm.module.scss';

const DGGIForm = ({ onSubmit, onReset, initialData }) => {
  const [activeTab, setActiveTab] = useState('search_seizure');
  const [formData, setFormData] = useState(initialData);

  const tabs = [
    { id: 'search_seizure', label: 'Search & Seizure', icon: '🔍' },
    { id: 'show_cause_notice', label: 'Show Cause Notice', icon: '📋' },
    { id: 'order_in_original', label: 'Order in Original', icon: '📄' },
    { id: 'prosecution', label: 'Prosecution', icon: '⚖️' },
    { id: 'commissioner_appeals', label: 'Commissioner Appeals', icon: '📑' },
    { id: 'cestat_appeals', label: 'CESTAT Appeals', icon: '🏛️' },
    { id: 'high_court_appeals', label: 'High Court Appeals', icon: '🏛️' },
    { id: 'supreme_court_appeals', label: 'Supreme Court Appeals', icon: '⚖️' }
  ];

  const handleInputChange = (section, field, value, index = null, subField = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        if (subField) {
          newData[section][field][index][subField] = value;
        } else {
          newData[section][field][index] = value;
        }
      } else {
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  const addArrayItem = (section, field, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultItem]
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiData = {
      dggi: formData
    };
    onSubmit?.(apiData);
  };

  const handleReset = () => {
    // Reset form data logic here
    onReset?.();
  };

  const renderFormGroup = (label, name, type = 'text', options = [], required = false, section = activeTab) => (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {type === 'select' ? (
        <select
          className={styles.select}
          value={formData[section][name] || ''}
          onChange={(e) => handleInputChange(section, name, e.target.value)}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={styles.textarea}
          value={formData[section][name] || ''}
          onChange={(e) => handleInputChange(section, name, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          value={formData[section][name] || ''}
          onChange={(e) => handleInputChange(section, name, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
const renderSearchSeizure = () => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <h3 className={styles.sectionTitle}>
        🔍 Search & Seizure Details
      </h3>
    </div>

    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>📁 Case Information</h4>
      </div>
      <div className={styles.formGrid}>
        {renderFormGroup('File Number', 'file_no', 'text', [], true)}
        {renderFormGroup('Enquiry Initiated ID', 'enquiry_initiated_id', 'text', [], true)}
        {renderFormGroup('Date of Incident Report', 'date_of_incident_report', 'date', [], true)}
      </div>
    </div>

    
    {/* Supply Details Section */}
    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>📋 Supply Details</h4>
        <button
          type="button"
          onClick={() => addArrayItem('search_seizure', 'supply_details', { 
            custom_tariff_id: '', 
            customs_tariff_code: '', 
            customs_tariff_description: '', 
            description_impugned_supply: '' 
          })}
          className={styles.addButton}
        >
          + Add Supply Detail
        </button>
      </div>
      
      {formData.search_seizure.supply_details.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <div className={styles.arrayItemHeader}>
            <span className={styles.itemNumber}>Supply Detail {index + 1}</span>
            <button
              type="button"
              onClick={() => removeArrayItem('search_seizure', 'supply_details', index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Custom Tariff ID</label>
              <input
                type="text"
                className={styles.input}
                value={item.custom_tariff_id}
                onChange={(e) => handleInputChange('search_seizure', 'supply_details', e.target.value, index, 'custom_tariff_id')}
                placeholder="Enter custom tariff ID"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Customs Tariff Code</label>
              <input
                type="text"
                className={styles.input}
                value={item.customs_tariff_code}
                onChange={(e) => handleInputChange('search_seizure', 'supply_details', e.target.value, index, 'customs_tariff_code')}
                placeholder="Enter customs tariff code"
              />
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Customs Tariff Description</label>
              <textarea
                className={styles.textarea}
                value={item.customs_tariff_description}
                onChange={(e) => handleInputChange('search_seizure', 'supply_details', e.target.value, index, 'customs_tariff_description')}
                placeholder="Enter customs tariff description"
                rows={3}
              />
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description of Impugned Supply</label>
              <textarea
                className={styles.textarea}
                value={item.description_impugned_supply}
                onChange={(e) => handleInputChange('search_seizure', 'supply_details', e.target.value, index, 'description_impugned_supply')}
                placeholder="Enter description of impugned supply"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>💰 Financial Details</h4>
      </div>
      <div className={styles.formGrid}>
        {renderFormGroup('Total Taxable Value', 'total_taxable_value', 'number')}
        {renderFormGroup('Tax', 'tax', 'number')}
        {renderFormGroup('Interest', 'interest', 'number')}
      </div>
    </div>

    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>🔎 Search & Seizure Status</h4>
      </div>
      <div className={styles.formGrid}>
        {renderFormGroup('Whether Search Made', 'whether_search_made', 'select', [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ])}
        {renderFormGroup('Whether Seizure Made', 'whether_seizure_made', 'select', [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ])}
      </div>
      <div className={styles.formGrid}>
        {renderFormGroup('Brief Facts of Case', 'brief_facts_case', 'textarea')}
      </div>
    </div>


    {/* Goods & Trades Section */}
    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>📦 Goods & Trades</h4>
        <button
          type="button"
          onClick={() => addArrayItem('search_seizure', 'goods_trades', { 
            name_of_goods: '', quantity: '', unit: '', value: '', remarks: '' 
          })}
          className={styles.addButton}
        >
          + Add Item
        </button>
      </div>
      
      {formData.search_seizure.goods_trades.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <div className={styles.arrayItemHeader}>
            <span className={styles.itemNumber}>Item {index + 1}</span>
            <button
              type="button"
              onClick={() => removeArrayItem('search_seizure', 'goods_trades', index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name of Goods</label>
              <input
                type="text"
                className={styles.input}
                value={item.name_of_goods}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'name_of_goods')}
                placeholder="Enter name of goods"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Quantity</label>
              <input
                type="number"
                className={styles.input}
                value={item.quantity}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'quantity')}
                placeholder="Enter quantity"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Unit</label>
              <input
                type="text"
                className={styles.input}
                value={item.unit}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'unit')}
                placeholder="Enter unit"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Value</label>
              <input
                type="number"
                className={styles.input}
                value={item.value}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'value')}
                placeholder="Enter value"
              />
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Remarks</label>
              <textarea
                className={styles.textarea}
                value={item.remarks}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'remarks')}
                placeholder="Enter remarks"
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Currencies Section */}
    <div className={styles.subSection}>
      <div className={styles.subSectionHeader}>
        <h4 className={styles.subSectionTitle}>💱 Currencies</h4>
        <button
          type="button"
          onClick={() => addArrayItem('search_seizure', 'currencies', { 
            currency: '', denomination: '', number: '', total_faced_value: '', total_faced_value_inr: '', remarks: '' 
          })}
          className={styles.addButton}
        >
          + Add Currency
        </button>
      </div>
      
      {formData.search_seizure.currencies.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <div className={styles.arrayItemHeader}>
            <span className={styles.itemNumber}>Currency {index + 1}</span>
            <button
              type="button"
              onClick={() => removeArrayItem('search_seizure', 'currencies', index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Currency</label>
              <input
                type="text"
                className={styles.input}
                value={item.currency}
                onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'currency')}
                placeholder="Enter currency type"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Denomination</label>
              <input
                type="text"
                className={styles.input}
                value={item.denomination}
                onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'denomination')}
                placeholder="Enter denomination"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Number</label>
              <input
                type="number"
                className={styles.input}
                value={item.number}
                onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'number')}
                placeholder="Enter number"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Face Value (INR)</label>
              <input
                type="number"
                className={styles.input}
                value={item.total_faced_value_inr}
                onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'total_faced_value_inr')}
                placeholder="Enter total face value in INR"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  const renderShowCauseNotice = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          📋 Show Cause Notice
        </h3>
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h4 className={styles.subSectionTitle}>📁 Notice Details</h4>
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('File Number', 'file_no', 'text', [], true)}
          {renderFormGroup('SCN Closure Number', 'scn_closure_no', 'text', [], true)}
          {renderFormGroup('SCN Closure Date', 'scn_closure_date', 'date', [], true)}
          {renderFormGroup('Issuing Authority', 'issuing_authority', 'text', [], true)}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Gist', 'gist', 'textarea')}
        </div>
      </div>
    </div>
  );

  const renderOrderInOriginal = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          📄 Order in Original
        </h3>
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h4 className={styles.subSectionTitle}>📁 Order Details</h4>
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('File Number', 'file_no', 'text', [], true)}
          {renderFormGroup('Order Number', 'order_no', 'text', [], true)}
          {renderFormGroup('Order Date', 'order_date', 'date', [], true)}
          {renderFormGroup('Issuing Authority', 'issuing_authority', 'text', [], true)}
        </div>
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h4 className={styles.subSectionTitle}>💰 Amount Details</h4>
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Amount Confirmed', 'amount_confirmed', 'number')}
          {renderFormGroup('Amount Reduced', 'amount_reduced', 'number')}
          {renderFormGroup('Amount Dropped', 'amount_dropped', 'number')}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Gist', 'gist', 'textarea')}
        </div>
      </div>
    </div>
  );

  const renderProsecution = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          ⚖️ Prosecution Details
        </h3>
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h4 className={styles.subSectionTitle}>📁 Case Information</h4>
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('File Number', 'file_no', 'text', [], true)}
          {renderFormGroup('Complaint Number', 'complaint_no', 'text')}
          {renderFormGroup('Complaint Date', 'complaint_date', 'date')}
          {renderFormGroup('Court Name', 'court_name', 'text')}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Is Arrest/Bail', 'is_arrest_bail', 'select', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ])}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Gist', 'gist', 'textarea')}
        </div>
      </div>
    </div>
  );

  const renderAppeals = (section, title, icon) => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          {icon} {title}
        </h3>
      </div>

      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h4 className={styles.subSectionTitle}>📁 Appeal Information</h4>
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Filed By ID', 'filed_by_id', 'text', [], false, section)}
          {renderFormGroup('Appeal Number', 'appeal_no', 'text', [], true, section)}
          {renderFormGroup('Date of Filing', 'date_of_filing', 'date', [], true, section)}
          {renderFormGroup('Date of Order', 'date_of_order', 'date', [], false, section)}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Amount Involved', 'amount_involved', 'number', [], false, section)}
          {renderFormGroup('Status', 'status', 'select', [
            { value: 'pending', label: 'Pending' },
            { value: 'disposed', label: 'Disposed' },
            { value: 'allowed', label: 'Allowed' },
            { value: 'dismissed', label: 'Dismissed' }
          ], true, section)}
        </div>
        <div className={styles.formGrid}>
          {renderFormGroup('Gist', 'gist', 'textarea', [], false, section)}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'search_seizure':
        return renderSearchSeizure();
      case 'show_cause_notice':
        return renderShowCauseNotice();
      case 'order_in_original':
        return renderOrderInOriginal();
      case 'prosecution':
        return renderProsecution();
      case 'commissioner_appeals':
        return renderAppeals('commissioner_appeals', 'Commissioner Appeals', '📑');
      case 'cestat_appeals':
        return renderAppeals('cestat_appeals', 'CESTAT Appeals', '🏛️');
      case 'high_court_appeals':
        return renderAppeals('high_court_appeals', 'High Court Appeals', '🏛️');
      case 'supreme_court_appeals':
        return renderAppeals('supreme_court_appeals', 'Supreme Court Appeals', '⚖️');
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Header Section */}
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>DGGI Case Management System</h1>
        <p className={styles.formSubtitle}>
          Please fill out the case identification details. Fields marked with <span className={styles.required}>*</span> are required.
        </p>
      </div>

      {/* Section Navigation Tabs */}
      <div className={styles.sectionTabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.sectionTab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className={styles.formContent}>
        <form onSubmit={handleSubmit}>
          {renderTabContent()}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button type="button" className={styles.draftButton} onClick={handleReset}>
              💾 Save as Draft
            </button>
            <button type="button" className={styles.secondaryButton} onClick={handleReset}>
              🔄 Reset Form
            </button>
            <button type="submit" className={styles.primaryButton}>
              ✅ Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DGGIForm;