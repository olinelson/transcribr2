import styled from 'styled-components'

import {
  Form as _Form,
  Icon as _Icon,
  Input as _Input,
  Button as _Button,
  Checkbox as _Checkbox,
  Card as _Card,
  Breadcrumb as _Breadcrumb,
  Menu as _Menu,
  Avatar as _Avatar,
  Divider as _Divider,
  Upload as _Upload
} from 'antd'

export const Form = styled(_Form)``
export const Icon = styled(_Icon)``
export const Input = styled(_Input)``
export const Button = styled(_Button)``
export const Checkbox = styled(_Checkbox)``
export const Card = styled(_Card)``

export const Layout = styled.div`
  display: grid;
  overflow-x: hidden;
  min-height: 100vh;
  // overflow: hidden;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 46px 1fr auto;
  grid-gap: 1rem;
  max-width: 120rem;
  margin: auto;

  grid-template-areas:
    ". . ."
    "sidebar main  .";
  @media (max-width: 800px) {
    grid-template-columns: auto 1fr;
    grid-gap: 0;
    grid-template-areas:
      ". . ."
      "sidebar main  main"
      
      ;
  }

  @media (max-width: 600px) {
     grid-template-areas:
      
      "sidebar main  main"
      ". . ."
      ;
    grid-template-rows:  1fr 46px;
  }

  @supports (padding: max(0px)) {
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
`
export const Header = styled.div``
export const Footer = styled.div``
export const Content = styled.div``
export const Breadcrumb = styled(_Breadcrumb)``
export const Menu = styled(_Menu)`
  position: sticky;
  top: 0;
`
export const Avatar = styled(_Avatar)``
export const Divider = styled(_Divider)``
export const Upload = styled(_Upload)``

export const ProfileContainer = styled.div``
export const ClipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  grid-template-rows: auto auto 1fr auto;
  margin: 0 1rem;
  height: 100%;
  max-height: 100%;
  grid-template-areas:
    "clip"
    "toolbar"
    "words"
    "pagination";

  @media (max-width: 600px) {
    grid-template-rows: auto auto auto 1fr;
    grid-template-areas:
      "clip"
      "toolbar"
      "pagination"
      "words";
  }
`

export const WordsContainer = styled.div`
  height: 100%;
  overflow: scroll;
`
export const FixedMenuDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  border-top: ${props => props.offline ? '4px solid orange' : 'none'};
  @media (max-width: 600px) {
     position: fixed;
    top: auto;
    bottom: 0;
    left:0;
    bottom: right;

     @supports (padding: max(0px)) {
     background: #001529;
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }


  }
  

  }
`

export const StyledSideBar = styled.div`
  max-width: 30vw;
  height: 100%;
  @media (max-width: 600px) {
    display: none ;
  }
`

export const DynamicMenu = styled(_Menu)`
    display: flex;
    li i {
      margin: 1rem auto !important;
      font-size: 1.5rem !important;
    }
    justify-content: space-between;

    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: auto auto auto auto 1fr ;
      justify-content: center;
      justify-items: center;
      ::before {
        display: none;
      }
      li i {
        margin: auto !important;
        font-size: 1rem !important;
      }
    }
  `
