import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

// Modal.setAppElement('*'); 

const customStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function Header() {

const[isLoginModalOpen,setLoginModal]=useState(false)
const[isSignUpModalOpen,setSignUpModal]=useState(false)

const responseFacebook = (response) => {
  console.log(response);
}
// const responseGoogle =(response)=>{
//   console.log(response);
// }





  return (
    <div className="header">
                <div className="s-logo">
                    <span>e!</span>
                </div>
                <div className="btn-group login-block">
                    <form>
                    <span className="login" onClick={()=>setLoginModal(true)}>LogIn</span>
                    </form>
                    <form>
                    <span className="signUp" onClick={()=>setSignUpModal(true)}>Create an account</span>
                    </form>
                </div>

                <Modal 
                   isOpen={isLoginModalOpen}
                  
                   style={customStyles}
                   >
                   
                    <h2>LogIn Modal
                        <button onClick={()=>setLoginModal(false)}className='btn btn-danger float-end'>X</button>
                    </h2><br/>
                    <form>
                      <input placeholder='Enter Your EmailId' type="text"/><br/><br/>
                      <input placeholder='Enter Your Password' type="password"/><br/><br/>
                      <button>LogIn</button>
                    </form><br/>
                    <FacebookLogin
                       appId="1048282035827602"
                       fields="name,email,picture"
                       callback={()=>responseFacebook}
                  
                    />,
                       
                    <GoogleLogin
                        clientId="561155928308-9ja99cjamuf4f1rno9eb4la5a5updc68.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        // callback={()=>responseGoogle}
                    />,
                         
                </Modal>


                <Modal
                isOpen={isSignUpModalOpen}
                style={customStyles}
                >
                 <h2>SignUp Modal
                        <button onClick={()=>setSignUpModal(false)}className='btn btn-danger float-end'>X</button>
                    </h2><br/>
                    <form>
                      <input placeholder='Enter Your EmailId' type="text"/><br/><br/>
                      <input placeholder='Enter Your Password' type="password"/><br/><br/>
                      <button>signUp</button>
                    </form><br/>
                    <FacebookLogin
                       appId="1048282035827602"
                       fields="name,email,picture"
                       callback={()=>responseFacebook}
                  
                    />,
                       
                    <GoogleLogin
                        clientId="561155928308-9ja99cjamuf4f1rno9eb4la5a5updc68.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        // callback={()=>responseGoogle}
                    />,
                </Modal>

        </div>
    )
}
