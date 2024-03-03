import React,{useContext,useEffect} from 'react'
import Notes from './Notes';

export const Home = (props) => {
  // useEffect(() => {
  // }, [])
  const {displayAlert} = props;
  return (
    <>
      <div className="container" style={{marginTop:"3rem"}}>
        <Notes displayAlert={displayAlert} />
      </div>
    </>
  )
}
