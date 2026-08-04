import React, { useRef } from 'react'
import { assets } from '../Assets/assets'
import { useAppContext } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {


  const {setInput, input} = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = ()=> {
    setInput('')
    inputRef.current.value = '';
  }

  return (


    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

      <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
        <p>New: AI Feature Integrated</p>
        <img src={assets.star_icon} alt="" className='w-2.5' />
      </div>

      <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 dark:text-gray-200' >Your Own <span className='text-primary'>Blogging</span> <br/> Platform</h1>

      <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500 dark:text-gray-200'>Your Personalized space to think outload, and give what matters</p>

      <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden dark:bg-gray-900'>
      <input ref={inputRef} type="text" className='w-full pl-4 outline-none dark:text-gray-100' placeholder='Search for Blogs' required/>
        <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
      </form>

      </div>
      <div className='text-center'>
        {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>
          Clear Search
        </button>
        } 
      </div>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
    </div>
  )
}

export default Header
