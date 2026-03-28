function MaidCard({ maid }) {
  return (
    <div>
      <h3>{maid.user.name}</h3>
      <p>{maid.workType}</p>
      <p>{maid.experience} yrs</p>
      <p>₹{maid.salaryExpected} ({maid.salaryType})</p>
    </div>
  );
}

export default MaidCard;