import ReactDOM from 'react-dom'
import Main from './components/Main'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(Main({ title: 'ecma-react-heroes' }),
  document.getElementById('root'))
registerServiceWorker()
