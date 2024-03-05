import React, { memo, useState } from 'react';

import Main from '../Main';
import { createContext } from 'react';

// export const SDKContext = createContext<ZonkaontextType | null>(null);
export const SDKContext = createContext<any>(null);
const SdkProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) => {
  const { token, region } = value;
  const [openModal, setOpenModal] = useState(false);
  const [surveyExpand, setSurveyExpand] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [url, setUrl] = useState('');
  const props = {
    openModal,
    setOpenModal,
    setUrl,
    setSurveyExpand,
    surveyExpand,
    url,
    token,
    region,
    baseUrl,
    setBaseUrl,
  };

  return (
    <SDKContext.Provider value={props}>
      <Main>{children}</Main>
    </SDKContext.Provider>
  );
};

export default memo(SdkProvider);
