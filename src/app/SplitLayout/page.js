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
    "case_id": "",
    "file_no": "DVG/NV/051/258/2023/89",
    "case_order_no": "BZU/49/2024-25",
    "case_name": "Gurukrupa Enterprise",
    "offence_date": "24/06/2024",
     // Fixed: Changed to YYYY-MM-DD format
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
     "offender_identity_informations": [
        {
            "offender_type_id": "Entity",
            "offender_name": "Gurukrupa Enterprise",
            "details_available": "",
            "offender_identity_records": [
                {
                    "identifier_type_id": "GSTIN",
                    "identifier_number": "21GJGPB4527N128",
                    "issue_place": "",
                    "please_specify": ""
                },
                {
                    "identifier_type_id": "",
                    "identifier_number": "",
                    "issue_place": "",
                    "please_specify": ""
                },
                {
                    "identifier_type_id": "GSTIN",
                    "identifier_number": "21GJGPB4527N1Z8",
                    "issue_place": "",
                    "please_specify": ""
                }
            ],
            "personal_details": [
                {
                    "offender_name": "Gurukrupa Enterprise",
                    "father_name": "",
                    "mother_name": "",
                    "type_of_dob": "",
                    "age": "",
                    "dob_range_start": "",
                    "dob_range_end": "",
                    "dob_year": "",
                    "dob": "",
                    "gender": "",
                    "nationality_id": "",
                    "entity_type_id": "",
                    "business_category": "",
                    "entity_origin_id": "",
                    "incorporation_date": "",
                    "personal_contact_informations": [
                        {
                            "mobile_no": "",
                            "email": "",
                            "aliases_name": "",
                            "spouce_name": ""
                        }
                    ]
                }
            ],
            "bank_details": [
                {
                    "account_type_id": "",
                    "account_no": "",
                    "ifsc": "",
                    "bank_name": "",
                    "branch_name": "",
                    "depository_id": "",
                    "agent_name": "",
                    "mobile_number": ""
                }
            ],
            "address_details": [
                {
                    "address_type_id": "Address Type (Business)",
                    "master_address_type": "Business",
                    "flat_house_no": "Plot No-256",
                    "premises_building": "C/o-Jata Behera",
                    "post_office": "Balanga",
                    "town_city": "Nuasantha",
                    "pincode": "752105",
                    "district_code": "Puri",
                    "state_code": "Odisha",
                    "country_id": "India",
                    "designation_role": "",
                    "business_name": "Gurukrupa Enterprise"
                }
            ]
        },
        {
            "offender_type_id": "Individual",
            "offender_name": "Guruprasad Behera",
            "details_available": "",
            "offender_identity_records": [],
            "personal_details": [
                {
                    "offender_name": "Guruprasad Behera",
                    "father_name": "",
                    "mother_name": "",
                    "type_of_dob": "",
                    "age": "",
                    "dob_range_start": "",
                    "dob_range_end": "",
                    "dob_year": "",
                    "dob": "",
                    "gender": "",
                    "nationality_id": "",
                    "entity_type_id": "",
                    "business_category": "",
                    "entity_origin_id": "",
                    "incorporation_date": "",
                    "personal_contact_informations": [
                        {
                            "mobile_no": "",
                            "email": "",
                            "aliases_name": "",
                            "spouce_name": ""
                        }
                    ]
                }
            ],
            "bank_details": [
                {
                    "account_type_id": "",
                    "account_no": "",
                    "ifsc": "",
                    "bank_name": "",
                    "branch_name": "",
                    "depository_id": "",
                    "agent_name": "",
                    "mobile_number": ""
                }
            ],
            "address_details": []
        },
        {
            "offender_type_id": "Individual",
            "offender_name": "Sandeep Mohanty",
            "details_available": "",
            "offender_identity_records": [
                {
                    "identifier_type_id": "Aadhaar",
                    "identifier_number": "782735389331",
                    "issue_place": "",
                    "please_specify": ""
                }
            ],
            "personal_details": [
                {
                    "offender_name": "Sandeep Mohanty",
                    "father_name": "",
                    "mother_name": "",
                    "type_of_dob": "",
                    "age": "",
                    "dob_range_start": "",
                    "dob_range_end": "",
                    "dob_year": "",
                    "dob": "",
                    "gender": "",
                    "nationality_id": "",
                    "entity_type_id": "",
                    "business_category": "",
                    "entity_origin_id": "",
                    "incorporation_date": "",
                    "personal_contact_informations": [
                        {
                            "mobile_no": "",
                            "email": "",
                            "aliases_name": "",
                            "spouce_name": ""
                        }
                    ]
                }
            ],
            "bank_details": [
                {
                    "account_type_id": "",
                    "account_no": "",
                    "ifsc": "",
                    "bank_name": "",
                    "branch_name": "",
                    "depository_id": "",
                    "agent_name": "",
                    "mobile_number": ""
                }
            ],
            "address_details": []
        }
    ],
    "unknown_contact_informations": [],
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
                            "offence_type_id": "fraudulent Input Tax Credit"
                        },
                        {
                            "offence_type_id": "Availment of Fake ITC"
                        },
                        {
                            "offence_type_id": "Availment of ineligible ITC from non-existing / fake entity"
                        },
                        {
                            "offence_type_id": "Non-existent Entity"
                        },
                        {
                            "offence_type_id": "Non-existent Entity, obtained registration with false Information"
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
                "file_no": "DVG/NV/051/258/2023/89",
                "enquiry_initiated_id": "Search",
                "date_of_incident_report": "24/06/2024",
                "total_taxable_value": "19100000",
                "tax": "",
                "interest": "",
                "penality": "",
                "total": "",
                "whether_search_made": "No",
                "whether_seizure_made": "No",
                "date_of_search": "",
                "total_amount_of_seizure": "",
                "property_type_seized": "",
                "brief_facts_case": "<strong>Introduction</strong><br>\n<ul>\n    <li>Incident Report <b>BZU/49/2024-25</b> filed by Directorate General of Goods and Services Tax Intelligence (DGGI) against M/s. Gurukrupa Enterprise.</li>\n</ul>\n\n<strong>Entity Details</strong><br>\n<ul>\n    <li><b>Firm Name</b>: M/s. Gurukrupa Enterprise, <b>Proprietor</b>: Guruprasad Behera.</li>\n    <li><b>GSTINs</b>: Primary - 21GJGPB4527N128, Conflicting - 21GJGPB4527N1Z28, 21GJGPB4527N1Z8.</li>\n    <li><b>Declared Address</b>: Plot No-256, Balanga, Puri (found non-operational).</li>\n</ul>\n\n<strong>Case Summary</strong><br>\n<ul>\n    <li><b>Offense</b>: Fraudulent Input Tax Credit (ITC) claims without actual supply of goods.</li>\n    <li><b>Fraudulent Amount</b>: ₹1.91 crore via fake invoices.</li>\n    <li><b>Arrest</b>: Sandeep Mohanty (Aadhaar 782735389331) arrested.</li>\n</ul>\n\n<strong>Investigation & References</strong><br>\n<ul>\n    <li><b>Origin</b>: Intelligence developed by DGGI officers on 24 June 2024.</li>\n    <li><b>Registration Status</b>: Deemed fraudulent, no voluntary deposit made.</li>\n    <li><b>Case Status</b>: Ongoing under Bhubaneswar Zonal Unit.</li>\n    <li><b>References</b:;\n        <ul>\n            <li><b>File No.</b>: DVG/NV/051/258/2023/89.</li>\n            <li><b>Diary No.</b>: 3797387 (21/04/2024).</li>\n        </ul>\n    </li>\n</ul>\n\n<strong>Goods Involved</strong><br>\n<ul>\n    <li><b>Items</b>:\n        <ul>\n            <li>New Pneumatic Tyres (<b>HSN 4011</b>).</li>\n            <li>Ferrous Waste (<b>HSN 72044900</b>).</li>\n        </ul>\n    </li>\n</ul>",
                "supply_details": [
                    {
                        "custom_tariff_id": "HSN/SAC",
                        "customs_tariff_code": "Hsn_Sac_tariff_code_01",
                        "customs_tariff_description": "New pneumatic tyres (HSN 4011), Ferrous waste (HSN 72044900)",
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
                        "document_file": "https://ceibdev.php-staging.com/webroot/Default/upload_file/59485582419588790776198814186081994117_Grurukrapa.pdf"
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
        "DVG/NV/051/258/2023/89": [],
        "BZU/49/2024-25": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.3563567329227324,
                    0.3701171875
                ],
                [
                    0.7596628289473684,
                    0.3857421875
                ]
            ]
        },
        "Gurukrupa Enterprise": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.4640891832306831,
                    0.4140625
                ],
                [
                    0.935073357012878,
                    0.431640625
                ]
            ]
        },
        "24.06.2024": [],
        "Entity": {
            "page_number": 2,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.1118869418393057,
                    0.140625
                ],
                [
                    0.899162540243561,
                    0.1591796875
                ]
            ]
        },
        "GSTIN": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.19475805746080627,
                    0.2177734375
                ],
                [
                    0.8314844624860023,
                    0.23828125
                ]
            ]
        },
        "21GJGPB4527N128": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46547036849104145,
                    0.5009765625
                ],
                [
                    0.6519303786394177,
                    0.5146484375
                ]
            ]
        },
        "21GJGPB4527N1Z28": {
            "page_number": 2,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.11326812709966405,
                    0.2666015625
                ],
                [
                    0.7223708269176932,
                    0.28125
                ]
            ]
        },
        "21GJGPB4527N1Z8": {
            "page_number": 2,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.11603049762038076,
                    0.4931640625
                ],
                [
                    0.9019249107642777,
                    0.5078125
                ]
            ]
        },
        "Address Type (Business)": [],
        "Business": {
            "page_number": 2,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.11326812709966405,
                    0.3037109375
                ],
                [
                    0.9005437255039194,
                    0.322265625
                ]
            ]
        },
        "Plot No-256": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46547036849104145,
                    0.4375
                ],
                [
                    0.9336921717525196,
                    0.455078125
                ]
            ]
        },
        "C/o-Jata Behera": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46547036849104145,
                    0.4375
                ],
                [
                    0.9336921717525196,
                    0.455078125
                ]
            ]
        },
        "Balanga": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46547036849104145,
                    0.4375
                ],
                [
                    0.9336921717525196,
                    0.455078125
                ]
            ]
        },
        "Nuasantha": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46685155375139975,
                    0.4619140625
                ],
                [
                    0.8673952792553192,
                    0.474609375
                ]
            ]
        },
        "752105": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46685155375139975,
                    0.4619140625
                ],
                [
                    0.8673952792553192,
                    0.474609375
                ]
            ]
        },
        "Puri": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.46685155375139975,
                    0.4619140625
                ],
                [
                    0.8673952792553192,
                    0.474609375
                ]
            ]
        },
        "Odisha": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.22652531844904816,
                    0.2080078125
                ],
                [
                    0.802479572018477,
                    0.2236328125
                ]
            ]
        },
        "India": [],
        "Individual": [],
        "Guruprasad Behera": {
            "page_number": 2,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.11603049762038076,
                    0.3310546875
                ],
                [
                    0.899162540243561,
                    0.34765625
                ]
            ]
        },
        "Sandeep Mohanty": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.4682327390117581,
                    0.8134765625
                ],
                [
                    0.9226426896696529,
                    0.826171875
                ]
            ]
        },
        "Aadhaar": [],
        "782735389331": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.4682327390117581,
                    0.8134765625
                ],
                [
                    0.9226426896696529,
                    0.826171875
                ]
            ]
        },
        "GST": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.19475805746080627,
                    0.2177734375
                ],
                [
                    0.8314844624860023,
                    0.23828125
                ]
            ]
        },
        "Central Goods and Services Tax Act, 2017": [],
        "fraudulent Input Tax Credit": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.5856334861422172,
                    0.64453125
                ],
                [
                    0.8770635760778276,
                    0.6591796875
                ]
            ]
        },
        "Availment of Fake ITC": [],
        "Availment of ineligible ITC from non-existing / fake entity": [],
        "Non-existent Entity": [],
        "Non-existent Entity, obtained registration with false Information": [],
        "Search": [],
        "1,91,00,000": [],
        "No": {
            "page_number": 1,
            "width": 1786,
            "height": 2526,
            "coordinates": [
                [
                    0.6394997112961927,
                    0.0693359375
                ],
                [
                    0.8673952792553192,
                    0.0849609375
                ]
            ]
        },
        "<strong>Introduction</strong><br>\n<ul>\n    <li>Incident Report <b>BZU/49/2024-25</b> filed by Directorate General of Goods and Services Tax Intelligence (DGGI) against M/s. Gurukrupa Enterprise.</li>\n</ul>\n\n<strong>Entity Details</strong><br>\n<ul>\n    <li><b>Firm Name</b>: M/s. Gurukrupa Enterprise, <b>Proprietor</b>: Guruprasad Behera.</li>\n    <li><b>GSTINs</b>: Primary - 21GJGPB4527N128, Conflicting - 21GJGPB4527N1Z28, 21GJGPB4527N1Z8.</li>\n    <li><b>Declared Address</b>: Plot No-256, Balanga, Puri (found non-operational).</li>\n</ul>\n\n<strong>Case Summary</strong><br>\n<ul>\n    <li><b>Offense</b>: Fraudulent Input Tax Credit (ITC) claims without actual supply of goods.</li>\n    <li><b>Fraudulent Amount</b>: ₹1.91 crore via fake invoices.</li>\n    <li><b>Arrest</b>: Sandeep Mohanty (Aadhaar 782735389331) arrested.</li>\n</ul>\n\n<strong>Investigation & References</strong><br>\n<ul>\n    <li><b>Origin</b>: Intelligence developed by DGGI officers on 24 June 2024.</li>\n    <li><b>Registration Status</b>: Deemed fraudulent, no voluntary deposit made.</li>\n    <li><b>Case Status</b>: Ongoing under Bhubaneswar Zonal Unit.</li>\n    <li><b>References</b:;\n        <ul>\n            <li><b>File No.</b>: DVG/NV/051/258/2023/89.</li>\n            <li><b>Diary No.</b>: 3797387 (21/04/2024).</li>\n        </ul>\n    </li>\n</ul>\n\n<strong>Goods Involved</strong><br>\n<ul>\n    <li><b>Items</b>:\n        <ul>\n            <li>New Pneumatic Tyres (<b>HSN 4011</b>).</li>\n            <li>Ferrous Waste (<b>HSN 72044900</b>).</li>\n        </ul>\n    </li>\n</ul>": [],
        "HSN/SAC": [],
        "Hsn_Sac_tariff_code_01": [],
        "New pneumatic tyres (HSN 4011), Ferrous waste (HSN 72044900)": [],
        "Search & seizure / Incident Report": [],
        "https://ceibdev.php-staging.com/webroot/Default/upload_file/59485582419588790776198814186081994117_Grurukrapa.pdf": []
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