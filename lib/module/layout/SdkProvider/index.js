import React, { memo, useState } from 'react';
import Main from '../Main';
import { createContext } from 'react';

// export const SDKContext = createContext<ZonkaontextType | null>(null);
export const SDKContext = /*#__PURE__*/createContext(null);
const SdkProvider = ({
  children,
  value
}) => {
  const {
    token,
    region
  } = value;
  const [openModal, setOpenModal] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [url, setUrl] = useState('');
  const props = {
    openModal,
    setOpenModal,
    setUrl,
    url,
    token,
    region,
    baseUrl,
    setBaseUrl
  };
  return /*#__PURE__*/React.createElement(SDKContext.Provider, {
    value: props
  }, /*#__PURE__*/React.createElement(Main, null, children));
};
export default /*#__PURE__*/memo(SdkProvider);
//# sourceMappingURL=index.js.map