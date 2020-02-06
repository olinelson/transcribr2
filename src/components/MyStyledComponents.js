import styled from "styled-components"

import {
  Form as _Form,
  Icon as _Icon,
  Input as _Input,
  Button as _Button,
  Checkbox as _Checkbox,
  Card as _Card,
  Layout as _Layout,
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
export const Layout = styled(_Layout)`
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  overflow: hidden;
`
export const Header = styled(_Layout.Header)`
  position: fixed;
  width: 100%;
  z-index: 5;
  height: 4rem;
`
export const Footer = styled(_Layout.Footer)``
export const Content = styled(_Layout.Content)``
export const Breadcrumb = styled(_Breadcrumb)``
export const Menu = styled(_Menu)``
export const Avatar = styled(_Avatar)``
export const Divider = styled(_Divider)``
export const Upload = styled(_Upload)``

export const ProfileContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 100vh;
  grid-gap: 1rem;
`
export const ClipContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  grid-template-rows: ${props =>
    props.isVideo ? "4rem 30vh auto 1fr 4rem" : "4rem 4rem auto 1fr 4rem"};
`

export const WordsParagraph = styled.p`
  overflow-y: scroll;
`
