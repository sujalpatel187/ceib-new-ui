'use client';
import { useState } from 'react';
import styles from './uploadfile.module.scss';

export default function AgencyForm() {
  const [selectedAgency, setSelectedAgency] = useState('DGGI');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const agencies = [
    'DGGI & CGST',
    // 'CBI',
    // 'ED',
    // 'SFIO',
    // 'Income Tax Department',
    // 'Customs',
    // 'SEBI',
    // 'RBI',
    // 'NCLT',
    'EOW'
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    // Clear any previous messages
    setSubmitMessage('');
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // Create FormData to send file and agency data
      const formData = new FormData();
      formData.append('agency', selectedAgency);
      formData.append('file', uploadedFile);
      console.log(formData)
      // Call your backend API
      const response = await fetch('http://103.180.31.32:8000/submit-agency-data', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setSubmitMessage('Document submitted successfully!');
        
        // Reset form after successful submission
        setUploadedFile(null);
        document.getElementById('fileInput').value = '';
        setSelectedAgency('DGGI');
      } else {
        // Handle HTTP errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit document. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    // Reset the file input
    document.getElementById('fileInput').value = '';
    // Clear any previous messages
    setSubmitMessage('');
    setSubmitError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Agency Document Submission</h1>
          <p className={styles.subtitle}>Select an agency and upload your document</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="agency" className={styles.label}>
              Select Agency
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="agency"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className={styles.select}
                required
              >
                {agencies.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fileInput" className={styles.label}>
              Upload Document
            </label>
            <div className={styles.fileUploadArea}>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className={styles.fileInput}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="fileInput" className={styles.fileInputLabel}>
                <div className={styles.uploadIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.uploadText}>
                  <span className={styles.uploadMainText}>
                    Click to upload or drag and drop
                  </span>
                  <span className={styles.uploadSubText}>
                    PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </span>
                </div>
              </label>
            </div>

            {uploadedFile && (
              <div className={styles.filePreview}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{uploadedFile.name}</span>
                    <span className={styles.fileSize}>
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className={styles.removeFileBtn}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {submitMessage && (
            <div className={styles.successMessage}>
              {submitMessage}
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className={styles.errorMessage}>
              {submitError}
            </div>
          )}

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={!uploadedFile || isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Submitting...
                </>
              ) : (
                'Submit Document'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}