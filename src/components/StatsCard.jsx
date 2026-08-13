import {
  Users,
  UserCheck,
  GraduationCap,
  UserPlus
} from "lucide-react";

function StatsCard({
  title,
  value,
  icon,
  description
}) {
  const icons = {
    users: Users,
    cse: GraduationCap,
    it: UserCheck,
    add: UserPlus
  };

  const Icon = icons[icon] || Users;

  return (
    <div className="stats-card">

      <div className="stats-card-top">

        <div className="stats-icon">
          <Icon size={22} />
        </div>

        <span className="stats-label">
          {title}
        </span>

      </div>

      <h2>{value}</h2>

      <p>{description}</p>

    </div>
  );
}

export default StatsCard;