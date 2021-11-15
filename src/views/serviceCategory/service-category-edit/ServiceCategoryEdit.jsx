import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CCardFooter,
  CInvalidFeedback,
  CCardHeader,
  CCol,
  CForm,
  CToastHeader,
  CFormGroup,
  CFormText,
  CToast,
  CInput,
  CToaster,
  CLabel,
  CRow,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { sAdminServiceCategoryApi } from "src/api";

import { loaderUrl } from "src/constants";

import "./ServiceCategoryEdit.css";

class ServiceCategoryEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      title: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      toast: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    const { id } = this.props.match.params;

    sAdminServiceCategoryApi
      .sAdminGetServiceCategoryDetails(id, formattedToken)
      .then((response) => {
        this.setState({
          title: response.data.title,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { title, _id } = this.state;

    const { formattedToken } = this.props;

    const data = { title };

    sAdminServiceCategoryApi
      .sAdminUpdateServiceCategoryDetails(_id, data, formattedToken)
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

        // history.push("/service-category/service-category-list");
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

  showData() {
    const { submitting, submitted, errorStatus, title, toast } = this.state;

    const titleValid = title ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CForm onSubmit={this.handleSubmit.bind(this)}>
              <CCard>
                <CCardHeader>
                  Service Category
                  <small> Edit</small>
                </CCardHeader>

                <CCardBody>
                  {submitted && errorStatus === 400 && (
                    <span className="validation-error">
                      Updating Category Name Failed
                    </span>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="title">Category Details</CLabel>

                    <CInput
                      valid={titleValid && submitted}
                      invalid={!titleValid && submitted}
                      id="title"
                      type="title"
                      name="title"
                      placeholder="Enter Updated Category Name.."
                      value={title}
                      onChange={(e) => this.setState({ title: e.target.value })}
                    />

                    <CFormText className="help-block">
                      Please enter updated category name
                    </CFormText>

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>
                </CCardBody>

                <CCardFooter>
                  {submitting ? (
                    <img src={loaderUrl} alt="Please Wait..." />
                  ) : (
                    <CButton type="submit" size="sm" color="primary">
                      Submit
                    </CButton>
                  )}
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

export default connect(mapStateToProps)(ServiceCategoryEdit);
