import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {login} from '../redux/apiCalls'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ), 
    url("") 
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0 ;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`
const LINK = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;

`
const Error = styled.span`
    color: red ;
`
const Login = () => {

    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const dispatch = useDispatch();
    const {currentUser, isFetching, error} = useSelector((state)=>state.user);
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault()
        login(dispatch, {email, password})
        if(currentUser){
            navigate("/");
        }
    }
    
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder = "username" onChange={(e)=>setEmail(e.target.value)}></Input>
                <Input placeholder = "password" type="password" onChange={(e)=>setPassword(e.target.value)}></Input>
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                {error && <Error>Something went wrong</Error>}
                <LINK>DO NOT REMEMBER YOUR PASSWORD?</LINK>
                <LINK>CREATE NEW ACCOUNT</LINK>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login