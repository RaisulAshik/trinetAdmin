import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInvalidFeedback,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CTextarea,
  CToast,
  CToastHeader,
  CToaster,
  CToastBody,
} from "@coreui/react";

import { getFormattedToken } from "src/helperFunctions";

import { loaderUrl } from "src/constants";

import { sAdminFaqApi } from "src/api";

import "./FaqAdd.css";

class FaqAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer: "",
      submitting: false,
      submitted: false,
      errorStatus: null,
      toast: null,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true, submitted: true, toast: null });

    const { question, answer } = this.state;

    const { formattedToken } = this.props;

    const data = { question, answer };

    sAdminFaqApi
      .sAdminAddFaq(data, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
          question: "",
          answer: "",
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
                    <CToastBody>Data Added Successfully</CToastBody>
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
                    <CToastBody>Data Adding Failed</CToastBody>
                  </CToast>
                </CToaster>
              </CCol>
            </>
          ),
        });

        console.log(error);
      });
  }

  render() {
    const { question, answer, submitted, errorStatus, submitting } = this.state;

    const questionValid = question ? true : false;
    const answerValid = answer ? true : false;

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                FAQ
                <small> New Add</small>
              </CCardHeader>

              <CCardBody>
                {submitted && errorStatus === 400 && (
                  <span className="validation-error mt-2">
                    Adding New Question Failed
                  </span>
                )}

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <CFormGroup>
                    <CLabel htmlFor="question">New Question</CLabel>

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
                    <CLabel htmlFor="answer">New Answer</CLabel>

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

                  <div className="row justify-content-center">
                    {submitting ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary update-button mt-2"
                      >
                        Submit Data
                      </button>
                    )}
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {this.state.toast}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(FaqAdd);
