export default function NameAndColor({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span>{name}</span>
      <div
        style={{ backgroundColor: color }}
        className="h-3 w-3 rounded-full border"
      />
    </div>
  );
}
