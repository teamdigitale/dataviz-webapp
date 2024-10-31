import { useState } from "react";
import dayjs from "dayjs";

import { FieldDataType } from "../sharedTypes";
import Dialog from "./layout/Dialog";

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
  const [show, setShow] = useState<string | null>(null);
  return (
    <div className="">
      {list?.map((item) => {
        const updatedAt = (item as any).updatedAt || "";
        return (
          <div
            key={item.id}
            className="my-2 flex gap-2 items-center border p-2"
          >
            <div className="grow flex flex-col">
              <div className="text-lg">{item.name}</div>
              <span>
                {updatedAt && (
                  <small className={`text-xxs text-content opacity-70 pr-4`}>
                    {dayjs(updatedAt).format("DD/MM/YYYY HH:mm")}
                  </small>
                )}
                <small
                  className={`text-xxs text-content opacity-70 pr-4 ${
                    item.publish ? "text-success" : "text-content"
                  }`}
                >
                  {item.publish ? "public" : "private"}
                </small>

                <small
                  className={`text-xxs text-content opacity-70 pr-4 ${
                    item.isRemote ? "text-primary" : "text-content"
                  }`}
                >
                  {item.isRemote ? "remote" : ""}
                </small>
              </span>
            </div>
            {item.publish && (
              <>
                <a
                  className="btn btn-outline btn-success btn-sm"
                  target="_blank"
                  href={`/chart/${item.id}`}
                >
                  VIEW
                </a>
                <button
                  className="btn btn-outline  btn-sm"
                  onClick={() =>
                    setShow(
                      `<iframe src="${window.location.origin}/embed/${item.id}" width="100%" height="400px" frameborder="0"></iframe>`
                    )
                  }
                >
                  EMBED
                </button>
              </>
            )}
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => handleLoadChart(item)}
            >
              EDIT
            </button>
            <button
              className="ml-4 btn btn-outline btn-error btn-sm"
              onClick={() => handleDeleteChart(item.id || "")}
            >
              DELETE
            </button>
          </div>
        );
      })}
      <Dialog
        toggle={show ? true : false}
        title="Embed This Chart"
        callback={() => setShow(null)}
      >
        <div className="mockup-code">
          <pre data-prefix="">
            <code>{show}</code>
          </pre>
        </div>
      </Dialog>
    </div>
  );
}
