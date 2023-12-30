import React from 'react'
import SearchAndList from '../SearchAndList/SearchAndList'

const DefaultPage = (props) => {
  return (
    <div className={"fkdjkfjkdlsasa"} style={{ display: "flex" }}>
      <SearchAndList is_default_page={true} />
      <DefaultWebpage />
    </div>
  )
}

const DefaultWebpage= (props)=> {
  return (
    <div className={"jskdjskfjkldjasadsa"} style={{flex: "1 1 0"}}>

    </div>
  )
}

export default DefaultPage