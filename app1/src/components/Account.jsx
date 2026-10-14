export default function Account(props) {
    const achName = props.name.toUpperCase();
    const updatedBalance = parseFloat(props.balance) + 500;
  return (
    <div>
        <h2>Account Details</h2>
        Account Holder Name: {achName}<br/>
        Account type: {props.actype}<br/>
        Current Balance: {updatedBalance}<br/>
    </div>
  );
}