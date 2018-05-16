import React from 'react'
import * as Styled from './styled'
import INFO from '../../constants'

const Footer = () => (
  <Styled.Footer>
    <Styled.SocialList>
      <Styled.IconLink href={INFO.GITHUB} target="_blank">
        <i className="fa fa-github" aria-hidden="true" />
      </Styled.IconLink>
    </Styled.SocialList>
    <Styled.WebsiteDescription>
      © {new Date().getFullYear()} Powered by&nbsp;&nbsp;
      <Styled.Link href={'https://github.com/zaleGZL/yq-blog'} target="_blank">
        yq-blog
      </Styled.Link>
    </Styled.WebsiteDescription>
  </Styled.Footer>
)

export default Footer
