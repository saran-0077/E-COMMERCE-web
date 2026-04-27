import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, cartCount }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar top-la fixed-a irukkum */}
      <Navbar cartCount={cartCount} />
      
      {/* display: flex kodutha dhaan ulla ulla Sidebar-um Grid-um side-by-side varum */}
      <main style={{ flex: 1, display: "flex" }}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;