import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import './SignUp.css';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('patient'); 
  const [profession, setProfession] = useState('')
  const [medical, setMedical] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password, {
        firstName,
        lastName,
        education,
        profession,
        role,
        email, 
        medical
      });
      console.log('User created successfully:', userCredential.user);
      if (role === 'patient') {
        navigate('/dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if(role==='admin'){
        navigate('/admin-dashboard')

      }
       else {
        navigate('/sign-in'); 
      }
    } catch (err) {
      setError(err.message);
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
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
                {error && <p className="text-danger">{error}</p>}
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

                  {/* <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <label htmlFor="role">Role</label>
                  </div> */}

                  <div className="form-floating mb-3">
                    <input
                      type="profession"
                      className="form-control"
                      id="profession"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Profession</label>
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

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                    <p className='alreadyHaveAccount mt-2'>
                      Already Have Account? <Link to='/sign-in' className='signUp'>Sign In</Link>
                    </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
