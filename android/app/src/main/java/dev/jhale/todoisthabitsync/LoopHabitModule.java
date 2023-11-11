package dev.jhale.todoisthabitsync;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

public class LoopHabitModule extends ReactContextBaseJavaModule {

    private Promise onResult;

    public final ActivityEventListener listener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == 1234) {
                if (resultCode == Activity.RESULT_OK) {
                    Log.d("ReactNative", "result ok");
                    processResult(intent);
                } else if (resultCode == Activity.RESULT_CANCELED) {
                    Log.d("ReactNative", "result cancelled :(");
                }
            }

        }

        private void processResult(Intent intent) {
            Log.d("ReactNative", String.valueOf(intent));
            var blurb = intent.getStringExtra("com.twofortyfouram.locale.intent.extra.BLURB");
            var bundle = intent.getBundleExtra("com.twofortyfouram.locale.intent.extra.BUNDLE");
            if (onResult != null) {
                WritableMap map = Arguments.createMap();
                map.putString("blurb", blurb);
                map.putInt("action", bundle.getInt("action", -1));
                map.putInt("habit", (int) bundle.getLong("habit", -1));
                onResult.resolve(map);
            }
        }
    };

    LoopHabitModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(listener);
        Log.d("THabit", "Scheduling tasks every 15 minutes on WorkManager");
        WorkManager.getInstance(context).enqueueUniquePeriodicWork("TodoistHabitSyncWork", ExistingPeriodicWorkPolicy.KEEP,
                new PeriodicWorkRequest.Builder(TodoistHabitSyncWorker.class, 15, TimeUnit.MINUTES).build());
    }

    public String getName() {
        return "LoopHabitModule";
    }

    @ReactMethod
    public void openHabitSelector(Promise promise) {
        this.onResult = promise;
        Log.d("LoopHabitModule", "selecting habits...");
        Intent intent = new Intent();
        intent.setComponent(
                new ComponentName("org.isoron.uhabits", "org.isoron.uhabits.automation.EditSettingActivity"));
        getReactApplicationContext().startActivityForResult(intent, 1234, new Bundle());
    }

    @ReactMethod
    public void takeHabitAction(int habitId, int actionId, Promise promise) {
        Log.d("LoopHabitModule", "taking action on habit " + habitId + " with action " + actionId);
        Bundle command = new Bundle();
        command.putInt("action", actionId);
        command.putLong("habit", habitId);
        Intent intent = new Intent("com.twofortyfouram.locale.intent.action.FIRE_SETTING");
        intent.setPackage("org.isoron.uhabits");
        intent.putExtra("com.twofortyfouram.locale.intent.extra.BUNDLE", command);
        getReactApplicationContext().sendBroadcast(intent);
        promise.resolve(true);
    }
}