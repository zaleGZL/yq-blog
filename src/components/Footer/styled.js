import Styled from 'styled-components'

export const Footer = Styled.div`
    margin-top: 100px;
`

export const SocialList = Styled.div`
    text-align: center;
`

export const IconLink = Styled.a`
    color: #cdd4da;
    font-size: 32px;
    text-decoration: none;
    margin-right: 4.8px;

    &:hover, &:focus {
        color: #a1a5a6;
    }
`

export const WebsiteDescription = Styled.p`
    color: #bbb;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.5;
    text-align: center;
    margin-top: 15px;
`

export const Link = Styled.a`
    color: #999;
    text-decoration: none;
    
    &:hover, &:focus {
        text-decoration: underline;
    }
`