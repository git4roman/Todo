import logo from "../assets/favicon.ico";

const Logo = () => {
  return (
    <div style={{ textAlign: "center", margin: "10px 0" }}>
      <a
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          color: "black",
          boxShadow: "none", // Adjust or remove if not needed
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "40px", // Set desired width
            height: "40px", // Set desired height
            objectFit: "contain", // Maintains aspect ratio
          }}
        />
        {/* <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Todo MERN APP
        </span> */}
      </a>
    </div>
  );
};
export default Logo;
