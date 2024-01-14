import React from 'react'
import {FadeLoader} from 'react-spinners'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <FadeLoader color="#36d7b7" size={100}/>
  )
}

export default Spinner