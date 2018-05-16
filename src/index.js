import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'

const App = () => (
  <div>
    <Header />
    <PostList />
    <Footer />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();