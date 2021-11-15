import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CToastBody,
  CCardHeader,
  CCol,
  CForm,
  CToastHeader,
  CToast,
  CToaster,
  CRow,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CTextarea,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import FullPageLoader from "../../../hooks/Loader";

import { loaderUrl } from "src/constants";

import { sAdminFaqApi } from "src/api";

import "./FaqEdit.css";

class FaqEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      question: "",
      answer: "",
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

    sAdminFaqApi.sAdminGetFaqDetails(id, formattedToken).then((response) => {
      this.setState({
        _id: response.data._id,
        question: response.data.question,
        answer: response.data.answer,
        apiLoadedCount: this.state.apiLoadedCount + 1,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { _id, question, answer } = this.state;

    const { formattedToken } = this.props;

    const data = { question, answer };

    sAdminFaqApi
      .sAdminUpdateFaqDetails(_id, data, formattedToken)
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
    const { question, answer, submitting, submitted, errorStatus, toast } =
      this.state;

    const questionValid = question ? true : false;
    const answerValid = answer ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Edit Faq</CCardHeader>

              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error">Updating Faq Failed</span>
                )}

                <CForm onSubmit={this.handleSubmit.bind(this)}>
                  <CFormGroup>
                    <CLabel htmlFor="question">Question</CLabel>

                    <CTextarea
                      valid={questionValid && submitted}
                      invalid={!questionValid && submitted}
                      id="question"
                      rows="5"
                      type="textarea"
                      name="question"
                      placeholder="Enter New Question.."
                      value={question}
                      onChange={(e) =>
                        this.setState({ question: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="answer">Answer</CLabel>

                    <CTextarea
                      valid={answerValid && submitted}
                      invalid={!answerValid && submitted}
                      id="answer"
                      rows="5"
                      type="textarea"
                      name="answer"
                      placeholder="Enter New Answer.."
                      value={answer}
                      onChange={(e) =>
                        this.setState({ answer: e.target.value })
                      }
                    />

                    {/* <CValidFeedback>Cool! Input is valid</CValidFeedback> */}

                    <CInvalidFeedback>This field is required</CInvalidFeedback>
                  </CFormGroup>

                  <div className="row justify-content-center mt-3">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <CButton type="submit" color="primary">
                        Submit
                      </CButton>
                    )}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {toast}
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount } = this.state;

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

export default connect(mapStateToProps)(FaqEdit);
