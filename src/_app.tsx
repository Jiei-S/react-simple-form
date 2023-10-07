import "./App.css";
import Form from "./components";
import useStore, { initUser } from "./hooks/store";

function App() {
  const { user } = useStore();
  return <Form data={user?.id ? user : initUser} />;
}

export default App;
