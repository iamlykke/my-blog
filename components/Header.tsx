export const Header: React.FC = () => {
  return (
    <div className="navbar bg-base-200 p-0">
      <div className="flex-1">
        <p className="text-xl text-black font-bold">My Blog</p>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-soft btn-primary">New post</button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-gray-800"></div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
