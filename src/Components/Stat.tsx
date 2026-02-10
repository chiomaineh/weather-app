type StatProps = {
    label: string;
    value: string;
}

const Stat = ({ label, value }: StatProps) => (
  <div className="unit p-3 rounded-md ">
    <p>{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

export default Stat;