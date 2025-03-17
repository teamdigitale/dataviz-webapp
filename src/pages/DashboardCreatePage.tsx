import { Link } from "react-router-dom";
import Layout from "../components/layout";

function DashboardCreatePage() {
  return (
    <Layout>
      <div>
        <Link to={"/dashboards"}>Torna alla lista</Link>
      </div>
      <div className="">
        <h1>Create page</h1>
      </div>
    </Layout>
  );
}

export default DashboardCreatePage;
