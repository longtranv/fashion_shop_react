import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Annoucement = () => {
  return (
    <Container>
        Super Deal! free shopping on orders over 199$
    </Container>
  )
}

export default Annoucement