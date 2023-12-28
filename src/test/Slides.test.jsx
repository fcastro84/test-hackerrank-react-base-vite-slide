
import { test, beforeEach, afterEach, expect } from 'vitest'
import { render, fireEvent, cleanup} from '@testing-library/react'
import Slide from '../components/Slide'

const testIds = {
    restartButton: "button-restart",
    prevButton: "button-prev",
    nextButton: "button-next",
    title: "title",
    text: "text",
  };
  
  const makeSlides = (numSlides) => Array.from({length: numSlides}, (_, idx) => ({ title: `title ${idx}`, text: `text ${idx}` }));
  
  const renderApp = (slides) => render(<Slide slides={slides} />);
  
  
  beforeEach(() => {
  });
  
  afterEach(() => {
    cleanup();
  });
  
  test('App renders correctly', () => {
    const slides = makeSlides(2);
  
    const { getByTestId } = renderApp(slides);
  
    const restartButton = getByTestId(testIds.restartButton);
    //expect(restartButton).toHaveTextContent("Restart");
    expect(restartButton.textContent).toBe("Restart")
    expect(restartButton.hasAttribute('disabled')).toBeTruthy();
  
    const prevButton = getByTestId(testIds.prevButton);
    expect(prevButton.textContent).toBe("Prev");
    expect(prevButton.hasAttribute('disabled')).toBeTruthy();
  
    const nextButton = getByTestId(testIds.nextButton);
    expect(nextButton.textContent).toBe("Next");
    expect(nextButton.hasAttribute('disabled')).toBeFalsy();
  
    const titleElem = getByTestId(testIds.title);
    expect(titleElem.textContent).toBe(slides[0].title);
  
    const textElem = getByTestId(testIds.text);
    expect(textElem.textContent).toBe(slides[0].text);
  });
  
  test('Switching between slides works as expected', () => {
    const slides = makeSlides(5);
  
    const { getByTestId } = renderApp(slides);
  
    const restartButton = getByTestId(testIds.restartButton);
    const prevButton = getByTestId(testIds.prevButton);
    const nextButton = getByTestId(testIds.nextButton);
    const titleElem = getByTestId(testIds.title);
    const textElem = getByTestId(testIds.text);
  
    const clicks = [
      'next', 'next', 'next', 'prev', 'prev', 'prev', 'next', 'next', 'restart', 'next', 'next', 'next', 'next', 'prev',
    ];
  
    let idx = 0;
    for (const click of clicks) {
      if (click === 'restart') {
        fireEvent.click(restartButton);
        idx = 0;
      } else if (click === 'prev') {
        fireEvent.click(prevButton);
        idx -= 1;
      } else if (click === 'next') {
        fireEvent.click(nextButton);
        idx += 1;
      }
      expect(idx >= 0).toEqual(true);
      expect(idx < slides.length).toEqual(true);
  
      if (idx > 0) {
        expect(restartButton.hasAttribute('disabled')).toBeFalsy();
        expect(prevButton.hasAttribute('disabled')).toBeFalsy();
      } else {
        expect(restartButton.hasAttribute('disabled')).toBeTruthy();
        expect(prevButton.hasAttribute('disabled')).toBeTruthy();
      }
  
      if (idx+1 < slides.length) {
        expect(nextButton.hasAttribute('disabled')).toBeFalsy();
      } else {
        expect(nextButton.hasAttribute('disabled')).toBeTruthy();
      }
  
      const { title, text } = slides[idx];
      expect(titleElem.textContent).toBe(title);
      expect(textElem.textContent).toBe(text);
    }
  });


