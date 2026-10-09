import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <Navbar>
      {children}
    </Navbar>
  );
}

export default Layout;