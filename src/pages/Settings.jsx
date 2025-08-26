import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setNotification } from "../redux/reducers/settingsSlice";
import { useEffect } from "react";

export default function Settings() {
  const dispatch = useDispatch();
  const { darkMode, notifications } = useSelector((s) => s.settings);

  useEffect(() => {
    if (typeof document !== "undefined")
      document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <h3 className="mb-2 font-medium">Appearance</h3>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => dispatch(setDarkMode(!darkMode))}
            className={
              "w-10 h-6 rounded-full transition " +
              (darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700")
            }
          >
            <div
              className={
                "h-6 w-6 rounded-full bg-white transform transition " +
                (darkMode ? "translate-x-4" : "")
              }
            ></div>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Dark mode
          </span>
        </label>
      </div>

      <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <h3 className="mb-2 font-medium">Notifications</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) =>
                dispatch(
                  setNotification({ key: "email", value: e.target.checked })
                )
              }
            />{" "}
            Email
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) =>
                dispatch(
                  setNotification({ key: "sms", value: e.target.checked })
                )
              }
            />{" "}
            SMS
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) =>
                dispatch(
                  setNotification({ key: "push", value: e.target.checked })
                )
              }
            />{" "}
            Push
          </label>
        </div>
      </div>
    </div>
  );
}
