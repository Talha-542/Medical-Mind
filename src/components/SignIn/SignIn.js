import React, { useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate('/dashboard'); // Navigate to dashboard on successful sign-in
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h1 className='card-title text-center mb-5 fw-bold fs-2'>Sign In</h1>
                {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="floatingInput" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                      required 
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="floatingPassword" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                      required 
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <button className='btn btn-primary btn-login text-uppercase fw-bold' type="submit">
                      Sign In
                    </button>
                    <br></br>
                    <p className='notHaveAccount'>
                      Not Have Account? <Link to='/sign-up' className='signUp'>Sign Up</Link>
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