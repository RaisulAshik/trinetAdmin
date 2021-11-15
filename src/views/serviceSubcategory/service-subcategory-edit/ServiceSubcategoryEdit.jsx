import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  CCard,
  CCardBody,
  CToastBody,
  CCardHeader,
  CCol,
  CForm,
  CInvalidFeedback,
  CToastHeader,
  CInputFile,
  CFormGroup,
  CSelect,
  CFormText,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
  CTextarea,
  CSwitch,
  CCardFooter,
  CButton,
} from "@coreui/react";

import { sAdminServiceCategoryApi, sAdminServiceSubcategoryApi } from "src/api";
import commonApi from "src/api/commonApi";

import { checkFileExists, getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { loaderUrl } from "src/constants";

import no_image from "../../../assets/image/no_image.jpg";
import "./ServiceSubcategoryEdit.css";

class ServiceSubcategoryEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      totalApiCount: 2,
      apiLoadedCount: 0,
      toast: null,
      categories: [],
      categoryId: "",
      shortDescription: "",
      longDescription: "",
      extraDescription: "",
      smallImage: null,
      bigImage: null,
      smallImageFile: null,
      bigImageFile: null,
      smallImagePreviewUrl: null,
      bigImagePreviewUrl: null,
      featureAdded: false,
      numberOfFeatures: 0,
      featureFields: [],
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    const { id } = this.props.match.params;

    sAdminServiceSubcategoryApi
      .sAdminGetServiceSubcategoryDetails(id, formattedToken)
      .then((response) => {
        console.log("component did mount", response.data);
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
          title: response.data.title,
          _id: response.data._id,
          bigImage: response.data.bigImage,
          longDescription: response.data.longDescription,
          extraDescription: response.data.extraDescription,
          categoryId:
            response.data.serviceCategory && response.data.serviceCategory._id
              ? response.data.serviceCategory._id
              : null,
          shortDescription: response.data.shortDescription,
          smallImage: response.data.smallImage,
          featureFields: response.data.feature,
          featureAdded:
            response.data.feature && response.data.feature.length > 0
              ? true
              : false,
        });
      });

    sAdminServiceCategoryApi
      .sAdminGetServiceCategoryList(formattedToken)
      .then((response) => {
        this.setState({
          categories: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const {
      title,
      _id,
      categoryId,
      shortDescription,
      longDescription,
      extraDescription,
      smallImageFile,
      bigImageFile,
      featureAdded,
      featureFields,
    } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("title", title);
    fileData.append("serviceCategory", categoryId);
    fileData.append("shortDescription", shortDescription);
    fileData.append("longDescription", longDescription);
    fileData.append(
      "extraDescription",
      extraDescription ? extraDescription : ""
    );
    fileData.append("smallImage", smallImageFile ? smallImageFile : undefined);
    fileData.append("bigImage", bigImageFile ? bigImageFile : undefined);

    if (featureAdded) {
      for (let index = 0; index < featureFields.length; index++) {
        const feature = featureFields[index];

        feature.featureIcon &&
          fileData.append("featureIcon[]", feature.featureIcon);
        feature.featureTitle &&
          fileData.append("featureTitle[]", feature.featureTitle);
        feature.featureDescription &&
          fileData.append("featureDescription[]", feature.featureDescription);
      }
    }

    sAdminServiceSubcategoryApi
      .sAdminUpdateServiceSubcategoryDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          toast: (
            <>
              <CCol sm="12" lg="6">
                <CToaster position="top-right">
                  <CToast
                    title="Successful"
                    show={true}
                    autohide={10000}
                    color="success"
                  >
                    <CToastHeader close>
                      <strong className="me-auto">Successful</strong>
                    </CToastHeader>
                    <CToastBody>Data Updated Successfully</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
          toast: (
            <>
              <CCol sm="12" lg="6">
                <CToaster position="top-right">
                  <CToast
                    title="Error"
                    show={true}
                    autohide={10000}
                    color="danger"
                  >
                    <CToastHeader close>
                      <strong className="me-auto">Error</strong>
                    </CToastHeader>
                    <CToastBody>Data Updating Failed</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });

        console.log(error);
      });
  }

  handleSmallImageChange(e) {
    this.setState({
      smallImageFile: null,
      smallImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        smallImageFile: file,
        smallImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleBigImageChange(e) {
    this.setState({
      bigImageFile: null,
      bigImagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        bigImageFile: file,
        bigImagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  setCategoryInfo(categoryId) {
    this.setState({ categoryId: categoryId || "" });
  }

  showData() {
    const {
      submitting,
      submitted,
      errorStatus,
      title,
      toast,
      categories,
      shortDescription,
      longDescription,
      extraDescription,
      categoryId,
      smallImagePreviewUrl,
      bigImagePreviewUrl,
      smallImage,
      bigImage,
      featureAdded,
      featureFields,
    } = this.state;

    const smallImageExists = checkFileExists(commonApi.api + smallImage);
    const bigImageExists = checkFileExists(commonApi.api + bigImage);

    const titleValid = title ? true : false;
    const categoryIdValid = categoryId ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Service Subcategory
                  <small> Edit</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Updating Subcategory Data Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">Subcategory Name</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      type="title"
                      id="title"
                      name="title"
                      placeholder="Enter Updated Subcategory Name.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter updated subcategory name
                    </CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="select">Change Category Name</CLabel>

                    <CSelect
                      valid={categoryIdValid && submitted}
                      invalid={!categoryIdValid && submitted}
                      custom
                      name="select"
                      id="select"
                      value={categoryId || 0}
                      onChange={(e) => {
                        this.setCategoryInfo(e.target.value);
                      }}
                    >
                      <option value="0" disabled>
                        Please select
                      </option>

                      {categories.map((data) => (
                        <option key={data._id} value={data._id}>
                          {data.title}
                        </option>
                      ))}
                    </CSelect>

                    <CFormText className="help-block">Category List</CFormText>

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <p className="h3 mt-4">Description (short)</p>

                  {submitted && !shortDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={shortDescription}
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(newShortDescription) =>
                      this.setState({ shortDescription: newShortDescription })
                    }
                  />

                  <p className="h3 mt-4">Description (long)</p>

                  {submitted && !longDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={longDescription}
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(newLongDescription) =>
                      this.setState({ longDescription: newLongDescription })
                    }
                  />

                  <p className="h3 mt-4">Description (extra)</p>

                  {submitted && !extraDescription && (
                    <span className="validation-error mt-2">
                      This field is required
                    </span>
                  )}

                  <Editor
                    apiKey="igjcxaoj960y7yd2v5ibvdyvi4tu4mbgvuw4ijddgddk32oz"
                    value={extraDescription}
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(newExtraDescription) =>
                      this.setState({ extraDescription: newExtraDescription })
                    }
                  />

                  <CFormGroup className="mt-4">
                    <CLabel htmlFor="smallImage">Image (small)</CLabel>

                    <CInputFile
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleSmallImageChange(e)}
                    />

                    <CFormText className="help-block">Small image</CFormText>

                    {!smallImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={
                                smallImageExists
                                  ? commonApi.api + smallImage
                                  : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {smallImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={smallImagePreviewUrl}
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="bigImage">New Image (large)</CLabel>

                    <CInputFile
                      className="fileInput"
                      type="file"
                      onChange={(e) => this.handleBigImageChange(e)}
                    />

                    <CFormText className="help-block">Large image</CFormText>

                    {!bigImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img
                              src={
                                bigImageExists
                                  ? commonApi.api + bigImage
                                  : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {bigImagePreviewUrl && (
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="imgPreview">
                            <img src={bigImagePreviewUrl} alt="slider img..." />
                          </div>
                        </div>
                      </div>
                    )}
                  </CFormGroup>

                  <CFormGroup row>
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      checked={featureAdded}
                      onChange={() => {
                        this.setState({
                          featureAdded: !this.state.featureAdded,
                        });
                      }}
                    />

                    <CLabel htmlFor="select">Want to add features?</CLabel>
                  </CFormGroup>

                  {featureAdded && (
                    <>
                      {featureFields.map((field, index) => {
                        const featureIconValid = field.featureIcon
                          ? true
                          : false;
                        const featureTitleValid = field.featureTitle
                          ? true
                          : false;
                        const featureDescriptionValid = field.featureDescription
                          ? true
                          : false;

                        return (
                          <div key={index} className="mb-5">
                            <p className="h3">Feature No {index + 1}</p>

                            <CButton
                              className="mb-2"
                              variant="outline"
                              color="danger"
                              onClick={() => {
                                const newFields = [...this.state.featureFields];
                                newFields.splice(index, 1);
                                this.setState({
                                  numberOfFeatures:
                                    this.state.numberOfFeatures - 1,
                                  featureFields: newFields,
                                });
                              }}
                            >
                              Delete this feature
                            </CButton>

                            <CFormGroup>
                              <CLabel htmlFor="featureIcon">
                                Icon Class Name
                              </CLabel>

                              <CInput
                                valid={featureIconValid && submitted}
                                invalid={!featureIconValid && submitted}
                                id="featureIcon"
                                type="featureIcon"
                                name="featureIcon"
                                placeholder="Enter class name of the icon.."
                                value={field.featureIcon}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureIcon: e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              <CFormText className="help-block">
                                Please enter fa icon class name
                              </CFormText>

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="featureTitle">Title</CLabel>

                              <CInput
                                valid={featureTitleValid && submitted}
                                invalid={!featureTitleValid && submitted}
                                id="featureTitle"
                                type="featureTitle"
                                name="featureTitle"
                                placeholder="Enter title of the feature.."
                                value={field.featureTitle}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureTitle: e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="featureDescription">
                                Description
                              </CLabel>

                              <CTextarea
                                valid={featureDescriptionValid && submitted}
                                invalid={!featureDescriptionValid && submitted}
                                id="featureDescription"
                                rows="5"
                                type="textarea"
                                name="featureDescription"
                                placeholder="Enter Description of the feature.."
                                value={field.featureDescription}
                                onChange={(e) =>
                                  this.setState((prevState) => ({
                                    featureFields: prevState.featureFields.map(
                                      (obj, prevIndex) =>
                                        index === prevIndex
                                          ? Object.assign(obj, {
                                              featureDescription:
                                                e.target.value,
                                            })
                                          : obj
                                    ),
                                  }))
                                }
                              />

                              <CInvalidFeedback>
                                This field is required
                              </CInvalidFeedback>
                            </CFormGroup>
                          </div>
                        );
                      })}

                      <CRow className="align-items-center">
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={() => {
                            this.setState({
                              numberOfFeatures: this.state.numberOfFeatures + 1,
                              featureFields: [
                                ...this.state.featureFields,
                                {
                                  featureIcon: "",
                                  featureTitle: "",
                                  featureDescription: "",
                                },
                              ],
                            });
                          }}
                        >
                          Add New Feature
                        </CButton>
                      </CRow>
                    </>
                  )}
                </CCardBody>

                <CCardFooter>
                  <div className="row justify-content-center mb-3">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Submit Data
                      </button>
                    )}
                  </div>
                </CCardFooter>
              </CCard>
            </CForm>
          </CCol>
        </CRow>

        {toast}
      </>
    );
  }

  render() {
    const { apiLoadedCount, totalApiCount } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      this.showData()
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(ServiceSubcategoryEdit);
