import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { Routes, Route } from "react-router-dom";
import CaptionsList from "./components/CaptionsList";
import StepIndicator from "./utils/StepsIndicator";


function App() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <StepIndicator />
      </div>
      <Routes>
        <Route path="/" element={<SearchBar />}></Route>
        <Route path="/searchCaptions" element={<CaptionsList />}></Route>
      </Routes>
    </>
  );
}

export default App;
