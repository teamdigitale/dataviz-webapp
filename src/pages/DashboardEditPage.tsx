import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/layout";
import Loading from "../components/layout/Loading";
import * as api from "../lib/dashaboard-api";

function DashboardEditPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`${id}`, api.findById);
  return (
    <Layout>
      <div>
        <Link to={"/dashboards"}>Torna alla lista</Link>
      </div>
      <div className="">
        {isLoading && <Loading />}
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        )}
        {data && JSON.stringify(data)}
      </div>
    </Layout>
  );
}

export default DashboardEditPage;
