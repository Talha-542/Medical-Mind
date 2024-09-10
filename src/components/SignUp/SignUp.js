
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import './SignUp.css';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password, {
        firstName,
        lastName,
        education,
        designation,
        email
      });
      console.log('User created successfully:', userCredential.user);
      navigate('/sign-in');
    } catch (err) {
      setError(err.message);
      console.error('Error signing up:', err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h1 className='card-title text-center mb-5 fw-bold fs-2'>Sign Up</h1>
                {error && <p className="text-danger">{error}</p>} {/* Display any error */}
                <form onSubmit={handleSubmit}>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label htmlFor="firstName">First Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                    <label htmlFor="education">Education</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                    <label htmlFor="designation">Designation</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className='btn btn-primary btn-login text-uppercase fw-bold'>Sign Up</button>
                    <br />
                    <p className='alreadyHaveAccount'>
                      Already Have Account? <Link to='/sign-in' className='signUp'>Sign In</Link>
                    </p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}