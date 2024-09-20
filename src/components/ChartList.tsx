import { FieldDataType } from "../sharedTypes";

type ChartListProps = {
  list: FieldDataType[] | [];
  handleLoadChart: (item: FieldDataType) => void;
  handleDeleteChart: (id: string) => void;
};

export default function ChartList({
  list,
  handleLoadChart,
  handleDeleteChart,
}: ChartListProps) {
  return (
    <div className="">
      {list?.map((item) => (
        <div key={item.id} className="my-2 flex gap-2 items-center border p-2">
          <div className="grow flex flex-col">
            <div className="text-lg">{item.name}</div>
            <small
              className={`text-xxs text-content opacity-70 pr-4 ${
                item.publish ? "text-success" : "text-content"
              }`}
            >
              {item.publish ? "public" : "private"}
            </small>
          </div>
          {item.publish && (
            <a
              className="btn btn-outline btn-success btn-sm"
              target="_blank"
              href={`/chart/${item.id}`}
            >
              view
            </a>
          )}
          <button
            className="btn btn-outline btn-primary btn-sm"
            onClick={() => handleLoadChart(item)}
          >
            load
          </button>
          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => handleDeleteChart(item.id || "")}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
