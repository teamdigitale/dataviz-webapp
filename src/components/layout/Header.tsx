import * as auth from "../../lib/auth";

export default function Header() {
  const logged = auth.useAuth();

  // useEffect(() => {
  //   if (!logged) {
  //     window.location.href = "/enter";
  //   }
  // }, [logged]);

  function logoutAndRedir() {
    auth.logout();
    window.location.href = "/";
  }

  const menu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Create Chart",
      link: "/home",
    },
    {
      name: "Create Dashboard",
      link: "/dashboards",
    },
    {
      name: "Manage Data",
      link: "",
      subMenu: [
        {
          name: "Generate",
          link: "/generate-data",
        },
        {
          name: "Load Remote",
          link: "/load-data",
        },
        {
          name: "Check GeoJSon",
          link: "/geo",
        },
      ],
    },
  ];

  return (
    <div className='navbar bg-primary text-primary-content shadow-xl mb-2'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 text-primary rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {menu.map((item, index) => {
              if (item.subMenu) {
                return (
                  <li key={`mobile-${item.name}`}>
                    <a>{item.name}</a>
                    <ul className='p-2'>
                      {item.subMenu.map((subItem, subIndex) => {
                        return (
                          <li key={`mobile-sub-${subItem.name}`}>
                            <a href={subItem.link}>{subItem.name}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={`mobile-${item.name}`}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <a className='btn btn-ghost text-xl' href='/'>
          Dataviz
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 bg-base text-content'>
          {menu.map((item, index) => {
            if (item.subMenu) {
              return (
                <li key={`menu-${item.name}`}>
                  <details>
                    <summary>{item.name}</summary>
                    <ul className='w-[125px] bg-base-100 text-primary z-10'>
                      {item.subMenu.map((subItem, subIndex) => {
                        return (
                          <li
                            key={`menu-sub-${subItem.name}`}
                            className='bg-base-100 text-primary'
                          >
                            <a href={subItem.link}>{subItem.name}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            } else {
              return (
                <li key={`menu-${item.name}`}>
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className='navbar-end px-4'>
        {!logged ? (
          <a className='btn btn-ghost' href='/enter'>
            Sign In / Up
          </a>
        ) : (
          <button className='btn btn-ghost' onClick={() => logoutAndRedir()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
