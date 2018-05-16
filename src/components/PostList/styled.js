import Styled from 'styled-components'
import PropTypes from 'prop-types'

export const PostListContainer = Styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 0 40px 20px 40px;
`

export const PostList = Styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const HintMessage = Styled.div`
    text-align: center;
    margin: 100px 0 100px 0;
    color: #6d6d6f;
    font-size: 14px;
`

export const PostDirectory = Styled.li`
    margin-left: ${props => (props.depth - 1) * 12 + 'px'};
    text-indent: -.7em;
    padding: 12px 0;
    padding-left: 1em;
    color: #7b7575;
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::before {
        content: "• ";
        color: #676565;
    }
`

export const PostLink = Styled.li`
    margin-left: ${props => (props.depth - 1) * 12 + 'px'};
    padding: 12px 0;
    word-break: break-all;

    & > a {
        color: #555;
        font-size: 14px;
        text-decoration:none;

        &:hover, &:focus {
            text-decoration: underline;
            outline: none;
        }
    }
`

PostDirectory.propTypes = {
  depth: PropTypes.number.isRequired
}
