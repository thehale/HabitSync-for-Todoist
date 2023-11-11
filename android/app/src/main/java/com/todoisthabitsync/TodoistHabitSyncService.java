package com.todoisthabitsync;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class TodoistHabitSyncService extends HeadlessJsTaskService {

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Log.d("THabit", "Configuring the HeadlessJsTask");
        Bundle extras = intent.getExtras();
        extras = extras == null ? new Bundle() : extras;
        return new HeadlessJsTaskConfig(
            "todoist-habit-sync",
            Arguments.fromBundle(extras),
            5000, // timeout in milliseconds for the task
            true // optional: defines whether or not the task is allowed in foreground. Default
                 // is false
        );
    }
}