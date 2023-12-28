import { useState, useRef, useEffect } from "react"

// eslint-disable-next-line react/prop-types
const Slide = ( {slides}) => {
    const [currentValue, setCurrentValue] = useState(0)
    const btnRestart = useRef()
    const btnPrev = useRef()

    // eslint-disable-next-line react/prop-types
    const slidesLength = slides.length

    useEffect(() => {
      btnRestart.current.disabled = true
      btnPrev.current.disabled = true
    }, [])
    

  return (
    <div>
      <nav className='m-5 flex gap-2 justify-center p-5' id="navigation">
        <button className="btn btn-outline btn-success" data-testid="button-restart" ref={btnRestart} onClick={() => setCurrentValue(0)} disabled={currentValue === 0}>Restart</button>
        <button className="btn btn-success text-white bg-green-600" data-testid="button-prev" ref={btnPrev} onClick={() => setCurrentValue(currentValue - 1 )} disabled={currentValue === 0}>Prev</button>
        <button className="btn btn-success text-white bg-green-600" data-testid="button-next" onClick={() => setCurrentValue(currentValue + 1 )} disabled={currentValue === slidesLength -1}>Next</button>
    </nav>
    <main className='flex justify-center'>
      <div className="card w-3/5 bg-base-100 shadow-xl" id="slide">
        <div className="card-body justify-center items-center">
          <h2 className="card-title" data-testid="title">{ slides[currentValue].title}</h2>
          <p data-testid="text">{ slides[currentValue].text}</p>
        </div>
      </div>
    </main>
    </div>
  )
}

export default Slide
