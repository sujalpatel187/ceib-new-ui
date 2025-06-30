'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './agencylisting.module.scss';

export default function AgencyListing() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgency, setFilterAgency] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data - in real app, this would come from an API
  const mockDocuments = [
    {
      id: 1,
      agency: 'DGGI',
      documentName: 'Tax Investigation Report.pdf',
      uploadDate: '2024-12-15',
      fileSize: '2.4 MB',
      status: 'Under Review',
      submittedBy: 'John Doe',
      description: 'Annual tax compliance documentation'
    },
    {
      id: 2,
      agency: 'CBI',
      documentName: 'Case Evidence Files.docx',
      uploadDate: '2024-12-14',
      fileSize: '5.1 MB',
      status: 'Approved',
      submittedBy: 'Jane Smith',
      description: 'Evidence documentation for case #2024-001'
    },
    {
      id: 3,
      agency: 'ED',
      documentName: 'Financial Records.xlsx',
      uploadDate: '2024-12-13',
      fileSize: '1.8 MB',
      status: 'Rejected',
      submittedBy: 'Mike Johnson',
      description: 'Quarterly financial statements'
    },
    {
      id: 4,
      agency: 'SFIO',
      documentName: 'Company Audit Report.pdf',
      uploadDate: '2024-12-12',
      fileSize: '3.2 MB',
      status: 'Pending',
      submittedBy: 'Sarah Wilson',
      description: 'Corporate governance audit documentation'
    },
    {
      id: 5,
      agency: 'Income Tax Department',
      documentName: 'ITR Documents.pdf',
      uploadDate: '2024-12-11',
      fileSize: '0.9 MB',
      status: 'Approved',
      submittedBy: 'David Brown',
      description: 'Income tax return filing documents'
    },
    {
      id: 6,
      agency: 'SEBI',
      documentName: 'Market Analysis.pptx',
      uploadDate: '2024-12-10',
      fileSize: '4.7 MB',
      status: 'Under Review',
      submittedBy: 'Lisa Davis',
      description: 'Securities market trend analysis'
    }
  ];

  const agencies = ['All', 'DGGI', 'CBI', 'ED', 'SFIO', 'Income Tax Department', 'Customs', 'SEBI', 'RBI', 'NCLT', 'EOW'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'under review': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'xlsx':
      case 'xls':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLineJoin="round"/>
            <path d="M14 2V8H20" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const filteredAndSortedDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAgency = filterAgency === 'All' || doc.agency === filterAgency;
      return matchesSearch && matchesAgency;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.uploadDate);
          bValue = new Date(b.uploadDate);
          break;
        case 'name':
          aValue = a.documentName.toLowerCase();
          bValue = b.documentName.toLowerCase();
          break;
        case 'agency':
          aValue = a.agency.toLowerCase();
          bValue = b.agency.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleEdit = (documentId) => {
    router.push(`/agency-form?edit=${documentId}`);
  };

  const handleDelete = (documentId) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== documentId));
    }
  };

  const handleView = (documentId) => {
    // In a real app, this would open the document
    alert(`Opening document with ID: ${documentId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Agency Documents</h1>
            <p className={styles.subtitle}>Manage your submitted documents</p>
          </div>
          <button 
            className={styles.addButton}
            onClick={() => router.push('/agency-form')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Document
          </button>
        </div>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search documents, agencies, or submitters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={filterAgency}
            onChange={(e) => setFilterAgency(e.target.value)}
            className={styles.filterSelect}
          >
            {agencies.map(agency => (
              <option key={agency} value={agency}>{agency}</option>
            ))}
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className={styles.filterSelect}
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="agency-asc">Agency A-Z</option>
            <option value="status-asc">Status A-Z</option>
          </select>
        </div>
      </div>

      <div className={styles.documentsGrid}>
        {filteredAndSortedDocuments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>No documents found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredAndSortedDocuments.map(document => (
            <div key={document.id} className={styles.documentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    {getFileIcon(document.documentName)}
                  </div>
                  <div className={styles.fileDetails}>
                    <h3 className={styles.fileName}>{document.documentName}</h3>
                    <p className={styles.fileSize}>{document.fileSize}</p>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleView(document.id)}
                    className={styles.actionButton}
                    title="View document"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(document.id)}
                    className={`${styles.actionButton} ${styles.editButton}`}
                    title="Edit document"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(document.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Delete document"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.agencyBadge}>
                  {document.agency}
                </div>
                <p className={styles.description}>{document.description}</p>
                
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Submitted by:</span>
                    <span className={styles.metaValue}>{document.submittedBy}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Date:</span>
                    <span className={styles.metaValue}>{formatDate(document.uploadDate)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={`${styles.statusBadge} ${styles[getStatusColor(document.status)]}`}>
                  {document.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}