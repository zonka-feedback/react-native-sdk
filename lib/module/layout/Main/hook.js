import { useContext } from 'react';
import { useZfSurveyUrlCreate } from '../../hooks/zfSurveyUrlCreation/zfSurveyUrlCreateHook';
import { hitSurveyActiveApi } from '../../services/service';
import { saveCookieId, saveFirstSeen, storeData } from '../../store/asyncStorage';
import AppUtils from '../../utils/appUtils';
import Constant from '../../utils/constant';
import { generateSurveyUrl } from '../../utils/zfsurveyHelperFunction';
import { SDKContext } from '../SdkProvider';
export const useInitializeZFSdk = () => {
  const {
    setBaseUrl,
    openModal,
    setOpenModal
  } = useContext(SDKContext);
  const {
    getZonkaFeedbackSurveyUrlString
  } = useZfSurveyUrlCreate();
  const init = async (token, region) => {
    if (!!token && !!region) {
      const baseUrl = generateSurveyUrl(token, region, setBaseUrl);
      storeData(Constant.ZF_REGION, region);
      saveFirstSeen();
      saveCookieId();
      getZonkaFeedbackSurveyUrlString(token, baseUrl);
      if (await AppUtils.isNetworkConnected()) {
        await hitSurveyActiveApi(token, false, openModal, setOpenModal);
      }
    }
  };
  return {
    init
  };
};
//# sourceMappingURL=hook.js.map