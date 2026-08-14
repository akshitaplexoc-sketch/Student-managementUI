import { useState , useEffect } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  Database,
  User,
  Trash2,
} from "lucide-react";

function Settings({ onResetStudents }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
  const savedMode =
    localStorage.getItem("darkMode") === "true";

  document.body.classList.toggle(
    "dark-mode",
    savedMode
  );
  }, []);


  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to delete all student records?"
    );

    if (confirmReset) {
      onResetStudents();
    }
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your application preferences
          </p>
        </div>

        <div className="settings-header-icon">
          <SettingsIcon size={25} />
        </div>

      </div>


      {/* PROFILE */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            <User size={20} />
          </div>

          <div>
            <h2>Profile</h2>
            <p>Your application profile</p>
          </div>

        </div>


        <div className="profile-box">

          <div className="profile-avatar">
            A
          </div>

          <div>
            <h3>Akshita</h3>
            <p>Student Management Administrator</p>
          </div>

        </div>

      </div>


      {/* NOTIFICATIONS */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            <Bell size={20} />
          </div>

          <div>
            <h2>Notifications</h2>
            <p>Manage notification preferences</p>
          </div>

        </div>


        <div className="setting-row">

          <div>
            <h3>Enable Notifications</h3>

            <p>
              Receive notifications about student updates.
            </p>
          </div>


          <button
            className={`toggle-btn ${
              notifications ? "active" : ""
            }`}
            onClick={() =>
              setNotifications(!notifications)
            }
          >

            <span></span>

          </button>

        </div>

      </div>


      {/* APPEARANCE */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            <Palette size={20} />
          </div>

          <div>
            <h2>Appearance</h2>
            <p>Customize application appearance</p>
          </div>

        </div>


        <div className="setting-row">

          <div>
            <h3>Dark Mode</h3>

            <p>
              Change the application theme.
            </p>
          </div>


        <button
            className={`toggle-btn ${darkMode ? "active" : ""}`}
            onClick={() => {
                const newMode = !darkMode;

                setDarkMode(newMode);

                localStorage.setItem(
                "darkMode",
                newMode
                );

                document.body.classList.toggle(
                "dark-mode",
                newMode
                );
            }}
            >
            <span></span>
        </button>

            

        </div>

      </div>


      {/* DATA */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            <Database size={20} />
          </div>

          <div>
            <h2>Student Data</h2>

            <p>
              Manage stored student information.
            </p>
          </div>

        </div>


        <div className="setting-row">

          <div>
            <h3>Reset Student Data</h3>

            <p>
              Permanently remove all student records.
            </p>
          </div>


          <button
            className="reset-btn"
            onClick={handleReset}
          >
            <Trash2 size={16} />
            Reset Data
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;