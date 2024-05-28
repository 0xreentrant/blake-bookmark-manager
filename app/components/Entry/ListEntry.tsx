export const ListEntry = ({ list, isChecked }) => (
  <div className=" flex justify-between pb-4">
    {list.title}
    <div className="round">
      <input type="checkbox" name={list.id} id={list.id} defaultChecked={isChecked} />
      <label htmlFor={list.id} />
    </div>
  </div>
);
