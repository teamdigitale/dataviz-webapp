import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { ChartSaveProps } from '../types';

function ChartSave({ chart, name, id, save }: ChartSaveProps) {
  const defaultName = `${chart}chart-${dayjs(Date.now()).format(
    'YYYY-MM-DD_HH-mm'
  )}`;
  const generatedId = nanoid();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || defaultName,
      id: id || generatedId,
    },
  });

  const onSubmit = (data) => {
    const { id, name } = data;
    save({ id, name });
  };
  if (!chart) {
    return <div className="my-5">Please choose a chart type</div>;
  }

  return (
    <div className="bg-base-200 p-4 rounded-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Give a name to your chart and save it
          <div className="form-control">
            <label className="label">Chart name</label>
            <input type="hidden" {...register('id', { required: true })} />
            <input
              type="text"
              className="input w-full"
              placeholder="Chart name"
              // value={`${chart}chart-${dayjs(Date.now()).format(
              //   'YYYY-MM-DD_HH-mm'
              // )}`}
              {...register('name', { required: true })}
            />
            {errors['name'] && (
              <span className="bg-danger">This field is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChartSave;
