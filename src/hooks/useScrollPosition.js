import { useRef, useLayoutEffect } from "react"

/**
 * Before start using this hook: 
 * Why we use useLayoutEffect instead useEffect 
 * This runs synchronously immediately after React has performed all DOM mutations. 
 * This can be useful if you need to make DOM measurements (like getting the scroll position or other styles for an element),
 *  and then make DOM mutations or trigger a synchronous re-render by updating state.
 */

//Support SSR and prevent unnecesary bugs
const isBrowser = typeof window !== `undefined`

/** Get current scroll position
 * @param {element} element element which is passed as arg or body 
 * @param {Boolean} useWindow chose between window.scroll OR el.getBoundingClientRect()
 * In body of this function variables target & position will be created
 * Target is certain element which is passed to useScrollPosition function or body if arg is empty
 * Position is object which contains properies about element position. We get those datas using getBoundingClientRect() method if useWindow arg is empty
 * position value is object with shape:
 *  { bottom: INT
      height: INT
      left: INT
      right: INT
      top:  INT
      width: INT
      x: INT
      y: INT
    }
  * 
  return object with x and y properties
 */
function getScrollPosition({ element, useWindow }) {
  //Check if runs inside browser
  if (!isBrowser) return { x: 0, y: 0 }

  //Check if request the scroll position of entire page or specific element
  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}


/**
 * 
 * @param {object} effect Effect callback function, usualy use it to setState. Can be used in other purpose  
 * @param {array} deps we will use it to pass array of custom dependencies to our hook, in this case state
 * @param {object} element REF object with property current, if need to track certain element on the page 
 * @param {boolean} useWindow Use window.scroll instead of document.body.getBoundingClientRect() to detect scroll position.
 *            NOT used in this example, but if someone want to use it it's available
 * @param {*} wait The timeout in ms. Good for performance. 
 */
export function useScrollPosition(effect, deps, element, useWindow, wait) {

  // Stateful value that won't trigger re-render on each state change 
  // Set current position in current propery of ref object
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  // function which will be called on the end 
  const callBack = () => {

    //Curr position of body or element -> Returned object from getScrollPosition function
    const currPos = getScrollPosition({ element, useWindow })

    // Callback function 
    effect({ prevPos: position.current, currPos })

    position.current = currPos
    throttleTimeout = null
  }

  /**
   * Runns synchronously immediately after React has performed all DOM mutations.
  **/
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)

}