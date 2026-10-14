export default function Box({children}) {
  return (
    <div style={{width: '100%', height: '100%', border: "5px solid hotpink", padding: "20px", borderRadius: "12px"}}>
        {children}
    </div>
  );
}