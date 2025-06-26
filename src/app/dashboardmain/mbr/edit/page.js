/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {  useState } from "react";
import "./edit.scss";
// import "./../mbr.scss";
import Wrap from "@/app/dashboardmain/page";
import {Container } from "react-bootstrap";

import Canvas from "@/app/components/Canvas/Canvas";

const Edit = () => {
  const [leftWidth, setLeftWidth] = useState(60);
  return (
    <>
      <div className="mbrPage">
        <Wrap leftNav={false} footerBar={false}>
          <div className="d-flex">
            <Container
              fluid
              className=" position-relative"
              style={{ width: `${leftWidth}%` }}
            >
            </Container>
            <div
              className="document flex-grow-1"
              style={{ width: `${100 - leftWidth}%` }}
            >
               <Canvas
                // isEditable={isEditable}
                // isPageConfigured={isPageConfigured}
                // ref={canvasRef}
                imageUrl=""
                // selectedField={selectedField}
                // activePage={activePage}
                // currentPageData={currentPageData}
                // setCurrentPageData={setCurrentPageData}
                // setSelectedField={setSelectedField}
                // activeSection={activeSections}
                // setContextShow={handleContextShow}
                // priority={priority}
                // onCountChange={handleCountChange}
              />
            </div>
          </div>
        </Wrap>
      </div>
    </>
  );
};

export default Edit;
