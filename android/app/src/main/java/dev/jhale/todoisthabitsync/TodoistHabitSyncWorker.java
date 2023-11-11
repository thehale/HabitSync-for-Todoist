package dev.jhale.todoisthabitsync;


import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.work.Worker;
import androidx.work.WorkerParameters;

import javax.annotation.Nonnull;

// Largely drawn from https://stackoverflow.com/questions/65547466/react-native-headlessjs-task-call-with-android-workmanager
public class TodoistHabitSyncWorker extends Worker {
    private static final String TAG = "TodoistHabitSyncWorker";

    public TodoistHabitSyncWorker(@Nonnull Context context, @Nonnull WorkerParameters workerParams) {
        super(context, workerParams);
        Log.d("THabit", "Creating a sync worker");
    }

    @Nonnull
    @Override
    public Result doWork() {
        Intent service = new Intent(getApplicationContext(), TodoistHabitSyncService.class);
        Bundle bundle = new Bundle();
        bundle.putString("foo", "bar");
        service.putExtras(bundle);
        Log.d("THabit", "Doing the work of starting a service");
        getApplicationContext().startService(service);
        return Result.success();
    }
}