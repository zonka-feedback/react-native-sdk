export declare const useZFSurvey: () => {
    startSurvey: (isDeviceDetail?: boolean, sendCustomAttribute?: {}) => Promise<void>;
    sendCustomAttributes: (hashMap: any) => {
        sendDeviceDetails: (isDeviceDetail: boolean) => {
            startSurvey: () => Promise<void>;
        };
        startSurvey: () => Promise<void>;
    };
    sendDeviceDetails: (isDeviceDetail: boolean) => Promise<{
        sendCustomAttributes: (hashMap: any) => {
            startSurvey: () => Promise<void>;
        };
        startSurvey: () => Promise<void>;
    }>;
    userInfo: (hashMap: {} | undefined) => {
        sendDeviceDetails: (isDeviceDetail: boolean) => {
            startSurvey: () => Promise<void>;
        };
        startSurvey: () => Promise<void>;
    };
    clear: () => void;
};
//# sourceMappingURL=startSurveyHook.d.ts.map