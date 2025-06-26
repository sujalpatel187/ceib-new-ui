/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";

const Canvas =(
    {
      imageUrl,
      selectedField,
     }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [viewMode, setViewMode] = useState("select");
     const [scale, setScale] = useState(1);
     const [pan, setPan] = useState({ x: 0, y: 0 });
    const [image, setImage] = useState(null);
    const [allRects, setAllRects] = useState([]);
    const [showAllRects, setShowAllRects] = useState(false);
 
    const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.1, 2));
    const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));

    // useEffect(() => {
    //   if (
    //     (selectedField &&
    //     Object.keys(selectedField).length > 0) ||
    //     (showAllRects || showSignaturePoints)
    //   ) {
    //     // setShowAllRects(false);
    //     // setShowSignaturePoints(false);
    //     setViewMode("draw");
    //   } else if (
    //     selectedField &&
    //     Object.keys(selectedField).length <= 0 &&
    //     !(showAllRects || showSignaturePoints) &&
    //     viewMode === "draw"
    //   ) {
    //     setIsDrawing(false);
    //     setIsDragging(false);
    //     setViewMode("select");
    //     // }
    //   } else if (selectedField &&
    //     Object.keys(selectedField).length <= 0 &&
    //     (showAllRects || showSignaturePoints) &&
    //     viewMode === "draw") {
    //     setIsDrawing(false);
    //     setIsDragging(false);
    //     setViewMode("select");
    //     setCurrentRect(null);
    //     setSelectedAllRects([]);
    //     }
    // }, [selectedField]);

    // clean up for below useEffect
    // useEffect(() => {
    //   return () => {
    //     const linksToRemove = document.querySelectorAll('link[data-added-by="client"]');
    //     linksToRemove.forEach(link => {
    //       if (link.parentNode) {
    //         document.head.removeChild(link);
    //       }
    //     });
    //   };
    // }, []);

    useEffect(() => {
      if (!imageUrl) return;
      const img = new Image();

      if(imageUrl.includes("https://")){
        const existingLink = document.querySelector(
          `link[rel="preload"][href="${imageUrl}"]`
        );
        if(!existingLink){
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = imageUrl;
          link.setAttribute('data-added-by', "client"); 
          document.head.appendChild(link);
        }
      }
      img.src = imageUrl;

      img.onload = () => {
        setImage(img);

        if (containerRef.current) {
          const container = containerRef.current;
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;

          const scaleX = containerWidth / img.width;
          const scaleY = containerHeight / img.height;
          const initialScale = Math.min(scaleX, scaleY);
          setScale(initialScale);

          // Center the image
          const centerX = (containerWidth - img.width * initialScale) / 2;
          const centerY = (containerHeight - img.height * initialScale) / 2;
          setPan({ x: centerX, y: centerY });
        }
      };
      return () => {
        img.onload = null;
      };
    }, [imageUrl]);

    useEffect(() => {
      const preventScroll = (e) => {
        e.preventDefault();
      };

      const handleMouseEnter = () => {
        document.body.style.overflowY = "hidden";
        document.body.addEventListener("wheel", preventScroll, {
          passive: false,
        });
      };

      const handleMouseLeave = () => {
        document.body.style.overflowY = "auto";
        document.body.removeEventListener("wheel", preventScroll);
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (container) {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
        document.body.style.overflowY = "auto";
        document.body.removeEventListener("wheel", preventScroll);
      };
    }, []);

    // useEffect(() => {
    //   if (currentPageData) {
    //     let rects = [];
    //     if (isMBR) {
    //       Object.keys(currentPageData).map((sectionName, index) => {
    //         const section = currentPageData[sectionName];
    //         return (
    //           typeof section === "object" &&
    //           Object.keys(section).map((fieldKey) => {
    //             const field = section[fieldKey];
    //             if (field && field.coordinates && (!field.field_status || field.field_status !== "Deleted")) {
    //               rects.push({ ...field, sectionName, fieldKey });
    //             }
    //           })
    //         );
    //       });
    //       setAllRects(rects);
    //     }
    //   }
    // }, [currentPageData]);

    useEffect(() => {
      if (allRects) {
        drawCanvas(allRects);
      }
    }, [
      allRects,
      image,
      scale,
      // selectedField,
      showAllRects,
    ]);

    // const toggleAllRects = () => {
    //   if (!showAllRects) {
    //     setCustomRects(
    //       metadata &&
    //         metadata.total_available_points.map((rect, index) => ({
    //           ...rect,
    //           id: `custom-rect-${index}`,
    //           notes: "",
    //         }))
    //     );
    //     setViewMode("draw");
    //   } else {
    //     setViewMode("select");
    //   }
    //   setSelectedAllRects([]);
    //   setRightClickMenu({ visible: false, x: 0, y: 0, rectIndex: -1 });
    //   setShowAllRects(!showAllRects);
    // };

    // const resetView = () => {
    //   if (!image || !containerRef.current) return;

    //   const container = containerRef.current;
    //   const scaleX = container.clientWidth / image.width;
    //   const scaleY = container.clientHeight / image.height;
    //   const newScale = Math.min(scaleX, scaleY);

    //   setScale(newScale);
    //   const centerX = (container.clientWidth - image.width * newScale) / 2;
    //   const centerY = (container.clientHeight - image.height * newScale) / 2;
    //   setPan({ x: centerX, y: centerY });
    // };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.stopPropagation();

      const delta = e.deltaY;
      const zoomFactor = delta > 0 ? 0.9 : 1.1;
      // Changed maximum scale from 5 to 2 (200%)
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 2);

      // Calculate mouse position relative to canvas
      if(newScale !== scale){
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const newPan = {
          x: pan.x - mouseX * (newScale/scale - 1),
          y: pan.y - mouseY * (newScale/scale - 1),
        };

        setScale(newScale);
        setPan(newPan);
      }
    };

    const drawCanvas = (rects) => {
      if (!canvasRef.current || !image) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = image.width * scale;
      canvas.height = image.height * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";

      // const fillRoundedRect = (
      //   x,
      //   y,
      //   width,
      //   height,
      //   radius,
      //   color,
      //   borderColor
      // ) => {
      //   ctx.beginPath();
      //   ctx.moveTo(x + radius, y);
      //   ctx.lineTo(x + width - radius, y);
      //   ctx.arcTo(x + width, y, x + width, y + radius, radius);
      //   ctx.lineTo(x + width, y + height - radius);
      //   ctx.arcTo(
      //     x + width,
      //     y + height,
      //     x + width - radius,
      //     y + height,
      //     radius
      //   );
      //   ctx.lineTo(x + radius, y + height);
      //   ctx.arcTo(x, y + height, x, y + height - radius, radius);
      //   ctx.lineTo(x, y + radius);
      //   ctx.arcTo(x, y, x + radius, y, radius);
      //   ctx.closePath();

      //   ctx.fillStyle = color;
      //   ctx.fill();

      //   ctx.strokeStyle = borderColor;
      //   ctx.lineWidth = 2;
      //   ctx.stroke();
      // };


      // // Draw custom rects if showing all rects
      // if (showAllRects && customRects.length > 0) {
      //   customRects.forEach((rect, index) => {
      //     const scaledRect = {
      //       x: rect.x1 * scale,
      //       y: rect.y1 * scale,
      //       width: (rect.x2 - rect.x1) * scale,
      //       height: (rect.y2 - rect.y1) * scale,
      //     };
      //     const minDimension = Math.min(scaledRect.width, scaledRect.height);
      //     const radius = Math.max(minDimension * 0.08, 3);
      //     const isSelected = selectedAllRects.some(
      //       (s) => s.rect.id === rect.id
      //     );
      //     fillRoundedRect(
      //       scaledRect.x,
      //       scaledRect.y,
      //       scaledRect.width,
      //       scaledRect.height,
      //       radius,
      //       isSelected ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.05)",
      //       isSelected ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 0.7)"
      //     );
      //   });
      // }

      // if (selectedField) {
      //   const drawableRectangles = drawSelectedRectangle();

      //   drawableRectangles.forEach((rect, index) => {
      //     ctx.strokeStyle = "#00FF00";
      //     ctx.lineWidth = 2;
      //     const scaledRect = {
      //       x: rect.x1 * scale,
      //       y: rect.y1 * scale,
      //       width: (rect.x2 - rect.x1) * scale,
      //       height: (rect.y2 - rect.y1) * scale,
      //     };
      //     ctx.strokeRect(
      //       scaledRect.x,
      //       scaledRect.y,
      //       scaledRect.width,
      //       scaledRect.height
      //     );
      //   });
      // }

      // if (rects.length > 0) {
      //   rects.forEach((rect) => {
      //     if (
      //       !selectedField ||
      //       !(
      //         selectedField.sectionName === rect.sectionName &&
      //         selectedField.fieldKey === rect.fieldKey
      //       )
      //     ) {
      //       ctx.strokeStyle = "#4F46E5";
      //       ctx.lineWidth = 1;
      //       const rectCords = rect.coordinates;
      //       const scaledRect = {
      //         x: rectCords.x1 * scale,
      //         y: rectCords.y1 * scale,
      //         width: (rectCords.x2 - rectCords.x1) * scale,
      //         height: (rectCords.y2 - rectCords.y1) * scale,
      //       };
      //       ctx.strokeRect(
      //         scaledRect.x,
      //         scaledRect.y,
      //         scaledRect.width,
      //         scaledRect.height
      //       );
      //     }
      //   });
      // }


      ctx.restore();
    };

    const getMousePos = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: ((e.clientX - rect.left) * scaleX) / scale,
        y: ((e.clientY - rect.top) * scaleY) / scale,
      };
    };

    // const handleMouseDown = (e) => {
    //   if (e.button === 2) {
    //     return false;
    //   }
    //   if (
    //     e.button === 1 ||
    //     (e.button === 0 && e.altKey) ||
    //     (e.button === 0 && viewMode !== "draw")
    //   ) {
    //     e.preventDefault();
    //     setIsDragging(true);
    //     setLastPanPoint({ x: e.clientX, y: e.clientY });
    //   }
    //   else if (e.button === 0) {
    //     const pos = getMousePos(e);


    //     if (viewMode === "draw" && Object.keys(selectedField).length > 0) {
    //       setIsDrawing(true);
    //       setIsSelectingDraw(false);
    //       setStartPos(pos);
    //     }

    //     if (viewMode === "draw" && showSignaturePoints) {
    //       if (!Object.keys(selectedField).length > 0){
    //         setIsSelectingDraw(true);
    //         setIsDrawing(false);
    //       }
    //       setStartPos(pos);
    //       if(!e.ctrlKey){
    //         setSelectedSignatures([]);
    //       }
    //     }

    //     if (viewMode === "draw" && showAllRects) {
    //       if (!Object.keys(selectedField).length > 0){
    //         // console.log(selectedField)
    //         setIsSelectingDraw(true);
    //         setIsDrawing(false);
    //       }
    //       setStartPos(pos);
    //       if(!e.ctrlKey){
    //         setSelectedAllRects([]);
    //       }
    //     }
    //   }
    // };

    // const handleMouseMove = (e) => {
    //   const pos = getMousePos(e);

    //   if (isDragging && lastPanPoint) {
    //     const deltaX = e.clientX - lastPanPoint.x;
    //     const deltaY = e.clientY - lastPanPoint.y;
    //     setPan({
    //       x: pan.x + deltaX,
    //       y: pan.y + deltaY,
    //     });
    //     setLastPanPoint({ x: e.clientX, y: e.clientY });
    //     return;
    //   }

    //   if (!isDrawing && !isSelectingDraw) return;

    //   setCurrentRect({
    //     x1: Math.min(startPos.x, pos.x),
    //     y1: Math.min(startPos.y, pos.y),
    //     x2: Math.max(startPos.x, pos.x),
    //     y2: Math.max(startPos.y, pos.y),
    //   });
    // };

    // const handleMouseUp = (e) => {
    //   e.preventDefault();
    //   const pos = getMousePos(e);
    //   const px = startPos.x;
    //   const py = startPos.y;
    //   const is_small = Boolean(Math.abs(pos.x - px) <= 4 && Math.abs(pos.y - py) <= 4);

    //   if (e.ctrlKey && e.button === 0 && is_small) {
    //     const selectedRect = findRectAtPosition(pos.x, pos.y);
        
    //     if (showSignaturePoints) {
    //       setSelectedSignatures((prev) => {
    //           const existingIndex = prev.findIndex(rect => 
    //           rect.groupIndex === selectedRect.groupIndex && 
    //           rect.pointIndex === selectedRect.pointIndex
    //         );
            
    //         if (existingIndex !== -1) {
    //           return prev.filter((_, index) => index !== existingIndex);
    //         } else {
    //           const newArray = [...prev, selectedRect];
    //           return newArray.sort((a, b) => 
    //             a.groupIndex - b.groupIndex || a.pointIndex - b.pointIndex
    //           );
    //         }
    //       });
    //     } else if (showAllRects) {
    //       setSelectedAllRects((prev) => {
    //         const existingIndex = prev.findIndex(rect => rect.pointIndex === selectedRect.pointIndex);
            
    //         if (existingIndex !== -1) {
    //           return prev.filter((_, index) => index !== existingIndex);
    //         } else {
    //           const newArray = [...prev, selectedRect];
    //           return newArray.sort((a, b) => a.pointIndex - b.pointIndex);
    //         }
    //       });
    //     }
    //   }
    //   // console.log(selectedField)
    //   if (selectedField && Object.keys(selectedField).length > 0 && (showAllRects || showSignaturePoints) && is_small) {
    //     setIsDrawing(false);
    //     setIsDragging(false);
    //     setLastPanPoint(null);
    //     const selectedRect = findRectAtPosition(pos.x, pos.y);
    //     // console.log("Selected Rect:", selectedRect);
    //     if (!selectedRect) {
    //       return;
    //     }
    //     const {x1, y1, x2, y2} = selectedRect.rect;
    //     const currRect = {
    //       x1,y1,x2,y2
    //     }
    //     // setCurrentRect(selectedRect ? currRect : null);
    //     setCurrentPageData((prevData) => {
    //         const updatedData = { ...prevData };
    //         if (updatedData[selectedField.sectionName]) {
    //           const sectionValue = {
    //             ...updatedData[selectedField.sectionName],
    //           };
    //           if (sectionValue[selectedField.fieldKey]) {
    //             const updatedField = {
    //               ...sectionValue[selectedField.fieldKey],
    //             };
    //             updatedField.coordinates = currRect;
    //             sectionValue[selectedField.fieldKey] = updatedField;
    //             updatedData[selectedField.sectionName] = sectionValue;
    //           }
    //         }
    //         return updatedData;
    //       });
    //       setSelectedField({});
    //       // setViewMode("select");
    //   }

    //   if (e.button === 2 && (showAllRects || showSignaturePoints || showAllRects)) {
    //     if (!activeSection) {
    //       showToast(
    //         "No active section selected. Please select a section first.",
    //         "error"
    //       );
    //       return;
    //     }

    //     setRightClickMenu({
    //       visible: false,
    //       x: 0,
    //       y: 0,
    //       rectIndex: -1,
    //       rectType: null,
    //       multiSelect: false,
    //       selectedRects: [],
    //     });

    //     if (selectedSignatures.length > 0) {
    //       handleContextMenu(e, {
    //         multiSelect: true,
    //         selectedRects: selectedSignatures,
    //       });
    //     } else if (selectedAllRects.length > 0) {
    //       handleContextMenu(e, {
    //         multiSelect: true,
    //         selectedRects: selectedAllRects,
    //       });
    //     } else {
    //       const rectInfo = findRectUnderCursor(pos.x, pos.y);

    //       if (rectInfo) {
    //         handleContextMenu(e, rectInfo);
    //       }
    //     }
    //     return false;
    //   }

    //   if (isDragging) {
    //     setIsDragging(false);
    //     setLastPanPoint(null);
    //     return;
    //   }

    //   if (isDrawing && !is_small) {
    //     setIsDrawing(false);
    //     if (currentRect && selectedField) {
    //       setCurrentPageData((prevData) => {
    //         const updatedData = { ...prevData };
    //         if (updatedData[selectedField.sectionName]) {
    //           const sectionValue = {
    //             ...updatedData[selectedField.sectionName],
    //           };
    //           if (sectionValue[selectedField.fieldKey]) {
    //             const updatedField = {
    //               ...sectionValue[selectedField.fieldKey],
    //             };
    //             updatedField.coordinates = currentRect;
    //             sectionValue[selectedField.fieldKey] = updatedField;
    //             updatedData[selectedField.sectionName] = sectionValue;
    //           }
    //         }
    //         return updatedData;
    //       });
    //     }
    //     setCurrentRect(null);
    //     if (isMBR) {
    //       setSelectedField({});
    //       setViewMode("select");
    //     }
    //   } else if (isSelectingDraw && !is_small) {
    //     setIsSelectingDraw(false);

    //     if (currentRect && showSignaturePoints) {
    //       const selectedRects = findSignaturesInSelection(currentRect);

    //       setSelectedSignatures(prev => {
    //         // Filter out duplicates based on groupIndex + pointIndex combination
    //         const newRects = selectedRects.filter(newRect =>
    //           !prev.some(existingRect =>
    //             existingRect.groupIndex === newRect.groupIndex &&
    //             existingRect.pointIndex === newRect.pointIndex
    //           )
    //         );

    //         if (newRects.length > 0) {
    //           const combined = [...prev, ...newRects];
    //           return combined.sort((a, b) =>
    //             a.groupIndex - b.groupIndex || a.pointIndex - b.pointIndex
    //           );
    //         }
    //         return prev;
    //       });

    //     } else if (currentRect && showAllRects) {
    //       const selectedRects = findAllRectInSelection(currentRect);

    //       setSelectedAllRects(prev => {
    //         // Filter out duplicates based on pointIndex
    //         const newRects = selectedRects.filter(newRect =>
    //           !prev.some(existingRect => existingRect.pointIndex === newRect.pointIndex)
    //         );

    //         if (newRects.length > 0) {
    //           const combined = [...prev, ...newRects];
    //           return combined.sort((a, b) => a.pointIndex - b.pointIndex);
    //         }
    //         return prev;
    //       });
    //     }
    //     setCurrentRect(null);
    //   } else if (isSelectingDraw) {
    //     setIsSelectingDraw(false);
    //     setCurrentRect(null);
    //   }
    // };


    return (
      <div className="canvaInner scrollHide">
        <div
          ref={containerRef}
          className="canvasBody relative flex-1 overflow-hidden bg-[#1e1e2f]"
          onWheel={handleWheel}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          <canvas
            ref={canvasRef}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
            className="absolute"
            style={{
              cursor: isDragging
                ? "grabbing"
                : viewMode === "draw"
                ? isDrawing
                  ? "crosshair"
                  : "cell"
                : "pointer",
              transform: `translate(${pan.x}px, ${pan.y}px)`,
            }}
          />
          {/* {rightClickMenu.visible && <RightClickMenu />} */}
        </div>
      </div>
    );
  };

export default Canvas;
