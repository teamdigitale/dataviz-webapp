import { useEffect, useState } from "react";
import VerifyCode from "../../components/auth/VerifyCode";
import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import { activate } from "../../lib/api";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const { uid } = useParams();
  const [isValid, setResult] = useState(false);
  const [action, setAction] = useState("init");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // let code = searchParams.get("code");
    let action = searchParams.get("action");
    if (action) {
      setAction(action);
    }
  }, []);

  if (!uid) return <div>Error</div>;

  async function handleResult(result: boolean) {
    setResult(result);
    try {
      if (action === "init") {
        await activate();
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <div className='flex min-h-full flex-1'>
        <div>
          <VerifyCode
            uid={uid}
            onCheckDone={(result: boolean) => handleResult(result)}
          />
          {isValid && <div>The code is Valid.</div>}
          {isValid && action === "reset" && <div>ChangePassword</div>}
        </div>
      </div>
    </Layout>
  );
}

export default AuthPage;
