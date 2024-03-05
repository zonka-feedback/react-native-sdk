export declare const hitSurveyActiveApi: (token: string, isSurveyInitialize: boolean, isModalVisible: boolean, setOpenModal: any) => Promise<any>;
export declare const hitCreateContactAPI: (hashMap: any, startSurvey: () => void) => Promise<any>;
export declare const hitCreateContactApiDynamic: (hashMap: any, startSurvey: any) => Promise<any>;
export declare const hitSessionUpdateApi: (token: string, updateSessionRequest: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hitSendEventToServerApi: (eventRequest: any) => Promise<string>;
export declare const getIpAddress: () => Promise<any>;
//# sourceMappingURL=service.d.ts.map