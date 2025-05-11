"use client";
const BtnConnect: React.FC = () => {
  const handleConnectClick = () => {
    // Handle the connect button click
    console.log("Connect button clicked");
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    // console.log("env: ", process.env.NEXT_PUBLIC_API_URL);
  };

  return (
    <button className="btn-connect" onClick={handleConnectClick}>
      Connect
    </button>
  );
};

export default BtnConnect;
