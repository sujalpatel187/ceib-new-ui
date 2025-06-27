'use client';
// components/SplitLayout.js
import { useState } from 'react';
import styles from './SplitLayout.module.scss';
import Canvas from '../components/Canvas/Canvas';
import OffenderIdentityForm from '../components/EntityDetails/entitydetails';
import CaseIdentifiers from '../components/CaseAttributes/CaseAtrributes';
import DGGIForm from '../components/Dggicompo/DGGIComponent';
import CaseAttributes from '../components/CaseAttributes/CaseAtrributes';

const SplitLayout = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    // Case Identifiers
    case_id: '',
    file_no: '',
    case_order_no: '',
    case_name: '',
    offence_date: '',
    // Entity Details
    reportingAgency: '',
    dateOfOffence: '',
    caseNumberOrderNumber: '',
    fileNumber: '',
    caseName: '',
    // Case Attributes
    priority: '',
    status: '',
    // Offence Details
    offenceType: '',
    description: ''
  });

  const tabs = [
    { id: 1, title: 'Case Identifiers', completed: true },
    { id: 2, title: 'Entity Details', completed: false },
    { id: 3, title: 'Case Attributes', completed: false },
    { id: 4, title: 'Offence Details', completed: false }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className={styles.tabContent}>
            <h3>Case Identifiers</h3>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="case_id" className={styles.label}>
                  Case ID <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="case_id"
                  name="case_id"
                  value={formData.case_id}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter case ID..."
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="file_no" className={styles.label}>
                  File Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="file_no"
                  name="file_no"
                  value={formData.file_no}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter file number..."
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="case_order_no" className={styles.label}>
                  Case/Order Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="case_order_no"
                  name="case_order_no"
                  value={formData.case_order_no}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter case/order number..."
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="offence_date" className={styles.label}>
                  Offence Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  id="offence_date"
                  name="offence_date"
                  value={formData.offence_date}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={`${styles.formRow} ${styles.singleColumn}`}>
              <div className={styles.inputGroup}>
                <label htmlFor="case_name" className={styles.label}>
                  Case Name
                </label>
                <input
                  type="text"
                  id="case_name"
                  name="case_name"
                  value={formData.case_name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter case name..."
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.primaryButton}>
                Save & Continue
              </button>
              <button type="button" className={styles.secondaryButton}>
                Reset
              </button>
            </div>
          </div>
        );
      case 2:
        return <OffenderIdentityForm />;
      case 3:
        return <CaseAttributes />;
      case 4:
        return <DGGIForm />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.caseInfo}>
            <span>Case No. / Order No.:</span>
            <span>00062</span>
          </div>
          <div className={styles.eowBadge}>EOW</div>
          <div className={styles.partyInfo}>
            <span>Case Name/Party Name:</span>
            <span>MUKESH GARG</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          {/* Tabs - Compact and Scrollable */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabsWrapper}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${
                    activeTab === tab.id ? styles.activeTab : ''
                  } ${tab.completed ? styles.completedTab : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <span className={styles.tabNumber}>
                    {tab.completed ? '✓' : tab.id}
                  </span>
                  <span className={styles.tabTitle}>{tab.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content - Scrollable */}
          <div className={styles.formContent}>
            {renderTabContent()}
          </div>
        </div>

        {/* Right Panel - Canvas */}
        <div className={styles.rightPanel}>
          <div className={styles.canvasWrapper}>
            <div className={styles.canvasHeader}>
              <h3 className={styles.canvasTitle}>Canvas Area</h3>
              <div className={styles.canvasControls}>
                <span className={styles.zoomLevel}>20%</span>
                <div className={styles.controlButtons}>
                  <button className={styles.controlButton} title="Search">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className={styles.controlButton} title="Fullscreen">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Canvas Container - Maximized */}
            <div className={styles.canvasContainer}>
              <div className={styles.canvas}>
                <Canvas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;