import { Add, Remove } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Annoucement from "../components/annoucement"
import Footer from "../components/Footer"
import NavBar from "../components/navBar"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {removeProduct, resetCart} from '../redux/cartRedux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react"
import { userRequest } from "../requestMethod"

const KEY = "pk_test_51MBZn5Gdk95zAhZQBQ6B1J5MauVczf3wXO0Uob34vj3q5njV23kXe8rJ7wtJzXzfoLFSVU0o3OQDFHvOPkVfaz9g00GkGq6N3H";
const Container = styled.div`
`
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props)=>props.type==="filled"&& "none"};
    background-color: ${(props)=>props.type==="filled"?"black":"transparent"};
    color: ${(props)=>props.type==="filled"&& "white"};
`

const TopTexts = styled.div`

`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;


const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state)=>state.cart);
  const user = useSelector((state)=> state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token)=>{
    setStripeToken(token);
  }

  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        const res = await userRequest.post("/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        }, {
          headers: {'Authorization': `Bearer ${user.tokens.access.token}`}
        });
        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          }
        })
      } catch (error) {
        
      }
    }
    stripeToken && makeRequest();
  },[stripeToken, cart.total, navigate]);

  return (
    <Container>
        <NavBar/>
        <Annoucement/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag (2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
            <Info>
            {cart.products.map((product)=>(
            <Product>
              <ProductDetail>
                <Image src= {product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add/>
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove/>
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
              <DeleteForeverIcon onClick={()=>{
                  dispatch(removeProduct(product._id)); 
                }} sx={{cursor: "pointer"}}/>
            </Product>))}
            <RemoveShoppingCartIcon fontSize="large" color="primary" sx={{cursor: "pointer", justifyContent: "flex-end"}} onClick={()=>{dispatch(resetCart())}}></RemoveShoppingCartIcon>
            <Hr/>
            </Info>
            <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="UIT"
              image="https://avatars.githubusercontent.com/u/79398196?s=40&v=4"
              billingAddress
              shippingAddress
              description={`your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}>
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
          </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart