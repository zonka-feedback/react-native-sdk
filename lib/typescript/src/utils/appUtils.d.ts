declare const AppUtils: {
    getAppVersionCode: () => Promise<string | null>;
    getDeviceId: () => Promise<string>;
    getDeviceSerial: () => Promise<string>;
    getDeviceIMEI: () => Promise<string>;
    getDeviceResolution: () => string;
    getLocalIpAddress: () => Promise<any>;
    get_network: () => Promise<"N/A" | import("@react-native-community/netinfo").NetInfoStateType>;
    isTablet: () => boolean;
    isNetworkConnected: () => Promise<boolean | null>;
    getTimeZone: () => Promise<any>;
    getHiddenVariables: () => Promise<{
        [x: string]: string | Promise<any> | null;
    }>;
    calculateDifferenceTime: (createdDateInMs: number) => Promise<boolean>;
    getCurrentTime: (timestamp: any, format: string) => string;
    getCookieId: (length?: number) => string;
    getScreenName: () => string;
};
export default AppUtils;
//# sourceMappingURL=appUtils.d.ts.map