// components/DGGIForm.jsx
import { useState } from 'react';
import styles from './DGGIForm.module.scss';

const DGGIForm = ({ onSubmit, onReset }) => {
  const [activeTab, setActiveTab] = useState('search_seizure');
  const [formData, setFormData] = useState({
    search_seizure: {
      file_no: '',
      enquiry_initiated_id: '',
      date_of_incident_report: '',
      total_taxable_value: '',
      tax: '',
      interest: '',
      penalty: '',
      total: '',
      whether_search_made: '',
      whether_seizure_made: '',
      date_of_search: '',
      total_amount_of_seizure: '',
      property_type_seized: '',
      brief_facts_case: '',
      supply_details: [{ custom_tariff_id: '', customs_tariff_code: '', customs_tariff_description: '', description_impugned_supply: '' }],
      tax_deposit: [{ tax_cash: '', tax_credit: '', interest: '', penalty: '' }],
      seizure_address_records: [{ master_address_type: '', name_of_business: '', designation_role: '', flat_house_no: '', post_office: '', premises_building: '', country_id: '', state_code: '', district_code: '', town_city: '', pincode: '' }],
      goods_trades: [{ name_of_goods: '', quantity: '', unit: '', value: '', remarks: '' }],
      electronics_digital: [{ device_type: '', quantity: '', value: '', remarks: '' }],
      currencies: [{ currency: '', denomination: '', number: '', total_faced_value: '', total_faced_value_inr: '', remarks: '' }],
      arms_ammunitions: [{ arms_name: '', quantity: '', value: '', remarks: '' }],
      ndps: [{ drug_name: '', quantity: '', unit: '', mode_of_packaging: '', value: '', remarks: '' }],
      ficns: [{ quality: '', denomination: '', number: '', total_face_value: '', remarks: '' }],
      vehicles: [{ vehicle_no: '', name_of_owner: '', value: '', remarks: '' }],
      bank_seizure_accounts: [{ account_no: '', ifsc: '', bank_name: '', branch_name: '', amount: '', remarks: '' }],
      jewellery_gems: [{ type_jewellery_gems: '', quantity: '', unit: '', value: '', remark: '' }],
      precious_metals: [{ details: '', quantity: '', unit: '', value: '', remarks: '' }],
      share_certificates: [{ name_of_company: '', face_value: '', quantity: '', market_value: '', date_of_issue: '', value: '', remarks: '' }],
      deposit_certificates: [{ type_of_certificates: '', principal_amount: '', maturity_date: '', value: '', remarks: '' }],
      crypto_wallets: [{ name_of_wallet: '', name_of_coins: '', quantity: '', value: '', remarks: '' }],
      demate_account_details: [{ demat_account_no: '', agent_name: '', depository_name: '', value: '', remarks: '' }],
      flora_faunas: [{ name: '', quantity: '', unit: '', value: '', remarks: '' }],
      plant_machineries: [{ name: '', quantity: '', unit: '', value: '', remarks: '' }],
      im_address_details: [{ address_type: '', flat_house_no: '', post_office: '', premises_building: '', town_city: '', pincode: '', country_id: '', state_code: '', district_code: '', Value: '', remarks: '' }],
      document_details: [{ document_name: '', document_file: '' }]
    },
    show_cause_notice: {
      scn_closure: '',
      file_no: '',
      scn_closure_no: '',
      scn_closure_date: '',
      gist: '',
      issuing_authority: '',
      adjudication_authority: '',
      gst_offenders_records: [{ entity: [{ entity_id: [''] }], tax_demanded: '', type_of_penalty: '', penalty_demanded: '', tax_paid_cash: '', tax_paid_credit: '', interest_paid: '', penalty_paid: '' }],
      document_details: [{ document_name: '', document_file: '' }]
    },
    order_in_original: {
      file_no: '',
      scn_no: [{ scn_no_id: '' }],
      oio_no: '',
      date_of_order: '',
      gist: '',
      is_confiscation_order_id: '',
      value_confiscation_goods: '',
      type_of_confiscation: '',
      redemption_fine: '',
      tax_implications: [{ entity: [{ entity_id: [''] }], status: '', tax: '', interest: '', penalty: '' }],
      document_details: [{ document_name: '', document_file: '' }]
    },
    prosecution: {
      file_no: '',
      is_arrest_bail: '',
      gist: '',
      arrest_bails: [{ entity: [{ entity_id: [''] }], date_of_arrest: '', which_court_granted_bail_id: '', date_of_release: '' }],
      prosecution_application: [{ charg_complaint_no: '', entity: [{ entity_id: [''] }], court_name: '', date_of_filing: '', court_case_no: '', gist_complaint: '', prosecution_order: [{ order_no: '', date_of_order: '', gist_of_order: '', status_id: '' }] }]
    },
    commissioner_appeals: {
      filed_by_id: '',
      file_no: '',
      appeal_no: '',
      date_of_filing: '',
      appellant_name: [{ appellant_name_id: [''] }],
      order_no: '',
      date_of_order: '',
      gist: '',
      amount_involved: '',
      status: '',
      document_details: [{ document_name: '', document_file: '' }]
    },
    cestat_appeals: {
      filed_by_id: '',
      file_no: '',
      appeal_no: '',
      date_of_filing: '',
      appellant_name: [{ appellant_name_id: [''] }],
      order_no: '',
      date_of_order: '',
      gist: '',
      amount_involved: '',
      status: '',
      document_details: [{ document_name: '', document_file: '' }]
    },
    high_court_appeals: {
      filed_by_id: '',
      file_no: '',
      appeal_no: '',
      date_of_filing: '',
      appellant_name: [{ appellant_name_id: [''] }],
      order_no: '',
      date_of_order: '',
      gist: '',
      amount_involved: '',
      status: '',
      document_details: [{ document_name: '', document_file: '' }]
    },
    supreme_court_appeals: {
      filed_by_id: '',
      file_no: '',
      appeal_no: '',
      date_of_filing: '',
      appellant_name: [{ appellant_name_id: [''] }],
      order_no: '',
      date_of_order: '',
      gist: '',
      amount_involved: '',
      status: '',
      document_details: [{ document_name: '', document_file: '' }]
    }
  });

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

  const renderSearchSeizure = () => (
    <div className={styles.tabContent}>
      <h3>Search & Seizure Details</h3>
      
      <div className={styles.row}>
        <div className={styles.field}>
          <label>File Number</label>
          <input
            type="text"
            value={formData.search_seizure.file_no}
            onChange={(e) => handleInputChange('search_seizure', 'file_no', e.target.value)}
            placeholder="Enter file number"
          />
        </div>
        <div className={styles.field}>
          <label>Enquiry Initiated ID</label>
          <input
            type="text"
            value={formData.search_seizure.enquiry_initiated_id}
            onChange={(e) => handleInputChange('search_seizure', 'enquiry_initiated_id', e.target.value)}
            placeholder="Enter enquiry initiated ID"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Date of Incident Report</label>
          <input
            type="date"
            value={formData.search_seizure.date_of_incident_report}
            onChange={(e) => handleInputChange('search_seizure', 'date_of_incident_report', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Total Taxable Value</label>
          <input
            type="number"
            value={formData.search_seizure.total_taxable_value}
            onChange={(e) => handleInputChange('search_seizure', 'total_taxable_value', e.target.value)}
            placeholder="Enter total taxable value"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Tax</label>
          <input
            type="number"
            value={formData.search_seizure.tax}
            onChange={(e) => handleInputChange('search_seizure', 'tax', e.target.value)}
            placeholder="Enter tax amount"
          />
        </div>
        <div className={styles.field}>
          <label>Interest</label>
          <input
            type="number"
            value={formData.search_seizure.interest}
            onChange={(e) => handleInputChange('search_seizure', 'interest', e.target.value)}
            placeholder="Enter interest amount"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Whether Search Made</label>
          <select
            value={formData.search_seizure.whether_search_made}
            onChange={(e) => handleInputChange('search_seizure', 'whether_search_made', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Whether Seizure Made</label>
          <select
            value={formData.search_seizure.whether_seizure_made}
            onChange={(e) => handleInputChange('search_seizure', 'whether_seizure_made', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Brief Facts of Case</label>
        <textarea
          value={formData.search_seizure.brief_facts_case}
          onChange={(e) => handleInputChange('search_seizure', 'brief_facts_case', e.target.value)}
          placeholder="Enter brief facts of the case"
          rows={4}
        />
      </div>

      {/* Goods & Trades Section */}
      <div className={styles.arraySection}>
        <div className={styles.arrayHeader}>
          <h4>Goods & Trades</h4>
          <button
            type="button"
            onClick={() => addArrayItem('search_seizure', 'goods_trades', { name_of_goods: '', quantity: '', unit: '', value: '', remarks: '' })}
            className={styles.addButton}
          >
            + Add Item
          </button>
        </div>
        
        {formData.search_seizure.goods_trades.map((item, index) => (
          <div key={index} className={styles.arrayItem}>
            <div className={styles.arrayItemHeader}>
              <span>Item {index + 1}</span>
              <button
                type="button"
                onClick={() => removeArrayItem('search_seizure', 'goods_trades', index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Name of Goods</label>
                <input
                  type="text"
                  value={item.name_of_goods}
                  onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'name_of_goods')}
                  placeholder="Enter name of goods"
                />
              </div>
              <div className={styles.field}>
                <label>Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'quantity')}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Unit</label>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'unit')}
                  placeholder="Enter unit"
                />
              </div>
              <div className={styles.field}>
                <label>Value</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'value')}
                  placeholder="Enter value"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>Remarks</label>
              <textarea
                value={item.remarks}
                onChange={(e) => handleInputChange('search_seizure', 'goods_trades', e.target.value, index, 'remarks')}
                placeholder="Enter remarks"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Currencies Section */}
      <div className={styles.arraySection}>
        <div className={styles.arrayHeader}>
          <h4>Currencies</h4>
          <button
            type="button"
            onClick={() => addArrayItem('search_seizure', 'currencies', { currency: '', denomination: '', number: '', total_faced_value: '', total_faced_value_inr: '', remarks: '' })}
            className={styles.addButton}
          >
            + Add Currency
          </button>
        </div>
        
        {formData.search_seizure.currencies.map((item, index) => (
          <div key={index} className={styles.arrayItem}>
            <div className={styles.arrayItemHeader}>
              <span>Currency {index + 1}</span>
              <button
                type="button"
                onClick={() => removeArrayItem('search_seizure', 'currencies', index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Currency</label>
                <input
                  type="text"
                  value={item.currency}
                  onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'currency')}
                  placeholder="Enter currency type"
                />
              </div>
              <div className={styles.field}>
                <label>Denomination</label>
                <input
                  type="text"
                  value={item.denomination}
                  onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'denomination')}
                  placeholder="Enter denomination"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Number</label>
                <input
                  type="number"
                  value={item.number}
                  onChange={(e) => handleInputChange('search_seizure', 'currencies', e.target.value, index, 'number')}
                  placeholder="Enter number"
                />
              </div>
              <div className={styles.field}>
                <label>Total Face Value (INR)</label>
                <input
                  type="number"
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
    <div className={styles.tabContent}>
      <h3>Show Cause Notice</h3>
      
      <div className={styles.row}>
        <div className={styles.field}>
          <label>File Number</label>
          <input
            type="text"
            value={formData.show_cause_notice.file_no}
            onChange={(e) => handleInputChange('show_cause_notice', 'file_no', e.target.value)}
            placeholder="Enter file number"
          />
        </div>
        <div className={styles.field}>
          <label>SCN Closure Number</label>
          <input
            type="text"
            value={formData.show_cause_notice.scn_closure_no}
            onChange={(e) => handleInputChange('show_cause_notice', 'scn_closure_no', e.target.value)}
            placeholder="Enter SCN closure number"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>SCN Closure Date</label>
          <input
            type="date"
            value={formData.show_cause_notice.scn_closure_date}
            onChange={(e) => handleInputChange('show_cause_notice', 'scn_closure_date', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Issuing Authority</label>
          <input
            type="text"
            value={formData.show_cause_notice.issuing_authority}
            onChange={(e) => handleInputChange('show_cause_notice', 'issuing_authority', e.target.value)}
            placeholder="Enter issuing authority"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Gist</label>
        <textarea
          value={formData.show_cause_notice.gist}
          onChange={(e) => handleInputChange('show_cause_notice', 'gist', e.target.value)}
          placeholder="Enter gist of the notice"
          rows={4}
        />
      </div>
    </div>
  );

  const renderProsecution = () => (
    <div className={styles.tabContent}>
      <h3>Prosecution Details</h3>
      
      <div className={styles.row}>
        <div className={styles.field}>
          <label>File Number</label>
          <input
            type="text"
            value={formData.prosecution.file_no}
            onChange={(e) => handleInputChange('prosecution', 'file_no', e.target.value)}
            placeholder="Enter file number"
          />
        </div>
        <div className={styles.field}>
          <label>Is Arrest/Bail</label>
          <select
            value={formData.prosecution.is_arrest_bail}
            onChange={(e) => handleInputChange('prosecution', 'is_arrest_bail', e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Gist</label>
        <textarea
          value={formData.prosecution.gist}
          onChange={(e) => handleInputChange('prosecution', 'gist', e.target.value)}
          placeholder="Enter gist of prosecution"
          rows={4}
        />
      </div>
    </div>
  );

  const renderAppeals = (section, title) => (
    <div className={styles.tabContent}>
      <h3>{title}</h3>
      
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Filed By ID</label>
          <input
            type="text"
            value={formData[section].filed_by_id}
            onChange={(e) => handleInputChange(section, 'filed_by_id', e.target.value)}
            placeholder="Enter filed by ID"
          />
        </div>
        <div className={styles.field}>
          <label>Appeal Number</label>
          <input
            type="text"
            value={formData[section].appeal_no}
            onChange={(e) => handleInputChange(section, 'appeal_no', e.target.value)}
            placeholder="Enter appeal number"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Date of Filing</label>
          <input
            type="date"
            value={formData[section].date_of_filing}
            onChange={(e) => handleInputChange(section, 'date_of_filing', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Date of Order</label>
          <input
            type="date"
            value={formData[section].date_of_order}
            onChange={(e) => handleInputChange(section, 'date_of_order', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Amount Involved</label>
          <input
            type="number"
            value={formData[section].amount_involved}
            onChange={(e) => handleInputChange(section, 'amount_involved', e.target.value)}
            placeholder="Enter amount involved"
          />
        </div>
        <div className={styles.field}>
          <label>Status</label>
          <select
            value={formData[section].status}
            onChange={(e) => handleInputChange(section, 'status', e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="disposed">Disposed</option>
            <option value="allowed">Allowed</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Gist</label>
        <textarea
          value={formData[section].gist}
          onChange={(e) => handleInputChange(section, 'gist', e.target.value)}
          placeholder="Enter gist of the appeal"
          rows={4}
        />
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
        return (
          <div className={styles.tabContent}>
            <h3>Order in Original</h3>
            <p>Order in Original form content will be implemented here...</p>
          </div>
        );
      case 'prosecution':
        return renderProsecution();
      case 'commissioner_appeals':
        return renderAppeals('commissioner_appeals', 'Commissioner Appeals');
      case 'cestat_appeals':
        return renderAppeals('cestat_appeals', 'CESTAT Appeals');
      case 'high_court_appeals':
        return renderAppeals('high_court_appeals', 'High Court Appeals');
      case 'supreme_court_appeals':
        return renderAppeals('supreme_court_appeals', 'Supreme Court Appeals');
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DGGI Case Management</h1>
      
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {renderTabContent()}

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
    </div>
  );
};

export default DGGIForm;