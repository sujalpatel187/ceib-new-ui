import React, { useRef, useState, useEffect, useCallback } from 'react';

const PDFCanvasViewer = ({ pdfPath, initialdata }) => {
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
  const [showMissingData, setShowMissingData] = useState(true);
  const [dataStats, setDataStats] = useState({ withCoords: 0, withoutCoords: 0, missing: 0 });

  // console.log(initialdata)
  const CoordinatesData = initialdata

  // Fixed canvas dimensions - vertical rectangle
  const CANVAS_WIDTH = 580;
  const CANVAS_HEIGHT = 800;

  // Function to extract all values from the main data object recursively
  const extractAllValues = useCallback((obj, path = '') => {
    const values = [];
    
    // Keys to exclude from iteration
    const excludedKeys = [
      'doc_status',
      'doc_id', 
      'deviceId',
      'token',
      'agency',
      'sub_agency_id',
      'sub_agency_id_level_2',
      'sub_agency_id_level_3', 
      'sub_agency_id_level_4',
      'sub_agency_id_level_5',
      'pdf_coordinates'
    ];
    
    const traverse = (current, currentPath) => {
      if (current === null || current === undefined || current === '') {
        return;
      }
      
      if (typeof current === 'string' || typeof current === 'number') {
        const value = String(current).trim();
        if (value && value !== '' && value !== '0' && !currentPath.includes('coordinates')) {
          values.push({
            value,
            path: currentPath,
            type: typeof current
          });
        }
      } else if (Array.isArray(current)) {
        current.forEach((item, index) => {
          traverse(item, `${currentPath}[${index}]`);
        });
      } else if (typeof current === 'object') {
        Object.entries(current).forEach(([key, value]) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          // Skip excluded keys
          if (!excludedKeys.includes(key)) {
            traverse(value, newPath);
          }
        });
      }
    };
    
    traverse(obj, path);
    return values;
  }, []);

  // Function to categorize data values based on coordinate availability
  const categorizeDataValues = useCallback(() => {
    const allValues = extractAllValues(CoordinatesData);
    const coordData = CoordinatesData.pdf_coordinates || {};
    
    const categorized = {
      withCoordinates: [], // Key exists and has coordinates
      withoutCoordinates: [], // Key exists but no coordinates
      missing: [] // Key doesn't exist in pdf_coordinates
    };
    
    allValues.forEach(({ value, path, type }) => {
      if (coordData.hasOwnProperty(value)) {
        const coordEntry = coordData[value];
        if (coordEntry && 
            typeof coordEntry === 'object' && 
            coordEntry.coordinates && 
            Array.isArray(coordEntry.coordinates) && 
            coordEntry.coordinates.length >= 2) {
          categorized.withCoordinates.push({ value, path, type, coordData: coordEntry });
        } else {
          categorized.withoutCoordinates.push({ value, path, type, coordData: coordEntry });
        }
      } else {
        categorized.missing.push({ value, path, type });
      }
    });
    
    return categorized;
  }, [CoordinatesData, extractAllValues]);

  // Function to get coordinates for current page with categorization
  const getCoordinatesForPage = useCallback((pageNumber) => {
    const categorized = categorizeDataValues();
    const pageCoordinates = {
      withCoordinates: [],
      withoutCoordinates: [],
      missing: categorized.missing // Missing data doesn't have coordinates to display
    };
    
    // Filter coordinates for current page
    categorized.withCoordinates.forEach(item => {
      if (item.coordData.page_number === pageNumber) {
        pageCoordinates.withCoordinates.push(item);
      }
    });
    
    categorized.withoutCoordinates.forEach(item => {
      if (item.coordData && item.coordData.page_number === pageNumber) {
        pageCoordinates.withoutCoordinates.push(item);
      }
    });
    
    return pageCoordinates;
  }, [categorizeDataValues]);

  // Update stats whenever data changes
  useEffect(() => {
    const categorized = categorizeDataValues();
    setDataStats({
      withCoords: categorized.withCoordinates.length,
      withoutCoords: categorized.withoutCoordinates.length,
      missing: categorized.missing.length
    });
  }, [categorizeDataValues]);

  // Function to draw coordinate overlays with color coding
  const drawCoordinateOverlays = useCallback(() => {
    if (!overlayCanvasRef.current) return;

    const overlayCanvas = overlayCanvasRef.current;
    const overlayCtx = overlayCanvas.getContext('2d');

    // Clear overlay canvas first
    overlayCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!showCoordinates) return;

    // Get categorized coordinates for current page
    const pageCoordinates = getCoordinatesForPage(currentPage);

    if (!pdfDoc) return;
    
    pdfDoc.getPage(currentPage).then(page => {
      const viewport = page.getViewport({ scale });
      
      // Calculate centering offset
      const offsetX = (CANVAS_WIDTH - viewport.width) / 2 + pan.x;
      const offsetY = (CANVAS_HEIGHT - viewport.height) / 2 + pan.y;
      
      // Draw coordinates with green color (data available with coordinates)
      pageCoordinates.withCoordinates.forEach((item) => {
        if (item.coordData.coordinates && item.coordData.coordinates.length >= 2) {
          const [topLeftPercent, bottomRightPercent] = item.coordData.coordinates;
          const [x1Percent, y1Percent] = topLeftPercent;
          const [x2Percent, y2Percent] = bottomRightPercent;
          
          const x1 = (x1Percent * viewport.width) + offsetX;
          const y1 = (y1Percent * viewport.height) + offsetY;
          const x2 = (x2Percent * viewport.width) + offsetX;
          const y2 = (y2Percent * viewport.height) + offsetY;
          
          const rectWidth = x2 - x1;
          const rectHeight = y2 - y1;
          
          if (x2 > 0 && y2 > 0 && x1 < CANVAS_WIDTH && y1 < CANVAS_HEIGHT) {
            // Green for data with coordinates
            overlayCtx.fillStyle = 'rgba(34, 197, 94, 0.15)'; // Light green
            overlayCtx.fillRect(x1, y1, rectWidth, rectHeight);
            
            overlayCtx.strokeStyle = 'rgba(34, 197, 94, 0.8)'; // Green border
            overlayCtx.lineWidth = 2;
            overlayCtx.strokeRect(x1, y1, rectWidth, rectHeight);
          }
        }
      });
      
      // Draw coordinates with yellow color (data available but no coordinates)
      pageCoordinates.withoutCoordinates.forEach((item) => {
        if (item.coordData && item.coordData.coordinates && item.coordData.coordinates.length >= 2) {
          const [topLeftPercent, bottomRightPercent] = item.coordData.coordinates;
          const [x1Percent, y1Percent] = topLeftPercent;
          const [x2Percent, y2Percent] = bottomRightPercent;
          
          const x1 = (x1Percent * viewport.width) + offsetX;
          const y1 = (y1Percent * viewport.height) + offsetY;
          const x2 = (x2Percent * viewport.width) + offsetX;
          const y2 = (y2Percent * viewport.height) + offsetY;
          
          const rectWidth = x2 - x1;
          const rectHeight = y2 - y1;
          
          if (x2 > 0 && y2 > 0 && x1 < CANVAS_WIDTH && y1 < CANVAS_HEIGHT) {
            // Yellow for data without proper coordinates
            overlayCtx.fillStyle = 'rgba(255, 255, 0, 0.1)';
            overlayCtx.fillRect(x1, y1, rectWidth, rectHeight);
            
            overlayCtx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
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
        
        const scaleX = CANVAS_WIDTH / viewport.width;
        const scaleY = CANVAS_HEIGHT / viewport.height;
        const initialScale = Math.min(scaleX, scaleY) * 0.9;
        setScale(initialScale);
        setPan({ x: 0, y: 0 });
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
        
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        const viewport = page.getViewport({ scale });
        
        const offsetX = (CANVAS_WIDTH - viewport.width) / 2 + pan.x;
        const offsetY = (CANVAS_HEIGHT - viewport.height) / 2 + pan.y;
        
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

  const toggleMissingData = () => {
    setShowMissingData(prev => !prev);
  };

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY;
      const zoomFactor = delta > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.2), 3);
      setScale(newScale);
    } else {
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
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMissingData();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetView, currentPage, totalPages, goToPrevPage, goToNextPage]);

  // Get current page coordinates count
  const currentPageCoords = getCoordinatesForPage(currentPage);
  const currentPageStats = {
    withCoords: currentPageCoords.withCoordinates.length,
    withoutCoords: currentPageCoords.withoutCoordinates.length
  };

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
          <div style={styles.statsContainer}>
            <span style={styles.statBadge}>
              🟢 With Coords: {dataStats.withCoords}
            </span>
            <span style={styles.statBadgeYellow}>
              🟡 Without Coords: {dataStats.withoutCoords}
            </span>
            <span style={styles.statBadgeRed}>
              🔴 Missing: {dataStats.missing}
            </span>
          </div>
          {(currentPageStats.withCoords > 0 || currentPageStats.withoutCoords > 0) && (
            <span style={styles.pageStats}>
              Page {currentPage}: {currentPageStats.withCoords + currentPageStats.withoutCoords} highlights
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
            {showCoordinates ? '👁️ Hide' : '👁️ Show'} Highlights
          </button>
        </div>
      </div>

      {/* Legend */}
      {showCoordinates && (
        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={styles.legendColorGreen}></div>
            <span>Data with coordinates</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.legendColorYellow}></div>
            <span>Data without coordinates</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.legendColorRed}></div>
            <span>Missing data (not in PDF)</span>
          </div>
        </div>
      )}

      {/* Canvas Container */}
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

      {/* Missing Data Panel */}
      {showMissingData && dataStats.missing > 0 && (
        <div style={styles.missingDataPanel}>
          <div style={styles.missingHeader}>
            <h4>Missing Data Items ({dataStats.missing})</h4>
            <button onClick={toggleMissingData} style={styles.closeButton}>×</button>
          </div>
          <div style={styles.missingList}>
            {categorizeDataValues().missing.slice(0, 10).map((item, index) => (
              <div key={index} style={styles.missingItem}>
                <span style={styles.missingValue}>{item.value}</span>
                <span style={styles.missingPath}>{item.path}</span>
              </div>
            ))}
            {dataStats.missing > 10 && (
              <div style={styles.moreItems}>...and {dataStats.missing - 10} more items</div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div style={styles.navigationBar}>
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage <= 1} 
          style={{
            ...styles.navButton,
            ...(currentPage <= 1 ? styles.navButtonDisabled : {})
          }}
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
            ...(currentPage >= totalPages ? styles.navButtonDisabled : {})
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Demo component
const Canvas = ({initialdata}) => {
  const [pdfPath] = useState("MS_GLOBAL_ENTERPRISES.pdf");

  return (
    <div style={styles.demo}>
      <PDFCanvasViewer pdfPath={pdfPath} initialdata={initialdata} />
    </div>
  );
};

// Enhanced styles object
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
    padding: '0 0 10px 0',
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
  
  statsContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  
  statBadge: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#065f46',
    backgroundColor: '#d1fae5',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#a7f3d0',
  },
  
  statBadgeYellow: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#92400e',
    backgroundColor: '#fef3c7',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#fcd34d',
  },
  
  statBadgeRed: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#991b1b',
    backgroundColor: '#fee2e2',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#fca5a5',
  },
  
  pageStats: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#059669',
    backgroundColor: '#ecfdf5',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
  },
  
  legend: {
    display: 'flex',
    gap: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#f8fafc',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e2e8f0',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#374151',
  },
  
  legendColorGreen: {
    width: '16px',
    height: '16px',
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(34, 197, 94, 0.8)',
    borderRadius: '3px',
  },
  
  legendColorYellow: {
    width: '16px',
    height: '16px',
    backgroundColor: 'rgba(255, 255, 0, 0.2)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 0, 0.8)',
    borderRadius: '3px',
  },
  
  legendColorRed: {
    width: '16px',
    height: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(239, 68, 68, 0.8)',
    borderRadius: '3px',
  },
  
  missingDataPanel: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    width: '300px',
    maxHeight: '400px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    zIndex: 1000,
  },
  
  missingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
  },
  
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0',
    lineHeight: '1',
  },
  
  missingList: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '1rem',
  },
  
  missingItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#fef2f2',
    borderRadius: '6px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#ef4444',
  },
  
  missingValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#dc2626',
  },
  
  missingPath: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  
  moreItems: {
    textAlign: 'center',
    padding: '0.5rem',
    fontSize: '0.8rem',
    color: '#6b7280',
    fontStyle: 'italic',
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
    position: 'relative',
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