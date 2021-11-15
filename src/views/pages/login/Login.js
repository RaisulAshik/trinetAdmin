import React, { Component } from "react";
// import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import { formValidation, history, uniqueId } from "src/helperFunctions";
import { sAdminLogin, sAdminLogout } from "src/sAdminActions";
import { loaderUrl } from "src/constants";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.sAdminLogout();

    this.state = {
      email: "",
      password: "",
      submitted: false,
      emailError: "",
      passwordError: "",
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const data = formValidation.checkType(this.state, name, value);
    this.setState(data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });

    const { email, password } = this.state;
    const { sAdminLogin } = this.props;

    if (email && password) {
      sAdminLogin(email, password);
      history.push("/");
    }
  };

  render() {
    const { loggingIn, error } = this.props;

    const { email, password, submitted, emailError, passwordError } =
      this.state;

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm
                      onSubmit={this.handleSubmit}
                      autoComplete="on"
                      name="form"
                    >
                      <h1>Login</h1>

                      <p className="text-muted">Sign In to your account</p>

                      {error && error === 400 && (
                        <span className="validation-error text-center">
                          Email or Password does not match
                        </span>
                      )}

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>

                        <CInput
                          type="text"
                          id="email"
                          name="email"
                          required="required"
                          placeholder="Enter your email..."
                          value={email}
                          onChange={this.handleChange.bind(this)}
                        />
                      </CInputGroup>

                      {submitted &&
                        emailError.map((message) => {
                          return (
                            <span
                              key={uniqueId.id()}
                              className="validation-error"
                            >
                              {message}
                            </span>
                          );
                        })}

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>

                        <CInput
                          type="password"
                          id="password"
                          name="password"
                          required="required"
                          placeholder="Enter your password..."
                          value={password}
                          onChange={this.handleChange.bind(this)}
                        />
                      </CInputGroup>

                      {submitted &&
                        passwordError.map((message) => {
                          return (
                            <span
                              key={uniqueId.id()}
                              className="validation-error"
                            >
                              {message}
                            </span>
                          );
                        })}

                      <CRow>
                        <CCol xs="6">
                          {loggingIn ? (
                            <img src={loaderUrl} alt="Please Wait..." />
                          ) : (
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                            >
                              Login
                            </CButton>
                          )}
                        </CCol>

                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0" disabled>
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>

                {/* <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>

                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                          disabled
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn, error, loggedIn } = state;
  // console.log("check store", state);

  return {
    loggingIn,
    error,
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminLogin: (email, password) => dispatch(sAdminLogin(email, password)),
    sAdminLogout: () => dispatch(sAdminLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
