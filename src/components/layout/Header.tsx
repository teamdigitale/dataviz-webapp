export default function Header() {
  return (
    <div className="navbar bg-primary text-primary-content shadow-xl mb-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Create Chart</a>
            </li>
            <li>
              <a>Data</a>
              <ul className="p-2">
                <li>
                  <a href="/generate-data">Generate</a>
                </li>
                <li>
                  <a href="/load-data">Load Remote</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          Dataviz
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-base text-content">
          <li>
            <a href="/">Create Chart</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <details className="">
              <summary>Data</summary>
              <ul className="w-[125px] bg-base-100 text-primary">
                <li className="bg-base-100 text-primary">
                  <a href="/generate-data">Generate</a>
                </li>
                <li className="bg-base-100 text-primary">
                  <a href="/load-data">Load Remote</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end px-4">
        <a className="btn btn-ghost">Log In</a>
      </div>
    </div>
  );
}
