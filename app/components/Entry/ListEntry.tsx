export const ListEntry = ({ list, isChecked }) => (
  <div className="w-full flex justify-between pb-4">
    <div className="max-w-[90%] truncate">{list.title}</div>
    <div className="round">
      <input
        type="checkbox"
        name={list.id}
        id={list.id}
        defaultChecked={isChecked}
      />
      <label htmlFor={list.id} />
    </div>
  </div>
);
