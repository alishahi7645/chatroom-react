import React from 'react';
import './login-style.css';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
const Login = () => {
    const[name , setname] = useState('');
    const[gender , setgender] = useState('');
    const[error,seterror] =useState('');
    const Navigate = useNavigate();
    
    const validate=(props)=>{
        
        if(name == ''){
            seterror('لطفا نام خود را برای چت کردن وارد نمایید')
            return false;
        }
        else if(name.length <3){
            seterror('لطفا نام خودرا به درستی وارد نمایید')
        }
        else if(gender == ''){
            seterror('لطفا آقا/خانم بودن خودرا مشخص کنید');
            return null;
        }else{
            Navigate('/chatroom',{state:{name:name,gender:gender}});
        }
    }

    const submit =()=>{
        console.log(name,gender);
        validate();
    }

    return (
        <div className='section-body'>
            <h1>آذر چت</h1>
            <div className='login-page'>
                <p className='error'>{error}</p>
                <div className='lable-login'>
                    <div className='label-name'>
                        <input type='text' placeholder='نام خودرا وارد نمایید' value={name} onChange={(e)=>setname(e.target.value)}/>
                        <label className='name'>:نام شما</label>
                    </div>
                    <div className='label-gender'>
                        <select name="cars" id="cars" value={gender} onChange={(e)=>setgender(e.target.value)}>
                            <option value="empti">none</option>
                            <option value="male">مرد</option>
                            <option value="famale">زن</option>
                        </select>
                        <p className='gender'>:جنسیت</p>               
                    </div>
                    <button className='button-login' onClick={submit}>
                        ورود به چت روم
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Login;
