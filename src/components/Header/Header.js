import React from 'react'
import * as Styled from './styled'
import INFO from '../../constants'

const Header = () => (
  <Styled.Header>
    <Styled.HeaderTitle>{INFO.TITLE}</Styled.HeaderTitle>
    <Styled.HeaderSubTitle>{INFO.SUB_TITLE}</Styled.HeaderSubTitle>
  </Styled.Header>
)

export default Header
