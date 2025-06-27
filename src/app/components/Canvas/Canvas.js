import React, { useRef, useState, useEffect, useCallback } from 'react';

const PDFCanvasViewer = ({ pdfPath }) => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfjsLib, setPdfjsLib] = useState(null);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [showCoordinates, setShowCoordinates] = useState(true);

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

  // Fixed canvas dimensions - vertical rectangle
  const CANVAS_WIDTH = 580;
  const CANVAS_HEIGHT = 800;

  // Function to get coordinates for current page
  const getCoordinatesForPage = useCallback((pageNumber) => {
    const coordinates = [];
    const coordData = CoordinatesData.pdf_coordinates;
    
    Object.entries(coordData).forEach(([text, data]) => {
      if (data && typeof data === 'object' && data.page_number === pageNumber && data.coordinates) {
        coordinates.push({
          text: text,
          ...data
        });
      }
    });
    
    return coordinates;
  }, []);

  // Function to draw coordinate overlays
  const drawCoordinateOverlays = useCallback(() => {
    if (!overlayCanvasRef.current) return;

    const overlayCanvas = overlayCanvasRef.current;
    const overlayCtx = overlayCanvas.getContext('2d');

    // Clear overlay canvas first to remove any old coordinates
    overlayCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!showCoordinates) {
      // If coordinates should not be shown, simply return
      return;
    }

    // Get coordinates for current page
    const pageCoordinates = getCoordinatesForPage(currentPage);

    if (pageCoordinates.length === 0) return;

    // Get page viewport for scaling
    if (!pdfDoc) return;
    
    pdfDoc.getPage(currentPage).then(page => {
      const viewport = page.getViewport({ scale });
      
      // Calculate centering offset (same as PDF rendering)
      const offsetX = (CANVAS_WIDTH - viewport.width) / 2 + pan.x;
      const offsetY = (CANVAS_HEIGHT - viewport.height) / 2 + pan.y;
      
      // Draw each coordinate
      pageCoordinates.forEach((coordData, index) => {
        if (coordData.coordinates && coordData.coordinates.length >= 2) {
          // Extract percentage coordinates (0-1 range)
          const [topLeftPercent, bottomRightPercent] = coordData.coordinates;
          const [x1Percent, y1Percent] = topLeftPercent;    // Top-left corner percentages
          const [x2Percent, y2Percent] = bottomRightPercent; // Bottom-right corner percentages
          
          // Convert percentage coordinates to actual pixel coordinates on the viewport
          const x1 = (x1Percent * viewport.width) + offsetX;
          const y1 = (y1Percent * viewport.height) + offsetY;
          const x2 = (x2Percent * viewport.width) + offsetX;
          const y2 = (y2Percent * viewport.height) + offsetY;
          
          // Calculate rectangle dimensions
          const rectWidth = x2 - x1;
          const rectHeight = y2 - y1;
          
          // Only draw if the rectangle is within the visible area
          if (x2 > 0 && y2 > 0 && x1 < CANVAS_WIDTH && y1 < CANVAS_HEIGHT) {
            // Fixed light yellow colors
            const color = 'rgba(255, 255, 0, 0.1)'; // Light yellow with transparency
            const borderColor = 'rgba(255, 255, 0, 0.8)'; // Brighter yellow border
            
            // Draw filled rectangle
            overlayCtx.fillStyle = color;
            overlayCtx.fillRect(x1, y1, rectWidth, rectHeight);
            
            // Draw border
            overlayCtx.strokeStyle = borderColor;
            overlayCtx.lineWidth = 2;
            overlayCtx.strokeRect(x1, y1, rectWidth, rectHeight);
          }
        }
      });
    }).catch(err => {
      console.error('Error drawing coordinate overlays:', err);
    });
  }, [currentPage, scale, pan, showCoordinates, getCoordinatesForPage, pdfDoc]);

  useEffect(() => {
    const initPdfJs = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;
        setPdfjsLib(pdfjs);
      } catch (err) {
        console.error('Error initializing PDF.js:', err);
        setError('Failed to initialize PDF.js library');
      }
    };

    initPdfJs();
  }, []);

  useEffect(() => {
    const loadPdfFromPath = async () => {
      if (!pdfPath || !pdfjsLib) return;

      setIsLoading(true);
      setError(null);

      try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        setPageSize({ width: viewport.width, height: viewport.height });
        
        // Calculate initial scale to fit the page in our fixed canvas
        const scaleX = CANVAS_WIDTH / viewport.width;
        const scaleY = CANVAS_HEIGHT / viewport.height;
        const initialScale = Math.min(scaleX, scaleY) * 0.9; // 0.9 for some padding
        setScale(initialScale);
        setPan({ x: 0, y: 0 }); // Center the content
      } catch (err) {
        console.error('Error loading PDF from path:', err);
        setError(`Failed to load PDF from path: ${pdfPath}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPdfFromPath();
  }, [pdfPath, pdfjsLib]);

  const renderTaskRef = useRef(null);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current || scale === 0) return;

      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set fixed canvas size
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        
        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Get page viewport
        const viewport = page.getViewport({ scale });
        
        // Calculate centering offset
        const offsetX = (CANVAS_WIDTH - viewport.width) / 2 + pan.x;
        const offsetY = (CANVAS_HEIGHT - viewport.height) / 2 + pan.y;
        
        // Save context and apply transforms
        ctx.save();
        ctx.translate(offsetX, offsetY);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
        
        ctx.restore();
        renderTaskRef.current = null;
        
        // Draw coordinate overlays after PDF is rendered
        setTimeout(() => drawCoordinateOverlays(), 100);
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
          setError('Failed to render PDF page');
        }
        renderTaskRef.current = null;
      }
    };

    renderPage();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, currentPage, scale, pan, drawCoordinateOverlays]);

  // Redraw overlays when relevant state changes
  useEffect(() => {
    drawCoordinateOverlays();
  }, [drawCoordinateOverlays]);

  const zoomIn = useCallback(() => {
    const newScale = Math.min(scale * 1.2, 3);
    setScale(newScale);
  }, [scale]);

  const zoomOut = useCallback(() => {
    const newScale = Math.max(scale / 1.2, 0.2);
    setScale(newScale);
  }, [scale]);

  const resetView = useCallback(() => {
    if (pageSize.width && pageSize.height) {
      const scaleX = CANVAS_WIDTH / pageSize.width;
      const scaleY = CANVAS_HEIGHT / pageSize.height;
      const fitScale = Math.min(scaleX, scaleY) * 0.9;
      setScale(fitScale);
      setPan({ x: 0, y: 0 });
    }
  }, [pageSize]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const toggleCoordinates = () => {
    setShowCoordinates(prev => !prev);
  };

  const handleWheel = useCallback((e) => {
    e.preventDefault(); // Always prevent default scroll behavior
    
    if (e.ctrlKey || e.metaKey) {
      // Zoom when Ctrl/Cmd is held
      const delta = e.deltaY;
      const zoomFactor = delta > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.2), 3);
      setScale(newScale);
    } else {
      // Regular scroll wheel zoom (without Ctrl/Cmd)
      const delta = e.deltaY;
      const zoomFactor = delta > 0 ? 0.95 : 1.05;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.2), 3);
      setScale(newScale);
    }
  }, [scale]);

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });
    }
  }, [pan]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newPan = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      setPan(newPan);
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case '=':
        case '+':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetView();
          }
          break;
        case 'ArrowLeft':
          if (currentPage > 1) {
            e.preventDefault();
            goToPrevPage();
          }
          break;
        case 'ArrowRight':
          if (currentPage < totalPages) {
            e.preventDefault();
            goToNextPage();
          }
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          toggleCoordinates();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetView, currentPage, totalPages, goToPrevPage, goToNextPage]);

  // Get count of coordinates for current page
  const currentPageCoordinatesCount = getCoordinatesForPage(currentPage).length;

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorState}>
          <div style={styles.stateContent}>
            <div style={styles.icon}>⚠️</div>
            <div style={styles.title}>Error</div>
            <div style={styles.message}>{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !pdfjsLib) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingState}>
          <div style={styles.stateContent}>
            <div style={styles.spinner}></div>
            <div style={styles.title}>
              {!pdfjsLib ? 'Initializing PDF.js...' : 'Loading PDF...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pdfDoc) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <div style={styles.stateContent}>
            <div style={styles.icon}>📄</div>
            <div style={styles.title}>No PDF loaded</div>
            {pdfPath && <div style={styles.message}>Path: {pdfPath}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header with PDF info and controls */}
      <div style={styles.header}>
        <div style={styles.pdfInfo}>
          {pdfPath && (
            <span style={styles.fileName}>
              📄 {pdfPath.split('/').pop()}
            </span>
          )}
          {currentPageCoordinatesCount > 0 && (
            <span style={styles.coordinateCount}>
              📍 {currentPageCoordinatesCount} coordinates on page {currentPage}
            </span>
          )}
        </div>
        
        <div style={styles.controls}>
          <div style={styles.zoomControls}>
            <button 
              onClick={zoomOut} 
              style={styles.controlButton}
              title="Zoom Out (Ctrl + -)"
            >
              −
            </button>
            <span style={styles.zoomLevel}>
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={zoomIn} 
              style={styles.controlButton}
              title="Zoom In (Ctrl + +)"
            >
              +
            </button>
            <button 
              onClick={resetView} 
              style={styles.resetButton}
              title="Fit to Screen (Ctrl + 0)"
            >
              🔄
            </button>
          </div>
          
          <button
            onClick={toggleCoordinates}
            style={{
              ...styles.toggleButton,
              ...(showCoordinates ? styles.toggleButtonActive : {})
            }}
            title="Toggle Coordinates (H)"
          >
            {showCoordinates ? '👁️ Hide' : '👁️ Show'} Coordinates
          </button>
        </div>
      </div>

      {/* Fixed Canvas Container */}
      <div style={styles.canvasWrapper}>
        <div
          ref={containerRef}
          style={{
            ...styles.canvasContainer,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            style={styles.canvas}
          />
          <canvas
            ref={overlayCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={styles.overlayCanvas}
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <div style={styles.navigationBar}>
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage <= 1} 
          style={{
            ...styles.navButton,
            ...(currentPage <= 1 ? styles.navButtonDisabled : {}),
            pointerEvents: currentPage <= 1 ? 'none' : 'auto'
          }}
          title={currentPage <= 1 ? "No previous page" : "Previous Page (←)"}
        >
          ← Previous
        </button>
        
        <div style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </div>
        
        <button 
          onClick={goToNextPage} 
          disabled={currentPage >= totalPages} 
          style={{
            ...styles.navButton,
            ...(currentPage >= totalPages ? styles.navButtonDisabled : {}),
            pointerEvents: currentPage >= totalPages ? 'none' : 'auto'
          }}
          title={currentPage >= totalPages ? "No next page" : "Next Page (→)"}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Demo component
const Canvas = () => {
  const [pdfPath] = useState("MS_GLOBAL_ENTERPRISES.pdf");

  return (
    <div style={styles.demo}>
      <PDFCanvasViewer pdfPath={pdfPath} />
    </div>
  );
};

// Styles object
const styles = {
  demo: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f8fafc',
  },
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f1f5f9',
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 0 20px 0',
    backgroundColor: 'white',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e2e8f0',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  pdfInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  
  fileName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
  },
  
  coordinateCount: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#059669',
    backgroundColor: '#ecfdf5',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#a7f3d0',
  },
  
  controls: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  
  zoomControls: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  
  controlButton: {
    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  zoomLevel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#6b7280',
    padding: '0.5rem',
    minWidth: '4rem',
    textAlign: 'center',
  },
  
  resetButton: {
    background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
    color: 'white',
    borderWidth: '0',
    borderStyle: 'none',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  
  toggleButton: {
    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  toggleButtonActive: {
    background: 'linear-gradient(145deg, #10b981, #059669)',
    color: 'white',
    borderColor: '#059669',
  },
  
  canvasWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  },
  
  canvasContainer: {
    width: '600px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
  },
  
  canvas: {
    display: 'block',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  
  overlayCanvas: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
  
  navigationBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '#e2e8f0',
  },
  
  navButton: {
    background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
    color: 'white',
    borderWidth: '0',
    borderStyle: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '7rem',
  },
  
  navButtonDisabled: {
    background: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
  
  pageInfo: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  },
  
  // State styles
  loadingState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  
  errorState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  
  emptyState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
  },
  
  stateContent: {
    textAlign: 'center',
    color: 'white',
    padding: '3rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  spinner: {
    width: '2.5rem',
    height: '2.5rem',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  
  message: {
    fontSize: '0.9rem',
    opacity: '0.9',
  },
};

// Add spinning animation using CSS-in-JS alternative
const spinKeyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Inject the keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

export default Canvas;