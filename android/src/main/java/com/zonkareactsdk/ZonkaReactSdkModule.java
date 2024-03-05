package com.zonkareactsdk;

import androidx.annotation.NonNull;

import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import java.util.Objects;
import java.util.TimeZone;

@ReactModule(name = ZonkaReactSdkModule.NAME)
public class ZonkaReactSdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "ZonkaReactSdk";

  public ZonkaReactSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  
  @ReactMethod
    public void getTimeZone(Promise promise) {
        try {
            String timeZone = TimeZone.getDefault().getID();
            promise.resolve(timeZone);
        } catch (Exception e) {
            promise.reject("GET_TIMEZONE_ERROR", e);
        }
    }
    @ReactMethod
    public void getScreenName(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            String screenName = currentActivity.getClass().getSimpleName();
            promise.resolve(screenName);
        } else {
            promise.reject("NO_ACTIVITY", "No current activity found");
        }
    }
}
