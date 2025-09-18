package dev.jhale.todoisthabitsync

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Build
import android.util.Log

import androidx.work.Worker
import androidx.work.WorkerParameters

// Largely drawn from https://stackoverflow.com/questions/65547466/react-native-headlessjs-task-call-with-android-workmanager
class TodoistHabitSyncWorker(
    context: Context,
    workerParams: WorkerParameters
) : Worker(context, workerParams) {

    companion object {
        private const val TAG = "TodoistHabitSyncWorker"
    }

    init {
        Log.d("THabit", "Creating a sync worker")
    }

    override fun doWork(): Result {
        val service = Intent(applicationContext, TodoistHabitSyncService::class.java)
        val bundle = Bundle().apply {
            putString("foo", "bar")
        }
        service.putExtras(bundle)
        Log.d("THabit", "Doing the work of starting a service")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            applicationContext.startForegroundService(service)
        } else {
            applicationContext.startService(service)
        }
        return Result.success()
    }
}