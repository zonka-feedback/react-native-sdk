export declare const generateBaseUrl: (surveyToken: string, zfRegion: string) => string;
export declare const generateSurveyUrl: (surveyToken: string, zfRegion: string, setBaseUrl: any) => string | undefined;
export declare const getZfSurveyUrl: (baseUrl: string) => string;
export declare const userInfoData: (hashMap: any, token: string, startSurvey?: any) => void;
export declare const createContactForDynamicAttribute: (hashMap: any, token: string, startSurvey: any) => Promise<void>;
export declare const onCreateCreatingSuccess: (isContactCreated: boolean, surveyStart: () => void) => Promise<void>;
export declare const onWidgetSuccess: (widget: any, isSurveyInitialize: boolean, isZfSurveyModalVisible: any, setOpenModal: any) => Promise<void>;
export declare const checkSegmenting: () => Promise<boolean>;
export declare const createContact: (token: string, startSurvey: () => void) => Promise<void>;
//# sourceMappingURL=zfsurveyHelperFunction.d.ts.map