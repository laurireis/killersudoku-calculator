import "./App.css";
import { useState } from "react";

interface Result {
  id: number;
  values: number[];
}

function App() {
  const [targetSum, setTargetSum] = useState<number>(1);
  const [cageSize, setCageSize] = useState<number>(1);
  const [results, setResults] = useState<Result[]>([]);

  const solve = () => {
    const cageSums = getCageSums(cageSize, targetSum);
    const results: Result[] = cageSums.map((values, index) => ({
      id: index + 1,
      values,
    }));
    setResults(results);
  };

  function getCageSums(size: number, targetSum: number): number[][] {
    const results: number[][] = [];

    function recurse(
      index: number,
      currentSum: number,
      partial: number[]
    ): void {
      if (currentSum === targetSum && partial.length === size) {
        results.push([...partial]);
        return;
      }

      if (currentSum >= targetSum || partial.length > size || index > 9) {
        return;
      }

      partial.push(index);
      recurse(index + 1, currentSum + index, partial);
      partial.pop();

      recurse(index + 1, currentSum, partial);
    }

    recurse(1, 0, []);

    return results;
  }

  return (
    <>
      <h1>Killer Sudoku Calculator</h1>

      <label htmlFor="targetSum">Target Sum:</label>
      <input
        type="number"
        id="targetSum"
        min={1}
        max={45}
        value={targetSum}
        onChange={(e) => setTargetSum(parseInt(e.target.value, 10))}
      />

      <br />

      <label htmlFor="cageSize">Cage Size:</label>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => {
        return (
          <>
            <input
              type="radio"
              name="cageSize"
              value={i}
              checked={cageSize === i}
              onChange={() => setCageSize(i)}
            />
            {i}
          </>
        );
      })}

      <br />

      <button onClick={solve}>Show results</button>

      <h2>Results:</h2>
      <pre>
        {results.length === 0
          ? "No possible combinations."
          : results
              .map((result) => `${result.id}: ${result.values.join(", ")}`)
              .join("\n")}
      </pre>
    </>
  );
}

export default App;
