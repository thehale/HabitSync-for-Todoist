package dev.jhale.todoisthabitsync

import android.content.Intent
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class TodoistHabitSyncService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        Log.d("THabit", "Configuring the HeadlessJsTask")
        return intent?.extras?.let {
            HeadlessJsTaskConfig(
                "todoist-habit-sync",
                Arguments.fromBundle(it),
                5000, // timeout for the task
                true // optional: defines whether or not the task is allowed in foreground.
                // Default is false
            )
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Create a notification for foreground service
        val notification = ForegroundServiceNotification.create(this)
        startForeground(ForegroundServiceNotification.NOTIFICATION_ID, notification)
        // Call super to keep HeadlessJsTaskService behavior
        return super.onStartCommand(intent, flags, startId)
    }
}
