declare const storeData: (key: string, value: any) => Promise<void>;
declare const clearAsyncData: () => Promise<void>;
declare const retrieveData: (key: string) => Promise<any>;
declare const clearSpecificKey: (key: string) => Promise<void>;
declare const saveFirstSeen: () => Promise<void>;
declare const getCookieId: () => Promise<string>;
declare const saveCookieId: () => Promise<void>;
export {
  clearAsyncData,
  clearSpecificKey,
  getCookieId,
  retrieveData,
  saveCookieId,
  saveFirstSeen,
  storeData,
};
//# sourceMappingURL=asyncStorage.d.ts.map
