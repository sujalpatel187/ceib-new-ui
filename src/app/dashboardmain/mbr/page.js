"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./mbr.scss";
import Wrap from "@/app/dashboardmain/page";
import SilverButton from "@/app/components/SilverButton/SilverButton";
import { Col, Form, Modal, Row, Table } from "react-bootstrap";
import { IoCloseCircleOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiCopy, FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "@/app/components/pagination/pagination";
import SilverButtonGray from "@/app/components/SilverButton/SilverButtonGray";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { webScoketUrl } from "@/app/utils/apiUtils";
import {
  deleteMbr,
  fetchMbrCount,
  fetchMbrPagination,
  uploadMbr,
  cloneMbr
} from "@/lib/features/mbr/mbrActions";
import {
  changePage,
  clearCurrentMbr,
  setMbrId,
} from "@/lib/features/mbr/mbrSlice";
import { redirect, useRouter } from "next/navigation";
import { getRoleApi } from "@/lib/features/auth/authActions";
import { showToast } from "../../utils/Toast";
import { useRef } from "react";
import Loader from "@/app/components/Loader/Loader";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { getUsersFacilities } from "@/lib/features/userManagement/userManagementAction";
import SilverSelect from "@/app/components/SilverSelect/SilverSelect";
import { hasRightByDict } from "@/app/utils/rightUtils";
import { setCompanyId, setFacilityId, setSubCompanyId } from "@/lib/features/userManagement/userManagementSlice";
import ProgressBar from "react-bootstrap/ProgressBar";

const MBR = ({ children, leftNav = true }) => {
  const [show, setShow] = useState(false);
  const [cloneShow, setCloneShow] = useState(false);
  const [cloneMbrId, setCloneMbrId] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const handleShow = () => setShow(true);
  const [files, setFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    MbrName: "",
    ProductName: "",
    // BatchName: "",
    ProductType: "",
    Facility: "select",
    Code: "",
    BatchSize: "",
    Files: [],
  });

  const { mbrList, currentPage, deleteStatus, pageListLoading } = useSelector(
    (state) => state.mbr
  );
  const { user } = useSelector((state) => state.auth);
  const { usersFacilities } = useSelector((state) => state.userManagement);
  const router = useRouter();
  const dispatch = useDispatch();

  const { isConnected, lastMessage } = useWebSocket(`${webScoketUrl}`);

  const [selectedOption, setSelectedOption] = useState("");


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) router.replace("/login");
  // }, []);

  useEffect(() => {
    dispatch(clearCurrentMbr());
    if (lastMessage) {
      // console.log("message", lastMessage);
      if (
        lastMessage.message &&
        lastMessage.message == "MBR Mapping Inserted"
      ) {
        clearValues();
      }
    }
    handleFetchMbrPagination();
    if (user && user.role_id && user.role_id < 4) {
      dispatch(getUsersFacilities());
    }
    if (!user) {
      dispatch(getRoleApi());
    }
  }, [lastMessage, dispatch, user,currentPage, isConnected]);

  useEffect(() => {
    if (searchQuery) dispatch(changePage(1));
    handleFetchMbrPagination();
  }, [searchQuery]);

  const handleFetchMBRCount = async (query = null) => {
    const res = searchQuery
      ? await dispatch(fetchMbrCount(query)).unwrap()
      : await dispatch(fetchMbrCount()).unwrap();
    const totalPages = Math.ceil(res / itemsPerPage);
    setTotalPages(totalPages);
    setTotalItems(res);
  };

  const handleClose = () => {
    clearValues();
  };

  const handleCloneClose = () => {
    setFormData({
      MbrName: "",
      ProductName: "",
      // BatchName: "",
      ProductType: "",
      Code: "",
      BatchSize: "",
      Files: [],
    });
    setSelectedOption("")
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
    // setFiles([]);
    setErrors({});
    setCloneShow(false);
    setCloneMbrId("");
  }

  const clearValues = () => {
    setFormData({
      MbrName: "",
      ProductName: "",
      // BatchName: "",
      ProductType: "",
      Code: "",
      BatchSize: "",
      Files: [],
    });
    setSelectedOption("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFiles([]);
    setErrors({});
    setShow(false);
  };

  const handleFetchMbrPagination = async () => {
    await handleFetchMBRCount(searchQuery);
    searchQuery
      ? dispatch(
          fetchMbrPagination({
            page: currentPage,
            count: itemsPerPage,
            query: searchQuery,
          })
        )
      : dispatch(
          fetchMbrPagination({ page: currentPage, count: itemsPerPage })
        );
  };

  const goToPage = async (pageNumber) => {
    dispatch(changePage(pageNumber));
  };

  const [errors, setErrors] = useState({}); // State to track validation errors
  const options = [
     "Capsules", "Grams (g)", "Kilograms (kg)",  "Liters (L)", "Milliliters (mL)", "Nos", "Tablets",
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    let newErrors = { ...errors };
    // console.log(name,value)
    // Update form data first
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation for BatchSize
    if (name === "BatchSize") {
      if (value.trim() === "" || isNaN(value)) {
        newErrors[name] = "Batch Size is required and must be a number";
      } else if (parseInt(value, 10) > 100000) {
        newErrors[name] = "Batch Size cannot be greater than 100000"; // Show error for negative value or non-integer value
      } else if (parseInt(value, 10) < 0) {
        newErrors[name] = "Batch Size must be positive integer"; // Show error for 0
      } else if (parseInt(value, 10) === 0) {
        newErrors[name] = "Batch Size must be greater than 0"; // Show error for 0
      } else {
        newErrors[name] = ""; // Clear error if valid
      }
    }
    // General validation for empty fields
    else if (value.trim() === "") {
      if (name === "MbrName") {
        newErrors[name] = "MBR Name is required";
      } else {
        newErrors[name] = `${name.replace(/([A-Z])/g, " $1")} is required`;
      }
    } else {
      newErrors[name] = ""; // Clear other errors if valid
    }

    // Update errors state
    setErrors(newErrors);
  };

  const handleEditMbr = (mbrId,facilityId,subCompanyId,companyId) => {
    localStorage.setItem("mbrId", mbrId);
    dispatch(setSubCompanyId(subCompanyId));
    dispatch(setFacilityId(facilityId));
    dispatch(setCompanyId(companyId));
    dispatch(setMbrId(mbrId));
    router.push("/dashboardmain/mbr/edit");
  };

  const handleDeleteMbr = async (mbrId) => {
    if (window.confirm("Are you sure you want to delete this MBR?")) {
      dispatch(deleteMbr(mbrId));
      showToast("Delete MBR Successfully", "success");
    }
  };

  const handleCloneMbr = async (e) => {
    e.preventDefault();

    if(!isValid(false)){
      return
    }
    const payload = user.role_id < 4 ?
      {
          mbr_id : cloneMbrId,
          mbrFormData: {...formData, ...{"Unit" : selectedOption}},
          facilityId: formData.Facility,
          sub_company_id: user.sub_company_id,
          company_id: user.company_id,
      } : {
          mbr_id : cloneMbrId,
          mbrFormData: {...formData, ...{"Unit" : selectedOption}},
          facilityId: user.facility_id,
          sub_company_id: user.sub_company_id,
          company_id: user.company_id,
      };
    dispatch(cloneMbr(payload))
            .then((resultAction) => {
              if (cloneMbr.fulfilled.match(resultAction)) {
                showToast("clone Successfully", "success");
                handleFetchMbrPagination();
                handleCloneClose()
              } else {
                showToast(resultAction.payload || 'Failed to clone mbr.',"error");
              }
            })
            .catch((error) => {
              console.error("Error :", error);
              showToast("An error occurred while clone the page","error")
            });
  };

  const handleReset = () => {
    setSearchQuery({});
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; // Clear the text field directly
    }
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "select"; // Reset to the default 'select' value
    });
  };
  useEffect(() => {
    if (deleteStatus) {
      dispatch(fetchMbrPagination({ page: currentPage, count: itemsPerPage }));
    }
  }, [deleteStatus]);

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
      return updatedFiles.length === 0 ? [] : updatedFiles;
    });

    setFormData((prevState) => ({
      ...prevState,
      Files: prevState.Files.filter((file) => file.name !== fileName),
    }));

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isValid = (fileRequire = true) => {
    let validationErrors = {};
    if (selectedOption === "") {
      validationErrors["BatchSize"] = "Select one unit"
    }

    if (!options.includes(selectedOption)){
      validationErrors["BatchSize"] = "Not valid Unit"
    }

    Object.keys(formData).forEach((key) => {
      // console.log(key)
      if (key === "Facility" && !(user.role_id < 4)) {
          return;
      }
      const value = formData[key];
      if (key === "Files" && !fileRequire){
        return;
      }

      if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
      ) {
          if (key === "MbrName") {
              validationErrors[key] = "MBR Name is required";
          }
          else{
              validationErrors[key] = `${key.replace(
                  /([A-Z])/g,
                  " $1"
              )} is required`;
          }
      }
  });


    if (formData.BatchSize.trim() !== "" && !/^\d+$/.test(formData.BatchSize)) {
        validationErrors["BatchSize"] = "Batch Size must be a valid number";
    }
    
    if (fileRequire && formData.Files.length === 0) {
        validationErrors["Files"] = "File is required";
    }

    if (formData.ProductType === "select") {
        validationErrors["ProductType"] = "Product Type is required";
    }

    if ((user.role_id < 4) && formData.Facility === "select") {
        validationErrors["Facility"] = "Facility is required";
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
    }
    return true
  }

  const handleCreateMbr = async (e) => {
    e.preventDefault();

    if(!isValid()){
      return
    }

    try {
        setIsSubmitting(true);
        const payload = user.role_id < 4 ?
            {
                mbrFormData: {...formData, ...{"Unit" : selectedOption}},
                facilityId: formData.Facility,
                sub_company_id: user.sub_company_id,
                company_id: user.company_id,
            } : {
                mbrFormData: {...formData, ...{"Unit" : selectedOption}},
                facilityId: user.facility_id,
                sub_company_id: user.sub_company_id,
                company_id: user.company_id,
            };

        const res = await dispatch(
            uploadMbr(payload)
        ).unwrap();
        // console.log(res)
        
        if (res.status === 200) {
            setShow(false);
            handleFetchMbrPagination();
            showToast(res.message, "success")
        }

        // Reset form and errors
        setFormData({
            MbrName: "",
            ProductName: "",
            // BatchName: "",
            ProductType: "",
            Facility: "",
            Code: "",
            BatchSize: "",
            Files: [],
        });
        setSelectedOption("")
        setFiles([]);
        setErrors({});
    } catch (error) {
        setIsSubmitting(false);
        // showToast(error, "error");
        // console.error("Error submitting form:", error);
    } finally {
        setIsSubmitting(false);
    }
};

  const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);
  let newErrors = { ...errors };

  const duplicateFiles = newFiles.filter((newFile) =>
    files.some(
      (existingFile) =>
        existingFile.name === newFile.name &&
        existingFile.size === newFile.size
    )
  );

  if (duplicateFiles.length > 0) {
    showToast("These files are already uploaded!", "warning");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    return; // don't add duplicates
  }

  setFiles((prevFiles) => {
    let currentFiles = [...prevFiles];

    if (currentFiles.length === 0) {
      const validFiles = newFiles.filter((file) =>
        ["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(file.type)
      );

      if (validFiles.length !== newFiles.length && !window.toastShown) {
        showToast("Only PDF, PNG, JPG, and JPEG files are allowed!", "error");
        window.toastShown = true;
        setTimeout(() => {
          window.toastShown = false;
        }, 1000);
      }

      if (validFiles.length === 0) {
        newErrors["Files"] = "Only PDF, PNG, JPG, and JPEG image files are allowed!";
        console.log("Herere valid files are 0")
        setErrors(newErrors);
        return prevFiles;
      }

      setErrors({ ...errors, Files: "" });
      setFormData((prevState) => ({
        ...prevState,
        Files: [...validFiles],
      }));
      return validFiles;
    } else {
      // Check first uploaded file type — since now only images are allowed, just check for image types
      const validFiles = newFiles.filter((file) =>
        ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
      );

      if (validFiles.length !== newFiles.length && !window.toastShown) {
        showToast("Only PNG, JPG, and JPEG image files can be uploaded!", "error");
        window.toastShown = true;
        setTimeout(() => {
          window.toastShown = false;
        }, 1000);
      }

      const uniqueFiles = validFiles.filter(
        (file) =>
          !currentFiles.some(
            (prevFile) =>
              prevFile.name === file.name && prevFile.size === file.size
          )
      );

      if (uniqueFiles.length !== validFiles.length && !window.duplicateToastShown) {
        showToast("These files are already uploaded!", "warning");
        window.duplicateToastShown = true;
        setTimeout(() => {
          window.duplicateToastShown = false;
        }, 1000);
      }

      setErrors({ ...errors, Files: "" }); // Clear errors if valid
      setFormData((prevState) => ({
        ...prevState,
        Files: [...currentFiles, ...uniqueFiles],
      }));
      return [...currentFiles, ...uniqueFiles];
    }
  });

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  const handleSort = (field) => {
    setSearchQuery((prev) => {
      const newQuery = { ...prev };
      const currentSortValue = prev?.sort_by?.[field];

      if (!currentSortValue) {
        newQuery.sort_by = { [field]: 1 };
      } else if (currentSortValue === 1) {
        newQuery.sort_by = { [field]: -1 };
      } else {
        delete newQuery.sort_by;
      }

      return newQuery;
    });
  };

  // Helper function to render sort icon
  const getSortIcon = (field) => {
    const sortValue = searchQuery?.sort_by?.[field];
    if (sortValue === 1) {
      return (
        <span className="d-inline-flex flex-row">
          <BsArrowUp
            className="small primaryColor"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowUp>
          <BsArrowDown
            className="small text-secondary"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowDown>
        </span>
      );
    } else if (sortValue === -1) {
      return (
        <span className="d-inline-flex flex-row">
          <BsArrowUp
            className="small text-secondary"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowUp>
          <BsArrowDown
            className="small primaryColor"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowDown>
        </span>
      );
    } else {
      return (
        <span className="d-inline-flex flex-row">
          <BsArrowUp
            className="small text-secondary"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowUp>
          <BsArrowDown
            className="small text-secondary"
            style={{ fontSize: "0.7rem" }}
          ></BsArrowDown>
        </span>
      );
    }
  };

  const columns = [
    { field: "sr_no", label: "Sr. No.", sortable: false },
    { field: "mbr_name", label: "MBR Name", sortable: true },
    { field: "product_name", label: "Product/Drug Name", sortable: true },
    { field: "product_type", label: "Product Type", sortable: true },
    { field: "last_updated", label: "Last Updated On", sortable: true },
    // { field: "batch_name", label: "Batch Name", sortable: true },
    { field: "code", label: "Code", sortable: true },
    { field: "batch_size", label: "Batch Size", sortable: true },
    { field: "status", label: "Upload Status", sortable: false },
    { field: "approval_status", label: "Approval Status", sortable: false, },
    { field: "actions", label: "Actions", sortable: false },
  ];

  const handleOptionChange = (selectedValue) => {
    if (!options.includes(selectedValue)){
      errors.BatchSize = "Please select valid value for Units"
    }else if(errors.BatchSize === "Please select valid value for Units" || errors.BatchSize === "Select one unit" || errors.BatchSize === "Not valid Unit"){
      errors.BatchSize = ""
    }
    setSelectedOption(selectedValue);
  };

  return (
    <Wrap>
      <div className="innerPadding">
        {user && user.rights && (
          <>
            <div className="headTitle d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Master Batch Records (MBR)</h4>
              {hasRightByDict(user.rights,1,1) && (
                <SilverButton className="bg-transparent" onClick={handleShow}>
                  Create New MBR
                </SilverButton>
              )}
            </div>
            <div className="mbrSection">
              <div className="rightBox">
                <Form>
                  <div className="form-group">
                  {user && (user.role_id < 4) && <Form.Select
                    name="Facility"
                    onChange={(e) =>
                      setSearchQuery((prev) => {
                        const newQuery = { ...prev };
                        console.log(e.target.value);
                        if (e.target.value !== "select") {
                          newQuery.facility_id = parseInt(e.target.value);
                        } else {
                          delete newQuery.facility_id;
                        }
                        return newQuery;
                      })}
                    >
                      <option value="select">Select Facility</option>
                      {usersFacilities && usersFacilities.flatMap((data, index) =>
                        data.facilities.map((facility, facilityIndex) => (
                          <option
                            key={`${index}-${facilityIndex}`}
                            value={facility.facility_id}
                          >
                            {`${facility.facility_name} (${data.sub_company_name})`}
                          </option>
                        ))
                      )}
                    </Form.Select>}
                  </div>

                  <div className="form-group">
                  
                    <Form.Control
                      type="text"
                      placeholder="Search Product Name here"
                      ref={searchInputRef}
                      onChange={(e) =>
                        setSearchQuery((prev) => {
                          const newQuery = { ...prev };
                          if (e.target.value) {
                            newQuery.product_name = e.target.value;
                          } else {
                            delete newQuery.product_name;
                          }
                          return newQuery;
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <Form.Select
                      aria-label="Select Status"
                      onChange={(e) =>
                        setSearchQuery((prev) => {
                          const newQuery = { ...prev };
                          if (e.target.value !== "select") {
                            newQuery.validation_extraction_status =
                              e.target.value;
                          } else {
                            delete newQuery.validation_extraction_status;
                          }
                          return newQuery;
                        })
                      }
                    >
                      <option value="select">Status</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                    </Form.Select>
                  </div>
                  <div className="form-group">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) =>
                        setSearchQuery((prev) => {
                          const newQuery = { ...prev };
                          if (e.target.value !== "select") {
                            newQuery.product_type = e.target.value;
                          } else {
                            delete newQuery.product_type;
                          }
                          return newQuery;
                        })
                      }
                    >
                      <option value="select">Product Type</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Drops">Drops</option>
                      <option value="Injectable">Injectable</option>
                      <option value="Liquid">Liquid</option>
                      <option value="Tablet">Tablet</option>
                    </Form.Select>
                  </div>
                  <div className="d-flex gap-2">
                    <SilverButton onClick={handleReset}>Clear All</SilverButton>
                  </div>
                  {/* <SilverButton className='bg-transparent'>Search</SilverButton> */}
                </Form>
              </div>
              <div className="customTable">
                <Table responsive>
                  <thead>
                    <tr>
                      {columns.map(({ field, label, sortable, size }) => (
                        <th
                          key={field}
                          onClick={
                            sortable ? () => handleSort(field) : undefined
                          }
                          className={`text-left ${
                            sortable ? "cursor-pointer hover:bg-gray-50" : ""
                          }`} style={{minWidth: size}}
                        >
                          <span className="d-flex align-items-center">
                            {label}
                            {sortable && getSortIcon(field)}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mbrList.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No records found
                        </td>
                      </tr>
                    ) : (
                      mbrList.map((item, index) => (
                        <tr key={index}>
                          <td data-label="Sr. No.">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td data-label="MBR Name">
                            {item.mbrData.mbrName}
                          </td>
                          <td data-label="Product/Drug Name">
                            {item.mbrData.productName}
                          </td>
                          <td data-label="Product Type">
                            {item.mbrData.productType}
                          </td>
                          <td data-label="Last Updated On">
                            {item.mbrData.createdAt
                              ? new Date(item.mbrData.createdAt)
                                  .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })
                                  .replace(",", "")
                              : "-"}
                          </td>
                          {/* <td data-label="Batch Name">
                            {item.mbrData.batchName}
                          </td> */}
                          <td data-label="Code">
                            {item.mbrData.code ? item.mbrData.code : "-"}
                          </td>
                          <td data-label="Batch Size">
                            {item.mbrData.batchSize
                              ? item.mbrData.batchSize
                              : "-"}
                          </td>
                          {Object.keys(item.mbrData).includes("summary") && item.mbrData.summary ?
                              <td data-label="Processed Page(s)">
                                <span>
                                <span className="progressText text-dark f-12 text-center d-block">
                                  {Object.keys(item.mbrData.summary).length == 0 ? 0 : item.mbrData.summary.completed_pages }/
                                  {Object.keys(item.mbrData.summary).length == 0 ? 0 : item.mbrData.summary.total_pages}
                                </span>
                              <ProgressBar
                                  variant={ item.mbrData.summary.completion_percentage == 100 ? "success" : "info"}
                                  now={(item.mbrData.summary.completed_pages / item.mbrData.summary.total_pages) * 100}
                              />
                                </span>
                              </td> :
                            <td data-label="Status">
                            <span
                            className={
                            item.mbrData.validationExtractionStatus ===
                            "Completed"
                            ? "completedBtn w-100"
                                        : "processBtn w-100"
                                  }
                              >
                                {item.mbrData.validationExtractionStatus}
                              </span>
                              </td>
                          }
                          <td data-label="ApprovalStatus">
                            <span
                                className={
                                  item.mbrData.approvedStatus ===
                                  "Approved"
                                      ? "completedBtn w-100"
                                      : "processBtn w-100"
                                }
                            >
                              {item.mbrData.approvedStatus}
                            </span>
                          </td>
                          <td data-label="Actions">
                            <div className="d-flex gap-2 align-items-center">
                              {/* {item.mbrData.validationExtractionStatus !==
                              "Pending" && (
                              <span
                                title="View"
                                className="cursor-pointer viewIcn"
                                onClick={() =>
                                  handleEditMbr(item.mbrData.mbrId)
                                }
                              >
                                <IoEyeOutline />
                              </span>
                            )} */}
                              {(item.mbrData.validationExtractionStatus !==
                                "Pending" || item.mbrData.summary?.total_pages > 0) &&
                                item.mbrData.validationExtractionStatus !==
                                  "Error" &&
                                user &&
                                user.rights && (hasRightByDict(user.rights,1,2) || hasRightByDict(user.rights,1,4))  && (
                                  <span
                                    title="Edit"
                                    className="cursor-pointer editIcn"
                                    onClick={() =>{
                                      localStorage.setItem("isEditable",item.mbrData.bmrCount && item.mbrData.bmrCount > 0 ? "false" : "true");
                                      localStorage.setItem("mbrPageCount",item.mbrData.mbrPageCount);
                                      localStorage.setItem("approvedStatus",item.mbrData.approvedStatus);
                                      handleEditMbr(item.mbrData.mbrId,item.mbrData.facilityId,item.mbrData.subCompanyId,item.mbrData.companyId)
                                    }}
                                  >
                                    <FiEdit />
                                  </span>
                                )}
                              {user && user.rights && hasRightByDict(user.rights,1,3) && (
                                <span
                                  title="Delete"
                                  className="cursor-pointer deleteIcn"
                                  onClick={() =>
                                    handleDeleteMbr(item.mbrData.mbrId)
                                  }
                                >
                                  <FiTrash2 />
                                </span>
                              )}
                              {user && user.rights && hasRightByDict(user.rights,1,1) && item.mbrData.validationExtractionStatus ===
                                "Completed" &&<span
                                  title="Clone"
                                  className="cursor-pointer warningIcn"
                                  onClick={() => {
                                    // handleCloneMbr(item.mbrData.mbrId)
                                    setCloneMbrId(item.mbrData.mbrId)
                                    let [size, ...unitParts] = item.mbrData.batchSize.split(' ');
                                    let unit = unitParts.join(' ');
                                    setFormData({
                                      MbrName: item.mbrData.mbrName,
                                      ProductName: item.mbrData.productName,
                                      ProductType: item.mbrData.productType,
                                      Facility: "select",
                                      Code: item.mbrData.code,
                                      BatchSize: size,
                                      Files: [],
                                    })
                                    setSelectedOption(unit)
                                    setCloneShow(true)
                                  }
                                }
                                >
                                  <FiCopy/>
                                </span>}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  totalRecords={totalItems}
                  limit={itemsPerPage}
                  page={currentPage}
                  onPageChange={goToPage}
                />
              )}
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                {" "}
                <Modal.Title>Create New MBR</Modal.Title>{" "}
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleCreateMbr}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formGridMBRName">
                        <Form.Label>MBR Name</Form.Label>
                        <Form.Control
                          name="MbrName"
                          type="text"
                          placeholder="Enter MBR Name"
                          value={formData.MbrName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.MbrName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.MbrName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formGridProduct">
                        <Form.Label>Product/Drug Name</Form.Label>
                        <Form.Control
                          name="ProductName"
                          type="text"
                          placeholder="Enter Product/Drug Name"
                          value={formData.ProductName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.ProductName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ProductName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formGridProductType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Select
                          name="ProductType"
                          value={formData.ProductType}
                          onChange={handleInputChange}
                          isInvalid={!!errors.ProductType}
                        >
                          <option value="select">Select Product Type</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Drops">Drops</option>
                          <option value="Injectable">Injectable</option>
                          <option value="Liquid">Liquid</option>
                          <option value="Tablet">Tablet</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.ProductType}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formGridCode">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          name="Code"
                          placeholder="Enter Code"
                          value={formData.Code}
                          onChange={handleInputChange}
                          isInvalid={!!errors.Code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Code}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">

                    <Col md={6}>
                      <Form.Label>Batch Size</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                      <Form.Group controlId="formGridBatchSize" className="w-100">
                        <div className="d-flex flex-column w-100">
                          <div className="d-flex gap-3">
                            <div>
                              <Form.Control
                                name="BatchSize"
                                type="number"
                                placeholder="Enter Batch Size"
                                value={formData.BatchSize}
                                onChange={handleInputChange}
                                isInvalid={!!errors.BatchSize}
                                />
                                <div style={{fontSize:'0.875em',color:'#dc3545'}}>
         												   {errors.BatchSize}
         												</div>
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.BatchSize}
                              </Form.Control.Feedback> */}
                              </div>
                            <SilverSelect
                              options={options}
                              value={selectedOption}
                              onChange={handleOptionChange}
                              placeholder="Units"
                            />
                          </div>
                        </div>
                      </Form.Group>
                        {/* <SilverSelect options={options} value={selectedOption} onChange={handleOptionChange} placeholder="Weight"/> */}
                      </div>
                    </Col>
                    {user && (user.role_id < 4) &&
                    <Col md={6}>
                      <Form.Group controlId="formGridFacility">
                        <Form.Label>Facility</Form.Label>
                        <Form.Select
                          name="Facility"
                          value={formData.Facility}
                          onChange={handleInputChange}
                          isInvalid={!!errors.Facility}
                          >
                            <option value="select">Select Facility</option>
                            {usersFacilities && usersFacilities.flatMap((data, index) =>
                              data.facilities.map((facility, facilityIndex) => (
                                <option
                                  key={`${index}-${facilityIndex}`}
                                  value={facility.facility_id}
                                >
                                  {`${facility.facility_name} (${data.sub_company_name})`}
                                </option>
                              ))
                            )}
                          </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.Facility}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  }
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridBatchSize">
                      <div className="d-lg-flex gap-3">
                        <div
                          className={`uploadBox position-relative ${
                            files.length === 0 ? "w-100" : "w-lg-50"
                          }`}
                        >
                          <MdOutlineFileUpload />
                          <p className="f-14">
                            Drop your MBR file here, or click to browse
                          </p>
                          <span className="d-block">
                            Upload your Manufacturing Batch Record (MBR) file
                            here.
                            <br /> (PDF, JPG, JPEG, PNG only)
                          </span>
                          <Form.Control
                            name="Files"
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            isInvalid={!!errors.Files}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Files}
                          </Form.Control.Feedback>
                        </div>
                        {files.length > 0 && (
                          <div className="fileList w-100 w-lg-50">
                            <ul>
                              {files.map((file, index) => (
                                <li
                                  key={index}
                                  className="d-flex justify-content-between"
                                >
                                  {file.name}
                                  <Link
                                    href="#"
                                    onClick={() => handleRemoveFile(file.name)}
                                    className="text-danger"
                                  >
                                    <IoCloseCircleOutline />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <SilverButtonGray onClick={handleClose}>
                  Cancel
                </SilverButtonGray>
                <SilverButton
                  type="submit"
                  onClick={handleCreateMbr}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create MBR"}
                </SilverButton>
              </Modal.Footer>
            </Modal>

            <Modal
              show={cloneShow}
              onHide={handleCloneClose}
              backdrop="static"
              keyboard={false}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                {" "}
                <Modal.Title>Clone MBR</Modal.Title>{" "}
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleCreateMbr}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formGridMBRName">
                        <Form.Label>MBR Name</Form.Label>
                        <Form.Control
                          name="MbrName"
                          type="text"
                          placeholder="Enter MBR Name"
                          value={formData.MbrName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.MbrName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.MbrName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formGridProduct">
                        <Form.Label>Product/Drug Name</Form.Label>
                        <Form.Control
                          name="ProductName"
                          type="text"
                          placeholder="Enter Product/Drug Name"
                          value={formData.ProductName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.ProductName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ProductName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formGridProductType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Select
                          name="ProductType"
                          value={formData.ProductType}
                          onChange={handleInputChange}
                          isInvalid={!!errors.ProductType}
                        >
                          <option value="select">Select Product Type</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Drops">Drops</option>
                          <option value="Injectable">Injectable</option>
                          <option value="Liquid">Liquid</option>
                          <option value="Tablet">Tablet</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.ProductType}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formGridCode">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          name="Code"
                          placeholder="Enter Code"
                          value={formData.Code}
                          onChange={handleInputChange}
                          isInvalid={!!errors.Code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Code}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">

                    <Col md={6}>
                      <Form.Label>Batch Size</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                      <Form.Group controlId="formGridBatchSize" className="w-100">
                        <div className="d-flex flex-column w-100">
                          <div className="d-flex gap-3">
                            <div>
                              <Form.Control
                                name="BatchSize"
                                type="number"
                                placeholder="Enter Batch Size"
                                value={formData.BatchSize}
                                onChange={handleInputChange}
                                isInvalid={!!errors.BatchSize}
                                />
                                <div style={{fontSize:'0.875em',color:'#dc3545'}}>
         												   {errors.BatchSize}
         												</div>
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.BatchSize}
                              </Form.Control.Feedback> */}
                              </div>
                            <SilverSelect
                              options={options}
                              value={selectedOption}
                              onChange={handleOptionChange}
                              placeholder="Units"
                            />
                          </div>
                        </div>
                      </Form.Group>
                        {/* <SilverSelect options={options} value={selectedOption} onChange={handleOptionChange} placeholder="Weight"/> */}
                      </div>
                    </Col>
                    {user && (user.role_id < 4) &&
                    <Col md={6}>
                      <Form.Group controlId="formGridFacility">
                        <Form.Label>Facility</Form.Label>
                        <Form.Select
                          name="Facility"
                          value={formData.Facility}
                          onChange={handleInputChange}
                          isInvalid={!!errors.Facility}
                          >
                            <option value="select">Select Facility</option>
                            {usersFacilities && usersFacilities.flatMap((data, index) =>
                              data.facilities.map((facility, facilityIndex) => (
                                <option
                                  key={`${index}-${facilityIndex}`}
                                  value={facility.facility_id}
                                >
                                  {`${facility.facility_name} (${data.sub_company_name})`}
                                </option>
                              ))
                            )}
                          </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.Facility}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  }
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <SilverButtonGray onClick={handleCloneClose}>
                  Cancel
                </SilverButtonGray>
                <SilverButton
                  type="submit"
                  onClick={handleCloneMbr}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create MBR"}
                </SilverButton>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </Wrap>
  );
};

export default MBR;
