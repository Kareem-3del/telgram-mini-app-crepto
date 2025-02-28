import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-[50px] w-full fixed top-0 left-0 flex justify-center items-center">
      <section className="w-[400px] h-full bg-blue-900 px-[20px]">
        <ul className="flex justify-between h-full items-center">
          <li>
            <Link className="hover:underline" href={"/"}>Home</Link>
          </li>
          <li>
            <Link className="hover:underline" href={"/users"}>Users</Link>
          </li>
          <li>
            <Link className="hover:underline" href={"/create"}>Create a task</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
