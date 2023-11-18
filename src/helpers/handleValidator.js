import React from "react";

export const notEmptyOrNullValidator = (props, propName, componentName) => {
  if (
    props[propName] === null ||
    props[propName] === undefined ||
    props[propName] === ""
  ) {
    return false;
  }
};
