import { useEffect, useState } from 'react'
import './Notifications.css'

function Notifications({ onNavigate }) {

  /* =========================
     DEFAULT NOTIFICATIONS
  ========================= */

  const defaultNotifications = [
    {
      id: 'welcome-notification',
      title: 'Welcome to AcademiaIndustry',
      message:
        'Complete your profile and explore projects, internships and jobs.',
      type: 'System',
      read: false,
      createdAt: Date.now()
    }
  ]


  /* =========================
     NOTIFICATIONS
  ========================= */

  const [notifications, setNotifications] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            'notifications'
          )

        if (!saved) {
          return defaultNotifications
        }

        const parsed =
          JSON.parse(saved)

        return Array.isArray(parsed)
          ? parsed
          : defaultNotifications

      } catch {

        return defaultNotifications

      }

    })


  /* =========================
     SAVE
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      'notifications',
      JSON.stringify(
        notifications
      )
    )

  }, [notifications])


  /* =========================
     APPLICATION SYNC
  ========================= */

  useEffect(() => {

    const checkApplications = () => {

      try {

        const saved =
          localStorage.getItem(
            'applications'
          )

        if (!saved) return

        const applications =
          JSON.parse(saved)

        if (!Array.isArray(applications)) {
          return
        }


        const existing =
          JSON.parse(
            localStorage.getItem(
              'notificationApplicationIds'
            ) || '[]'
          )


        const newApplicationIds = []


        applications.forEach(
          application => {

            const applicationId =
              application.applicationId ||
              `${application.type}-${application.id}`


            if (
              !existing.includes(
                applicationId
              )
            ) {

              const newNotification = {

                id:
                  `application-${applicationId}`,

                title:
                  'Application Submitted',

                message:
                  `Your application for ${application.title} at ${application.company} has been submitted successfully.`,

                type:
                  application.type ||
                  'Application',

                read: false,

                createdAt:
                  Date.now()

              }


              setNotifications(
                previous => {

                  if (
                    previous.some(
                      item =>
                        item.id ===
                        newNotification.id
                    )
                  ) {

                    return previous

                  }

                  return [
                    newNotification,
                    ...previous
                  ]

                }
              )


              newApplicationIds.push(
                applicationId
              )

            }

          }
        )


        if (
          newApplicationIds.length > 0
        ) {

          localStorage.setItem(
            'notificationApplicationIds',
            JSON.stringify([
              ...existing,
              ...newApplicationIds
            ])
          )

        }

      } catch (error) {

        console.error(
          'Failed to sync notifications:',
          error
        )

      }

    }


    checkApplications()


    window.addEventListener(
      'applicationsUpdated',
      checkApplications
    )


    window.addEventListener(
      'focus',
      checkApplications
    )


    window.addEventListener(
      'storage',
      checkApplications
    )


    return () => {

      window.removeEventListener(
        'applicationsUpdated',
        checkApplications
      )

      window.removeEventListener(
        'focus',
        checkApplications
      )

      window.removeEventListener(
        'storage',
        checkApplications
      )

    }

  }, [])


  /* =========================
     UNREAD COUNT
  ========================= */

  const unreadCount =
    notifications.filter(
      notification =>
        !notification.read
    ).length


  /* =========================
     MARK READ
  ========================= */

  const markAsRead = (id) => {

    setNotifications(
      previous =>
        previous.map(
          notification =>
            notification.id === id
              ? {
                  ...notification,
                  read: true
                }
              : notification
        )
    )

  }


  /* =========================
     MARK ALL READ
  ========================= */

  const markAllAsRead = () => {

    setNotifications(
      previous =>
        previous.map(
          notification => ({
            ...notification,
            read: true
          })
        )
    )

  }


  /* =========================
     DELETE
  ========================= */

  const deleteNotification = (id) => {

    setNotifications(
      previous =>
        previous.filter(
          notification =>
            notification.id !== id
        )
    )

  }


  /* =========================
     CLEAR ALL
  ========================= */

  const clearAll = () => {

    if (notifications.length === 0) {
      return
    }


    const confirmed =
      window.confirm(
        'Are you sure you want to clear all notifications?'
      )

    if (!confirmed) return


    setNotifications([])

  }


  /* =========================
     DATE FORMAT
  ========================= */

  const formatDate = (date) => {

    const difference =
      Date.now() - date

    const minutes =
      Math.floor(
        difference /
        (1000 * 60)
      )

    if (minutes < 1) {
      return 'Just now'
    }

    if (minutes < 60) {
      return `${minutes} min ago`
    }


    const hours =
      Math.floor(
        minutes / 60
      )

    if (hours < 24) {
      return `${hours} hr ago`
    }


    const days =
      Math.floor(
        hours / 24
      )

    if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    }


    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      )

  }


  return (

    <div className="notifications-page">

      {/* HEADER */}

      <div className="notifications-header">

        <div>

          <p className="page-tag">
            🔔 ACTIVITY CENTER
          </p>

          <h1>
            Notifications
          </h1>

          <p className="page-description">
            Stay updated with your applications,
            opportunities and account activity.
          </p>

        </div>


        <div className="notification-count">

          <strong>
            {unreadCount}
          </strong>

          <span>
            Unread
          </span>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="notifications-toolbar">

        <div>

          <h2>
            Recent Notifications
          </h2>

          <span>
            {notifications.length} notification
            {notifications.length !== 1
              ? 's'
              : ''}
          </span>

        </div>


        <div className="notification-toolbar-actions">

          {unreadCount > 0 && (

            <button
              type="button"
              onClick={markAllAsRead}
            >
              ✓ Mark all as read
            </button>

          )}


          {notifications.length > 0 && (

            <button
              type="button"
              className="clear-notifications-btn"
              onClick={clearAll}
            >
              Clear all
            </button>

          )}

        </div>

      </div>


      {/* LIST */}

      {notifications.length === 0 ? (

        <div className="notifications-empty">

          <div>
            🔔
          </div>

          <h3>
            You're all caught up!
          </h3>

          <p>
            New updates and application activity
            will appear here.
          </p>

        </div>

      ) : (

        <div className="notifications-list">

          {notifications.map(
            notification => (

              <div
                key={notification.id}
                className={
                  `notification-card ${
                    notification.read
                      ? 'read'
                      : 'unread'
                  }`
                }
              >

                <div className="notification-icon">

                  {notification.type ===
                  'Job'
                    ? '💼'
                    : notification.type ===
                      'Internship'
                    ? '🎯'
                    : notification.type ===
                      'Project'
                    ? '💻'
                    : '🔔'}

                </div>


                <div className="notification-content">

                  <div className="notification-title-row">

                    <h3>
                      {notification.title}
                    </h3>

                    {!notification.read && (

                      <span className="unread-dot">
                      </span>

                    )}

                  </div>


                  <p>
                    {notification.message}
                  </p>


                  <small>
                    {formatDate(
                      notification.createdAt
                    )}
                  </small>

                </div>


                <div className="notification-actions">

                  {!notification.read && (

                    <button
                      type="button"
                      onClick={() =>
                        markAsRead(
                          notification.id
                        )
                      }
                    >
                      Mark read
                    </button>

                  )}


                  <button
                    type="button"
                    className="notification-delete"
                    onClick={() =>
                      deleteNotification(
                        notification.id
                      )
                    }
                  >
                    ×
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  )
}

export default Notifications