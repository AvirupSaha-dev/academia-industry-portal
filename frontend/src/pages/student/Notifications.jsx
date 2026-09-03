import React, { useState } from 'react'
import './Notifications.css'

function Notifications() {

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        type: 'application',
        icon: '📄',
        title: 'Application Submitted',
        message:
          'Your application for Frontend Development Intern has been submitted successfully.',
        time: '10 minutes ago',
        unread: true
      },
      {
        id: 2,
        type: 'job',
        icon: '💼',
        title: 'New Job Recommendation',
        message:
          'A new Machine Learning Engineer job matches your skills.',
        time: '2 hours ago',
        unread: true
      },
      {
        id: 3,
        type: 'learning',
        icon: '📚',
        title: 'Learning Reminder',
        message:
          'Continue your Machine Learning Fundamentals course.',
        time: 'Yesterday',
        unread: false
      },
      {
        id: 4,
        type: 'profile',
        icon: '⭐',
        title: 'Profile Updated',
        message:
          'Your skill profile has been updated successfully.',
        time: '2 days ago',
        unread: false
      }
    ])

  const unreadCount =
    notifications.filter(
      notification => notification.unread
    ).length

  const markAllRead = () => {

    setNotifications(
      notifications.map(notification => ({
        ...notification,
        unread: false
      }))
    )

  }

  const markRead = (id) => {

    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? {
              ...notification,
              unread: false
            }
          : notification
      )
    )

  }

  return (
    <div className="notifications-page">

      {/* HEADER */}

      <div className="notifications-header">

        <div>

          <p className="notifications-tag">
            UPDATES & ALERTS
          </p>

          <h1>
            Notifications
          </h1>

          <p>
            Stay updated with your applications, jobs and learning.
          </p>

        </div>

        {unreadCount > 0 && (

          <button
            className="mark-all-btn"
            onClick={markAllRead}
          >
            ✓ Mark all as read
          </button>

        )}

      </div>


      {/* SUMMARY */}

      <div className="notification-summary">

        <div className="notification-summary-icon">
          🔔
        </div>

        <div>

          <strong>
            {unreadCount}
          </strong>

          <span>
            unread notifications
          </span>

        </div>

      </div>


      {/* NOTIFICATION LIST */}

      <section className="notification-list">

        {notifications.map(notification => (

          <div
            className={
              notification.unread
                ? 'notification-card unread'
                : 'notification-card'
            }
            key={notification.id}
            onClick={() =>
              markRead(notification.id)
            }
          >

            <div className="notification-icon">
              {notification.icon}
            </div>

            <div className="notification-content">

              <div className="notification-title-row">

                <h3>
                  {notification.title}
                </h3>

                {notification.unread && (
                  <span className="unread-dot" />
                )}

              </div>

              <p>
                {notification.message}
              </p>

              <small>
                {notification.time}
              </small>

            </div>

            <div className="notification-arrow">
              →
            </div>

          </div>

        ))}

      </section>

    </div>
  )
}

export default Notifications