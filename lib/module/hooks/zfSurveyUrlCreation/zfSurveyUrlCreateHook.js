import { useContext, useState } from "react";
import { SDKContext } from "../../layout/SdkProvider";
import { getCookieId, retrieveData } from "../../store/asyncStorage";
import AppUtils from "../../utils/appUtils";
import Constant from "../../utils/constant";
import { getZfSurveyUrl, userInfoData } from "../../utils/zfsurveyHelperFunction";
export const useZfSurveyUrlCreate = () => {
  const {
    setUrl
  } = useContext(SDKContext);
  const [, setCustomVariableString] = useState("");
  const getZonkaFeedbackSurveyUrlString = async (token, baseUrl, deviceDetails = false, getCustomAttributes = {}) => {
    if (baseUrl) {
      let url = getZfSurveyUrl(baseUrl);
      const cookieId = await getCookieId();
      const externalVisitorId = await retrieveData(Constant.EXTERNAL_VISITOR_ID);
      const contactId = await retrieveData(Constant.CONTACT_ID);
      if (getCustomAttributes != null && Object.keys(getCustomAttributes).length > 0) {
        const variableString = addCustomParam(getCustomAttributes, token);
        setCustomVariableString(variableString);
        url = url + variableString;
      }
      if (cookieId !== "") {
        setCustomVariableString("");
        url = url + "cookieId" + "=" + cookieId + "&";
      }
      if (externalVisitorId) {
        setCustomVariableString("");
        url = url + "externalVisitorId" + "=" + externalVisitorId + "&";
      }
      if (contactId) {
        setCustomVariableString("");
        url = url + "contactId" + "=" + contactId + "&";
      }
      if (deviceDetails) {
        setCustomVariableString("");
        const variableString = addCustomParam(await AppUtils.getHiddenVariables(), token);
        setCustomVariableString(variableString);
        url = url + variableString;
      }
      setUrl(url);
    }
  };
  const addCustomParam = (hashMap, token) => {
    let variableString = "";
    for (const [key, value] of Object.entries(hashMap)) {
      variableString += `${key}=${value}&`;
    }
    userInfoData(hashMap, token);
    return variableString;
  };
  return {
    getZonkaFeedbackSurveyUrlString
  };
};
//# sourceMappingURL=zfSurveyUrlCreateHook.js.map