import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({ color, width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={width || 800}
    height={height || 800}
    viewBox="0 0 60 60"
    {...props}
  >
    <Path fill={color || "black"} d="M18.35 20.805a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414 2.61 2.61 0 0 1 0-3.684c.87-.87 1.35-2.026 1.35-3.256s-.479-2.386-1.35-3.256a.999.999 0 1 0-1.414 1.414c.492.492.764 1.146.764 1.842s-.271 1.35-.764 1.842a4.61 4.61 0 0 0 0 6.512zM40.35 20.805a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414 2.61 2.61 0 0 1 0-3.684c.87-.87 1.35-2.026 1.35-3.256s-.479-2.386-1.35-3.256a.999.999 0 1 0-1.414 1.414c.492.492.764 1.146.764 1.842s-.271 1.35-.764 1.842a4.61 4.61 0 0 0 0 6.512zM29.35 14.805a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414 2.61 2.61 0 0 1 0-3.684c.87-.87 1.35-2.026 1.35-3.256s-.479-2.386-1.35-3.256a.999.999 0 1 0-1.414 1.414c.492.492.764 1.146.764 1.842s-.271 1.35-.764 1.842a4.61 4.61 0 0 0 0 6.512zM55.624 43.721C53.812 33.08 45.517 24.625 34.957 22.577c.017-.16.043-.321.043-.48 0-2.757-2.243-5-5-5s-5 2.243-5 5c0 .159.025.32.043.48C14.483 24.625 6.188 33.08 4.376 43.721 2.286 44.904 0 46.645 0 48.598c0 5.085 15.512 8.5 30 8.5s30-3.415 30-8.5c0-1.953-2.286-3.694-4.376-4.877zM27.006 22.27A3.004 3.004 0 0 1 30 19.098a3.004 3.004 0 0 1 2.994 3.172c-.047-.005-.094-.007-.14-.012a25.32 25.32 0 0 0-1.038-.089c-.128-.009-.255-.022-.383-.029-.474-.026-.951-.041-1.432-.041s-.958.015-1.432.041c-.128.007-.255.02-.383.029-.348.024-.694.052-1.038.089-.048.005-.095.006-.142.012zm-1.88 4.365a22.17 22.17 0 0 1 4.86-.537H30a1 1 0 0 1 0 2h-.013c-1.496 0-2.982.164-4.421.488a1 1 0 0 1-.44-1.951zm-5.976 2.362a1 1 0 0 1 1.019 1.721c-4.713 2.792-8.147 7.861-9.186 13.56a1 1 0 0 1-1.968-.36c1.143-6.26 4.932-11.838 10.135-14.921zM30 55.098c-17.096 0-28-4.269-28-6.5 0-.383.474-1.227 2.064-2.328-.004.057-.002.113-.006.17-.034.548-.058 1.1-.058 1.658v.788l.767.185c8.254 1.981 16.744 2.985 25.233 2.985s16.979-1.004 30-2.985l.767-.185v-.788c0-.558-.024-1.109-.058-1.658-.004-.057-.002-.113-.006-.17C57.526 47.371 58 48.215 58 48.598c0 2.231-10.904 6.5-28 6.5z" />
  </Svg>
);

export default SvgComponent;
