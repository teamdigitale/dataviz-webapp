import { useState } from "react";
import dayjs from "dayjs";

import { FieldDataType } from "../types";
import Dialog from "./layout/Dialog";
// import RenderChart from "./RenderChart";

type ChartListProps = {
  list: FieldDataType[] | [];
  handleLoadChart: (item: FieldDataType) => void;
  handleDeleteChart: (id: string) => void;
};

type picItem = { id: string; pic: string };

export default function ChartList({
  list,
  handleLoadChart,
  handleDeleteChart,
}: ChartListProps) {
  // const [picList, setPicList] = useState<picItem[]>([]);
  const [show, setShow] = useState<string | null>(null);

  // function setPicture(id: string, pic: string) {
  //   if (pic) setPicList((prev: picItem[]) => [...prev, { id, pic }]);
  // }
  return (
    <div className='flex flex-col gap-2'>
      <div>
        {/* {picList?.map((item) => {
          return (
            <div key={item.id}>
              <img
                src={item.pic}
                alt='chart'
                style={{
                  minWidth: 80,
                  minHeight: 80,
                  maxWidth: 200,
                  maxHeight: 200,
                }}
                className='m-2'
              />
            </div>
          );
        })} */}
      </div>
      {list?.map((item) => {
        const updatedAt = (item as any).updatedAt || "";
        // const pic = picList.find((i) => i.id === item.id);
        return (
          <div className='w-full'>
            <div key={item.id} className='my-2 flex gap-2 border p-2'>
              {/* {pic && (
                <img
                  src={pic.pic}
                  alt='chart'
                  style={{
                    width: 160,
                    height: 160,
                  }}
                  className='m-2'
                />
              )} */}
              <div className='grow flex flex-col justify-start'>
                <div className='text-lg'>{item.name}</div>
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
                {/* <div className='max-w-[40%]'>
                  <RenderChart
                    {...(item as any)}
                    getPicture={(pic: string) => setPicture(item.id + "", pic)}
                  />
                </div> */}
              </div>
              <button
                className='mr-8 btn btn-outline btn-error btn-sm'
                onClick={() => handleDeleteChart(item.id || "")}
              >
                DELETE
              </button>
              {item.publish && (
                <>
                  <button
                    className='btn btn-outline  btn-sm'
                    onClick={() =>
                      setShow(
                        `<iframe src="${window.location.origin}/embed/${item.id}" width="100%" height="400px" frameborder="0"></iframe>`
                      )
                    }
                  >
                    EMBED
                  </button>
                  <a
                    className='btn btn-outline btn-success btn-sm'
                    target='_blank'
                    href={`/chart/${item.id}`}
                  >
                    VIEW
                  </a>
                </>
              )}
              <button
                className='btn btn-outline btn-primary btn-sm'
                onClick={() => handleLoadChart(item)}
              >
                EDIT
              </button>
            </div>
          </div>
        );
      })}

      <Dialog
        toggle={show ? true : false}
        title='Embed This Chart'
        callback={() => setShow(null)}
      >
        <div className='mockup-code'>
          <pre data-prefix=''>
            <code>{show}</code>
          </pre>
        </div>
      </Dialog>
    </div>
  );
}
