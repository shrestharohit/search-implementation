import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./Home";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
};

export default App;
