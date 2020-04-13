import React from "react";
import ContentLoader from "react-content-loader";
import { isMobile } from "react-device-detect";

const MyLoader = () => (
  <ContentLoader
    speed={3}
    width={isMobile ? "auto" : 350}
    height={100}
    viewBox='0 0 350 100'
    backgroundColor='#CCCCCC'
    foregroundColor='#FCCE07'
  >
    <rect x='66' y='12' rx='0' ry='0' width='340' height='7' />
    <circle cx='38' cy='25' r='18' />
    <rect x='67' y='32' rx='0' ry='0' width='323' height='7' />
    <rect x='66' y='52' rx='0' ry='0' width='299' height='7' />
  </ContentLoader>
);

export default MyLoader;
