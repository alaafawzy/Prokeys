import React, {useEffect} from 'react'

import { useParams ,useNavigate} from 'react-router-dom';
import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
export default function ConfirmPassword(){
    const {uid} = useParams()
    const {token}=useParams()
    const navigate = useNavigate()
    // console.log("yarb")
    // const URL = '/api/resetPassword/'+uid+'/'+token
    // axios.get(URL,{
    //     withCredentials: true
    // }).
    //     then(res=>{
    //         if (res.status===200){
    //             navigate('/reset/'+uid)
    //         }
    //         else {navigate('/')}
    //     }).catch(err=>{
    //         navigate('/')
    //             console.log(err)
    //         })
useEffect(()=>{
    console.log("yarb")
    const URL = '/api/resetPassword/'+uid+'/'+token
    axios.get(URL,{
        withCredentials: true
    }).
        then(res=>{
            if (res.status===200){
                navigate('/reset/'+uid)
            }
            else {navigate('/')}
        }).catch(err=>{
            navigate('/')
                console.log(err)
            })},[])
  return <></>

}