import styled from 'styled-components'

import { Form as _Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'

import {
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
export const Input = styled(_Input)``
export const Button = styled(_Button)``
export const Checkbox = styled(_Checkbox)``
export const Card = styled(_Card)``

export const Layout = styled.div`
  display: grid;
  overflow-x: hidden;
  // height: 100vh;
  // overflow: hidden;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 43px 1fr auto;
  grid-gap: 1rem;
  max-width: 120rem;

  grid-template-areas:
    ". . ."
    "sidebar main  ."
    ;

  @media (max-width: 800px) {
    grid-template-columns: auto 1fr 1fr;
    grid-gap: 1rem;
    
    grid-template-areas:
      ". . ."
      "sidebar main  main"
      ;
    padding:0 1rem;
    padding-bottom: 5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr ;
    grid-template-rows: auto auto ;
    padding: 0;
    padding-bottom: 5rem;
    grid-template-areas:
      "main"
      "sidebar"
      ;
  }
    
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
  margin: 0;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;
  // overflow-y: scroll;
  // max-height: 90vh;
  grid-template-areas:
    "clip"
    "toolbar"
    "words"
    "pagination";

  @media (max-width: 600px) {
    grid-template-rows: auto auto auto 1fr;
    grid-template-columns: 100vw;
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
  }
  @supports (padding: max(0px)) {
    background: #001529;
    padding-bottom: max(env(safe-area-inset-bottom));
    padding-left: max(env(safe-area-inset-left));
    padding-right: max(env(safe-area-inset-right));
    padding-top: max(env(safe-area-inset-top));
  }
  

  }
`

export const StyledSideBar = styled.div`
  width: 30vw;
  max-height: 90vh;
  overflow-y: scroll;
  max-width: 20rem;
  height: 100%;
  grid-area: sidebar;
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
