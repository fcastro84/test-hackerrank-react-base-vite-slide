import './App.css'
import Slide from './components/Slide'
import { SLIDES as slides} from './mocks/slides'

function App() {

  return (
    <>
    <header className='navbar-center bg-neutral text-neutral-content p-2'>
      <h1 className='text-center text-xl text-white'>Slideshow App</h1>
    </header>
    <Slide slides={slides} />
      
    </>
  )
}

export default App
