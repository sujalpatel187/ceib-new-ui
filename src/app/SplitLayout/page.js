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
    case_id: "",
    file_no: "DCG/NV/CST/AT/RRI/GA 22.05.2024 1782",
    case_order_no: "",
    case_name: "Global Enterprises",
    offence_date: "2024-05-22", // Fixed: Changed to YYYY-MM-DD format
  });

  const tabs = [
    { id: 1, title: 'Case Identifiers', completed: true },
    { id: 2, title: 'Entity Details', completed: false },
    { id: 3, title: 'Case Attributes', completed: false },
    { id: 4, title: 'Offence Details', completed: false }
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
    // You can convert dates to display format here if needed
    const submissionData = {
      ...formData,
      offence_date: convertToDisplayFormat(formData.offence_date)
    };
    console.log('Converted data:', submissionData);
  };

  // Add your initial entity details data here
  const initialEntityDetails = {
    offender_identity_informations: [
      {
        offender_type_id: "Entity",
        offender_name: "Global Enterprises",
        details_available: "",
        offender_identity_records: [
          {
            identifier_type_id: "GSTIN",
            identifier_number: "07AATFG8429N1ZH",
            issue_place: "",
            please_specify: ""
          }
        ],
        personal_details: [
          {
            offender_name: "Global Enterprises",
            father_name: "",
            mother_name: "",
            type_of_dob: "",
            age: "",
            dob_range_start: "",
            dob_range_end: "",
            dob_year: "",
            dob: "",
            gender: "",
            nationality_id: "",
            entity_type_id: "",
            business_category: "",
            entity_origin_id: "",
            incorporation_date: "",
            personal_contact_informations: [
              {
                mobile_no: "",
                email: "",
                aliases_name: "",
                spouce_name: ""
              }
            ]
          }
        ],
        bank_details: [
          {
            account_type_id: "",
            account_no: "",
            ifsc: "",
            bank_name: "",
            branch_name: "",
            depository_id: "",
            agent_name: "",
            mobile_number: ""
          }
        ],
        address_details: [
          {
            address_type_id: "Address Type (Business)",
            master_address_type: "Business",
            flat_house_no: "Khasra No. 81/173-174",
            premises_building: "Village Bakoli",
            post_office: "",
            town_city: "Delhi",
            pincode: "110036",
            district_code: "",
            state_code: "",
            country_id: "India",
            designation_role: "",
            business_name: ""
          }
        ]
      },
      {
        offender_type_id: "Entity",
        offender_name: "Shakti Zarda Factory India Pvt Ltd",
        details_available: "",
        offender_identity_records: [],
        personal_details: [
          {
            offender_name: "Shakti Zarda Factory India Pvt Ltd",
            father_name: "",
            mother_name: "",
            type_of_dob: "",
            age: "",
            dob_range_start: "",
            dob_range_end: "",
            dob_year: "",
            dob: "",
            gender: "",
            nationality_id: "",
            entity_type_id: "",
            business_category: "",
            entity_origin_id: "",
            incorporation_date: "",
            personal_contact_informations: [
              {
                mobile_no: "",
                email: "",
                aliases_name: "",
                spouce_name: ""
              }
            ]
          }
        ],
        bank_details: [
          {
            account_type_id: "",
            account_no: "",
            ifsc: "",
            bank_name: "",
            branch_name: "",
            depository_id: "",
            agent_name: "",
            mobile_number: ""
          }
        ],
        address_details: [
          {
            address_type_id: "Address Type (Business)",
            master_address_type: "Business",
            flat_house_no: "15",
            premises_building: "Rajasthani Udyog Nagar",
            post_office: "",
            town_city: "Delhi",
            pincode: "",
            district_code: "",
            state_code: "",
            country_id: "India",
            designation_role: "",
            business_name: ""
          }
        ]
      }
    ],
    unknown_contact_informations: [
      {
        person_identity_informations_id: "",
        mobile_no: "",
        email: ""
      }
    ]
  };

  const initialCaseAttributesDetails={
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
  }

  const initialDGGIDetails ={
    "search_seizure": 
            {
                "file_no": "DCG/NV/CST/AT/RRI/GA 22.05.2024 1782",
                "enquiry_initiated_id": "Search",
                "date_of_incident_report": "2024-05-22",
                "total_taxable_value": "575000000",
                "tax": "",
                "interest": "",
                "penality": "",
                "total": "",
                "whether_search_made": "No",
                "whether_seizure_made": "No",
                "date_of_search": "",
                "total_amount_of_seizure": "",
                "property_type_seized": "",
                "brief_facts_case": "**Introduction**\n<ul>\n  <li>Subject: GST Evasion Case against M/s Global Enterprises</li>\n  <li>Investigating Body: Directorate General of GST Intelligence (DGGI)</li>\n</ul>\n\n**Case Details**\n<ul>\n  <li><strong>Evasion Amount</strong>: Approximately Rs. 5.75 crore</li>\n  <li><strong>Product Involved</strong>: Unmanufactured Tobacco (branded as SWAGAT/SWAGAT GOLD Khaini)</li>\n  <li><strong>Company Involved</strong>: M/s Global Enterprises (Manufacturer)</li>\n  <li><strong>Brand Owner</strong>: Shakti Zarda Factory India Pvt Ltd</li>\n</ul>\n\n**Investigation Findings**\n<ul>\n  <li>Unaccounted supplies to Global Enterprises uncovered at Shakti Zarda Factory India Pvt Ltd premises</li>\n  <li>Key persons, buyers, and suppliers admitted to:</li>\n    <ul>\n      <li>Evasion of GST</li>\n      <li>Use of cash transactions</li>\n      <li>Clandestine transportation methods</li>\n    </ul>\n  <li><strong>Investigation Status</strong>: Ongoing with further actions pending</li>\n</ul>\n\n**Case References & Signatories**\n<ul>\n  <li><strong>File No.</strong>: DCG/NV/CST/AT/RRI/GA 22.05.2024 1782</li>\n  <li><strong>Diary No.</strong>: 1781412</li>\n  <li><strong>Digit Entry No.</strong>: 20240607115451 478</li>\n  <li><strong>Signatories</strong>:\n    <ul>\n      <li>Brij Bhushan Gupta, Pr. Additional Director General (Document Date: 22/05/2024, Signature Date: 28/05/2024)</li>\n      <li>RNIBATRRE Chatterjee, Director (Signature Date: 29/05/2024)</li>\n    </ul>\n  </li>\n</ul>",
                "supply_details": [
                    {
                        "custom_tariff_id": "HSN/SAC",
                        "customs_tariff_code": "Hsn_Sac_tariff_code_01",
                        "customs_tariff_description": "2401 - Unmanufactured Tobacco",
                        "description_impugned_supply": ""
                    }
                ],
                "tax_deposit": [
                    {
                        "tax_cash": "",
                        "tax_credit": "",
                        "interest": "",
                        "penalty": ""
                    }
                ],
                "seizure_address_records": [
                    {
                        "master_address_type": "",
                        "name_of_business": "",
                        "designation_role": "",
                        "flat_house_no": "",
                        "post_office": "",
                        "premises_building": "",
                        "country_id": "",
                        "state_code": "",
                        "district_code": "",
                        "town_city": "",
                        "pincode": ""
                    }
                ],
                "goods_trades": [
                    {
                        "name_of_goods": "",
                        "quantity": "",
                        "unit": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "electronics_digital": [
                    {
                        "device_type": "",
                        "quantity": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "currencies": [
                    {
                        "currency": "",
                        "denomination": "",
                        "number": "",
                        "total_faced_value": "",
                        "total_faced_value_inr": "",
                        "remarks": ""
                    }
                ],
                "arms_ammunitions": [
                    {
                        "arms_name": "",
                        "quantity": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "ndps": [
                    {
                        "drug_name": "",
                        "quantity": "",
                        "unit": "",
                        "mode_of_packaging": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "ficns": [
                    {
                        "quality": "",
                        "denomination": "",
                        "number": "",
                        "total_face_value": "",
                        "remarks": ""
                    }
                ],
                "vehicles": [
                    {
                        "vehicle_no": "",
                        "name_of_owner": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "bank_seizure_accounts": [
                    {
                        "account_no": "",
                        "ifsc": "",
                        "bank_name": "",
                        "branch_name": "",
                        "amount": "",
                        "remarks": ""
                    }
                ],
                "jewellery_gems": [
                    {
                        "type_jewellery_gems": "",
                        "quantity": "",
                        "unit": "",
                        "value": "",
                        "remark": ""
                    }
                ],
                "precious_metals": [
                    {
                        "details": "",
                        "quantity": "",
                        "unit": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "share_certificates": [
                    {
                        "name_of_company": "",
                        "face_value": "",
                        "quantity": "",
                        "market_value": "",
                        "date_of_issue": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "deposit_certificates": [
                    {
                        "type_of_certificates": "",
                        "principal_amount": "",
                        "maturity_date": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "crypto_wallets": [
                    {
                        "name_of_wallet": "",
                        "name_of_coins": "",
                        "quantity": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "demate_account_details": [
                    {
                        "demat_account_no": "",
                        "agent_name": "",
                        "depository_name": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "flora_faunas": [
                    {
                        "name": "",
                        "quantity": "",
                        "unit": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "plant_machineries": [
                    {
                        "name": "",
                        "quantity": "",
                        "unit": "",
                        "value": "",
                        "remarks": ""
                    }
                ],
                "im_address_details": [
                    {
                        "address_type": "",
                        "flat_house_no": "",
                        "post_office": "",
                        "premises_building": "",
                        "town_city": "",
                        "pincode": "",
                        "country_id": "",
                        "state_code": "",
                        "district_code": "",
                        "Value": "",
                        "remarks": ""
                    }
                ],
                "document_details": [
                    {
                        "document_name": "Search & seizure / Incident Report",
                        "document_file": "https://ceibdev.php-staging.com/webroot/Default/upload_file/84103415387796291599440906432758269317_MS_GLOBAL_ENTERPRISES.pdf"
                    }
                ]
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
  }

  const CoordinatesData = {
      "pdf_coordinates": {
          "": {},
          "DCG/NV/CST/AT/RRI/GA 22.05.2024 1782": [],
          "Global Enterprises": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13719554871220607,
                      0.3212890625
                  ],
                  [
                      0.8209423992161254,
                      0.3330078125
                  ]
              ]
          },
          "22.05.2024": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13998635218365063,
                      0.2294921875
                  ],
                  [
                      0.21952425111982082,
                      0.2412109375
                  ]
              ]
          },
          "Entity": [],
          "GSTIN": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13719554871220607,
                      0.3525390625
                  ],
                  [
                      0.1971978233482643,
                      0.3681640625
                  ]
              ]
          },
          "07AATFG8429N1ZH": [],
          "Address Type (Business)": [],
          "Business": [],
          "Khasra No. 81/173-174": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13719554871220607,
                      0.3212890625
                  ],
                  [
                      0.8209423992161254,
                      0.3330078125
                  ]
              ]
          },
          "Village Bakoli": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13719554871220607,
                      0.3212890625
                  ],
                  [
                      0.8209423992161254,
                      0.3330078125
                  ]
              ]
          },
          "Delhi": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.02695881159014557,
                      0.0166015625
                  ],
                  [
                      0.3660414333706607,
                      0.0263671875
                  ]
              ]
          },
          "110036": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.3199931760918253,
                      0.333984375
                  ],
                  [
                      0.4288345114781635,
                      0.3515625
                  ]
              ]
          },
          "India": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.31720237262038076,
                      0.13671875
                  ],
                  [
                      0.5613976763717805,
                      0.150390625
                  ]
              ]
          },
          "Shakti Zarda Factory India Pvt Ltd": [],
          "15": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.32557478303471443,
                      0.4833984375
                  ],
                  [
                      0.5502344624860023,
                      0.498046875
                  ]
              ]
          },
          "Rajasthani Udyog Nagar": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13998635218365063,
                      0.64453125
                  ],
                  [
                      0.8251286044232923,
                      0.65234375
                  ]
              ]
          },
          "GST": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.02695881159014557,
                      0.0166015625
                  ],
                  [
                      0.3660414333706607,
                      0.0263671875
                  ]
              ]
          },
          "Central Goods and Services Tax Act, 2017": [],
          "Clandestine removal of goods to evade payment of tax": [],
          "Clandestine removal of taxable goods to evade payment of tax": [],
          "Evaded payment of appropriate GST": [],
          "evaded payment of GST": [],
          "Not Payment Of GST": [],
          "Non payment of GST": [],
          "Mis-declaring of stock to evade the payment of tax": [],
          "Clandestine sale": [],
          "Search": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.20277943029115342,
                      0.6083984375
                  ],
                  [
                      0.8265240061590146,
                      0.62890625
                  ]
              ]
          },
          "5.75 Crore": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.35069201427771557,
                      0.3994140625
                  ],
                  [
                      0.43022991321388576,
                      0.4140625
                  ]
              ]
          },
          "No": {
              "page_number": 1,
              "width": 1786,
              "height": 2552,
              "coordinates": [
                  [
                      0.13300934350503918,
                      0.212890625
                  ],
                  [
                      0.46232415313549835,
                      0.228515625
                  ]
              ]
          },
          "**Introduction**\n<ul>\n  <li>Subject: GST Evasion Case against M/s Global Enterprises</li>\n  <li>Investigating Body: Directorate General of GST Intelligence (DGGI)</li>\n</ul>\n\n**Case Details**\n<ul>\n  <li><strong>Evasion Amount</strong>: Approximately Rs. 5.75 crore</li>\n  <li><strong>Product Involved</strong>: Unmanufactured Tobacco (branded as SWAGAT/SWAGAT GOLD Khaini)</li>\n  <li><strong>Company Involved</strong>: M/s Global Enterprises (Manufacturer)</li>\n  <li><strong>Brand Owner</strong>: Shakti Zarda Factory India Pvt Ltd</li>\n</ul>\n\n**Investigation Findings**\n<ul>\n  <li>Unaccounted supplies to Global Enterprises uncovered at Shakti Zarda Factory India Pvt Ltd premises</li>\n  <li>Key persons, buyers, and suppliers admitted to:</li>\n    <ul>\n      <li>Evasion of GST</li>\n      <li>Use of cash transactions</li>\n      <li>Clandestine transportation methods</li>\n    </ul>\n  <li><strong>Investigation Status</strong>: Ongoing with further actions pending</li>\n</ul>\n\n**Case References & Signatories**\n<ul>\n  <li><strong>File No.</strong>: DCG/NV/CST/AT/RRI/GA 22.05.2024 1782</li>\n  <li><strong>Diary No.</strong>: 1781412</li>\n  <li><strong>Digit Entry No.</strong>: 20240607115451 478</li>\n  <li><strong>Signatories</strong>:\n    <ul>\n      <li>Brij Bhushan Gupta, Pr. Additional Director General (Document Date: 22/05/2024, Signature Date: 28/05/2024)</li>\n      <li>RNIBATRRE Chatterjee, Director (Signature Date: 29/05/2024)</li>\n    </ul>\n  </li>\n</ul>": [],
          "HSN/SAC": [],
          "Hsn_Sac_tariff_code_01": [],
          "2401 - Unmanufactured Tobacco": [],
          "Search & seizure / Incident Report": [],
          "https://ceibdev.php-staging.com/webroot/Default/upload_file/84103415387796291599440906432758269317_MS_GLOBAL_ENTERPRISES.pdf": []
      }
    }

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
                  value={formData.offence_date} // Now using correct YYYY-MM-DD format
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
        // Pass initialEntityDetails as initialData prop
        return <OffenderIdentityForm initialData={initialEntityDetails} />;
      case 3:
        return <CaseAttributes initialData={initialCaseAttributesDetails}/>;
      case 4:
        return <DGGIForm initialData={initialDGGIDetails}/>;
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
                <Canvas initialdata={CoordinatesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;