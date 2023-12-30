import React from 'react'
import SocketContainer from '../../SocketContainer/SocketContainer'

const Container = ({children}) => {
  return (
    <SocketContainer>
        {children}
    </SocketContainer>
  )
}

export default Container