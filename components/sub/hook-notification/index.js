import { useState, useEffect } from "react";
import NotificationsSnackQue from "./snackQueue";

// TODO: plug styles form here
// TODO: find sol to allow props in ssr
function useNotifications() {
  const [_position] = useState("bottom-left");
  const [_maxQueue] = useState(3);
  const [_duration] = useState(5000);
  const [notifications, setNotifications] = useState(() => () => {});
  const [
    showNotificationMsg,
    setShowNotificationMsg,
  ] = useState(() => () => {});
  const [
    hideNotificationMsg,
    setHideNotificationMsg,
  ] = useState(() => () => {});
  const [clearQueue, setClearQueue] = useState(() => () => {});

  useEffect(() => {
    // notification obj (main)
    const _notifications = new NotificationsSnackQue(
      _position,
      _maxQueue,
      document.body
    );
    setNotifications(_notifications);

    // show notifications
    const _showNotificationMsg = () => (msg, options = {}) => {
      const {
        variant = "",
        duration = _duration,
        position = _position,
        closeButton = false,
        displayIcon = false,
      } = options;
      _notifications.show(
        msg,
        position,
        duration,
        variant,
        closeButton,
        displayIcon
      );
    };
    setShowNotificationMsg(_showNotificationMsg);

    // hide notifications
    const _hideNotificationMsg = () => (msg) => {
      _notifications.hide(msg);
    };
    setHideNotificationMsg(_hideNotificationMsg);

    // clear queue
    const _clearQueue = () => () => {
      _notifications.clear();
    };
    setClearQueue(_clearQueue);
  }, [_position, _maxQueue]);

  return {
    notifications,
    showNotificationMsg,
    hideNotificationMsg,
    clearQueue,
  };
}

export default useNotifications;
