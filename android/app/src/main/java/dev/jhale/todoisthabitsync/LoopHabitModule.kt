// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

package dev.jhale.todoisthabitsync

import android.app.Activity
import android.content.ComponentName
import android.content.Intent
import android.os.Bundle
import android.util.Log

import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager

import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap

import java.util.concurrent.TimeUnit

class LoopHabitModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private var onResult: Promise? = null

    private val listener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
            if (requestCode == 1234) {
                if (resultCode == Activity.RESULT_OK) {
                    Log.d("ReactNative", "result ok")
                    processResult(data)
                } else if (resultCode == Activity.RESULT_CANCELED) {
                    Log.d("ReactNative", "result cancelled :(")
                }
            }
        }

        private fun processResult(intent: Intent?) {
            Log.d("ReactNative", intent.toString())
            val blurb = intent?.getStringExtra("com.twofortyfouram.locale.intent.extra.BLURB")
            val bundle = intent?.getBundleExtra("com.twofortyfouram.locale.intent.extra.BUNDLE")
            if (onResult != null && bundle != null) {
                val map = Arguments.createMap()
                map.putString("blurb", blurb)
                map.putInt("action", bundle.getInt("action", -1))
                map.putInt("habit", bundle.getLong("habit", -1).toInt())
                onResult?.resolve(map)
            }
        }
    }

    init {
        context.addActivityEventListener(listener)
        Log.d("THabit", "Scheduling tasks every 15 minutes on WorkManager")
        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            "TodoistHabitSyncWork",
            ExistingPeriodicWorkPolicy.KEEP,
            PeriodicWorkRequestBuilder<TodoistHabitSyncWorker>(15, TimeUnit.MINUTES).build()
        )
    }

    override fun getName(): String = "LoopHabitModule"

    @ReactMethod
    fun openHabitSelector(promise: Promise) {
        onResult = promise
        Log.d("LoopHabitModule", "selecting habits...")
        val intent = Intent().apply {
            component = ComponentName("org.isoron.uhabits", "org.isoron.uhabits.automation.EditSettingActivity")
        }
        reactApplicationContext.startActivityForResult(intent, 1234, Bundle())
    }

    @ReactMethod
    fun takeHabitAction(habitId: Int, actionId: Int, promise: Promise) {
        Log.d("LoopHabitModule", "taking action on habit $habitId with action $actionId")
        val command = Bundle().apply {
            putInt("action", actionId)
            putLong("habit", habitId.toLong())
        }
        val intent = Intent("com.twofortyfouram.locale.intent.action.FIRE_SETTING").apply {
            setPackage("org.isoron.uhabits")
            putExtra("com.twofortyfouram.locale.intent.extra.BUNDLE", command)
        }
        reactApplicationContext.sendBroadcast(intent)
        promise.resolve(true)
    }
}
