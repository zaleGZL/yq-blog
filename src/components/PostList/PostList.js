import React from 'react'
import * as Styled from './styled'
import axios from 'axios'
import INFO from '../../constants'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], status: 'pending' }
  }

  componentDidMount() {
    axios
      .get('/blog/api/bloglist')
      .then(response => {
        this.setState({ data: response.data.data, status: 'success' })
      })
      .catch(() => {
        this.setState({ status: 'fail' })
      })
  }

  render() {
    const { data, status } = this.state

    if (status !== 'success') {
      return (
        <Styled.HintMessage>
          {status === 'pending' ? '加载中...' : '加载失败'}
        </Styled.HintMessage>
      )
    }

    return (
      <Styled.PostListContainer>
        <Styled.PostList>
          {data.map((item, index) => {
            if (item.slug === '#') {
              return (
                <Styled.PostDirectory key={index} depth={item.depth}>
                  {item.title}
                </Styled.PostDirectory>
              )
            } else {
              return (
                <Styled.PostLink key={index} depth={item.depth}>
                  <a
                    target="_blank"
                    href={`https://yuque.com/${INFO.YUQUE_USER_NAME}/${
                      INFO.YUQUE_KNOWLEDGE_LIB
                    }/${item.slug}`}
                  >
                    {item.title}
                  </a>
                </Styled.PostLink>
              )
            }
          })}
        </Styled.PostList>
      </Styled.PostListContainer>
    )
  }
}

export default PostList
