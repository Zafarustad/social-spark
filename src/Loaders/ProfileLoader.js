import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
  <ContentLoader 
    speed={3}
    width={350}
    height={475}
    viewBox="0 0 350 475"
    backgroundColor='#CCCCCC'
    foregroundColor='#FCCE07'
  >
    <rect x="65" y="312" rx="2" ry="2" width="232" height="17" /> 
    <rect x="11" y="79" rx="2" ry="2" width="400" height="212" /> 
    <rect x="65" y="337" rx="2" ry="2" width="232" height="17" /> 
    <rect x="66" y="364" rx="2" ry="2" width="232" height="17" /> 
    <rect x="65" y="389" rx="2" ry="2" width="232" height="17" />
  </ContentLoader>
)

export default MyLoader;
