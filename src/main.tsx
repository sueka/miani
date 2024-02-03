import { render } from 'react'

import App from './App'
import exit from './lib/exit'

render(<App />, document.getElementById('app') ?? exit())
