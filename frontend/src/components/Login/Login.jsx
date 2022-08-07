import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-Slice';

export default function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const dataChangeHandler = async (event) => {
        if (event.target.id === 'userId') {
            setUserId(event.target.value);
        }
        else if (event.target.id === 'password') {
            setPassword(event.target.value);
        }
        else if (event.target.id === 'loginBtn') {
            const user = await UserService.getUsers();
            // console.log(user.data);
            const existinguser = user.data.find((item)=>item.userName===userId);
            console.log(existinguser);
            if(existinguser){
                if(existinguser.userPW===password){
                    localStorage.setItem("inputValue",existinguser.id);
                    dispatch(userActions.setUser(existinguser));
                    dispatch(userActions.setLogin());
                    
                    localStorage.setItem('loginState', existinguser.id);

                    if(existinguser.userType==="Admin"){
                        navigate("/users");
                    }else if(existinguser.userType==="Host"){
                        navigate('/campaigns');
                    }else{
                        navigate("/Voterpage");
                    }
                }else{
                    alert("Incorrect Username or Password")
                }
            }else{
                alert("Incorrect Username or Password")
            }
        }
    }
    return (
        <div className='w-100 pt-10 flex justify-center align-middle'>
            <div className='w-1/2 h-fit p-10 bg-slate-500 text-left rounded-md'>
                <form className='container'>
                    <div className="mb-3">
                        <label for="userId" className="form-label font-semibold">User Id</label>
                        <input onChange={dataChangeHandler} type="text" className="form-control" id="userId" value={userId} />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label font-semibold">Password</label>
                        <input onChange={dataChangeHandler} type="password" className="form-control" id="password" value={password} />
                    </div>
                    <button type='button' onClick={dataChangeHandler} id='loginBtn' className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
