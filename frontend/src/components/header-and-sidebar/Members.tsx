import Member from "./Member";

function Members() {
  return (
    <div className="flex flex-col overflow-auto py-2">
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
    </div>
  );
}

export default Members;
