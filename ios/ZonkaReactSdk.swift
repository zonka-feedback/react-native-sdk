import Foundation
import UIKit
import React
@objc(ZonkaReactSdk)
class ZonkaReactSdk: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }
   @objc
    func getTimeZone(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        let timeZone = TimeZone.current.identifier
        resolve(timeZone)
    }
     @objc
    func getScreenName(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        guard let currentViewController = UIApplication.shared.keyWindow?.rootViewController else {
            reject("NO_ACTIVITY", "No current view controller found", nil)
            return
        }
        
        if let navigationController = currentViewController as? UINavigationController,
           let visibleViewController = navigationController.visibleViewController {
            resolve("\(type(of: visibleViewController))")
        } else {
            resolve("\(type(of: currentViewController))")
        }
    }
}
