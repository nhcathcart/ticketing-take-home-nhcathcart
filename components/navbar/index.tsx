import Link from "next/link";
import MobileMenu from "./mobile-menu";

export type NavItem = {
  id: string;
  text: string;
  href: string;
};

export function Navbar() {
  const navItemArray: NavItem[] = [
    { id: "nav-link-new-ticket", text: "new ticket", href: "/" },
    { id: "nav-link-admin", text: "admin", href: "/admin" },
  ];

  return (
    <nav className="fixed flex justify-between items-center h-16 px-4 md:px-8 bg-primary w-full shadow z-10">
      <div
        className="logo-container w-fit flex items-center font-[800] text-2xl"
        id="nav-logo"
      >
        Z Helpdesk
      </div>
      <div
        className="nav-link-conatiner w-fit gap-1 hidden md:flex"
        id="nav-link-container"
      >
        {navItemArray.map((item) => {
          return (
            <Link
              id={item.id}
              href={item.href}
              key={`nav-link-${item.text}`}
              className="rounded-lg px-4 py-2 hover:bg-secondary hover:text-background transform transition-all"
            >
              {item.text}
            </Link>
          );
        })}
      </div>
      <div className="nav-link-container-mobile md:hidden flex items-center">
        <MobileMenu navArray={navItemArray} />
      </div>
    </nav>
  );
}
