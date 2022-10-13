import styled from 'styled-components';

const Indicator = styled.div`
  & > * {
    color: ${props => props.state ? "MediumSeaGreen" : "IndianRed"}
  }
`
export default Indicator