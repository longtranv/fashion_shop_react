import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import {mobile} from '../responesive'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-content: center;
  margin-left: 25px;
  padding: 5px;
`

const Input = styled.input`
  border: none;
  :focus{
    outline: none;
  }
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`
const Avatar = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
`
const NavBar = () => {
  const quantity = useSelector((state)=>state.cart.quantity);
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input/>
            <Search style={{color: "gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center><Link to={"/"}><Logo>UIT.</Logo></Link></Center>
        <Right>
          {user?
            <><Avatar src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' /><Link to={"/cart"}>
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link></>
            : <><MenuItem><Link to={"/register"}>
                  REGISTER
                </Link></MenuItem>
                <MenuItem><Link to={"/login"}>
                  SIGN IN
                </Link></MenuItem></>}
        </Right>
      </Wrapper>
    </Container>
  )
}

export default NavBar