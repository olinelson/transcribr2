import styled from "styled-components"

import {
  Form as _Form,
  Icon as _Icon,
  Input as _Input,
  Button as _Button,
  Checkbox as _Checkbox,
  Card as _Card,
  // Layout as _Layout,
  Breadcrumb as _Breadcrumb,
  Menu as _Menu,
  Avatar as _Avatar,
  Divider as _Divider,
  Upload as _Upload,
} from "antd"

// import { Form, Icon, Input, Button, Checkbox } from "antd"
export const Form = styled(_Form)``
export const Icon = styled(_Icon)``
export const Input = styled(_Input)``
export const Button = styled(_Button)``
export const Checkbox = styled(_Checkbox)``
export const Card = styled(_Card)``

export const Layout = styled.div`
  background: #f0f2f5;
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    "content"
    "footer";
`
export const Header = styled.div`
  width: 100%;
  position: fixed;
`
export const Footer = styled.div``
export const Content = styled.div`
  display: grid;

  background: white;
`
export const Breadcrumb = styled(_Breadcrumb)``
export const Menu = styled(_Menu)``
export const Avatar = styled(_Avatar)``
export const Divider = styled(_Divider)``
export const Upload = styled(_Upload)``

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  height: 100vh;
  grid-template-areas: "sidebar main .";
  @media (max-width: 700px) {
    grid-template-columns: auto 1fr 0.5rem;
  }
`
export const ClipContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  height: 100vh;
  align-items: center;
  grid-template-columns: 1fr;

  grid-template-rows: ${props =>
    props.isVideo ? "2rem 30vh auto 1fr  auto" : "2rem  4rem auto  1fr  auto"};
  grid-template-areas:
    "."
    "clip"
    "toolbar"
    "words"
    "pagination";
`

export const WordsParagraph = styled.p`
  overflow-y: scroll;
  height: 100%;
`
export const WordsContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
`
