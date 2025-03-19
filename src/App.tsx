import './App.css'
import { useState } from 'react'
import { Result } from './types/result'

function App() {
  const [targetSum, setTargetSum] = useState<number>(1)
  const [cageSize, setCageSize] = useState<number>(1)
  const [includedNumbers, setIncludedNumbers] = useState<number[]>([])
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([])
  const [results, setResults] = useState<Result[]>([])

  const solve = () => {
    const cageSums = getCageSums(
      cageSize,
      targetSum,
      includedNumbers,
      excludedNumbers
    )
    const results: Result[] = cageSums.map((values, index) => ({
      id: index + 1,
      values,
    }))
    setResults(results)
  }

  function getCageSums(
    size: number,
    targetSum: number,
    includedNumbers: number[],
    excludedNumbers: number[]
  ): number[][] {
    const results: number[][] = []

    function recurse(
      index: number,
      currentSum: number,
      partial: number[]
    ): void {
      if (currentSum === targetSum && partial.length === size) {
        if (
          includedNumbers.every((num) => partial.includes(num)) &&
          !excludedNumbers.some((num) => partial.includes(num))
        ) {
          results.push([...partial])
        }
        return
      }

      if (currentSum >= targetSum || partial.length > size || index > 9) {
        return
      }

      partial.push(index)
      recurse(index + 1, currentSum + index, partial)
      partial.pop()

      recurse(index + 1, currentSum, partial)
    }

    recurse(1, 0, [])

    return results
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
          <span key={`cageSize-${i}`}>
            <input
              type="radio"
              name="cageSize"
              value={i}
              checked={cageSize === i}
              onChange={() => setCageSize(i)}
            />
            {i}
          </span>
        )
      })}

      <br />

      <label htmlFor="includedNumbers">Included Numbers:</label>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => {
        return (
          <span key={`includedNumbers-${i}`}>
            <input
              type="checkbox"
              name="includedNumbers"
              value={i}
              onChange={() => {
                setIncludedNumbers((prev) =>
                  prev.includes(i)
                    ? prev.filter((num) => num !== i)
                    : [...prev, i]
                )
              }}
            />
            {i}
          </span>
        )
      })}

      <br />

      <label htmlFor="excludedNumbers">Excluded Numbers:</label>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => {
        return (
          <span key={`excludedNumbers-${i}`}>
            <input
              type="checkbox"
              name="excludedNumbers"
              value={i}
              onChange={() => {
                setExcludedNumbers((prev) =>
                  prev.includes(i)
                    ? prev.filter((num) => num !== i)
                    : [...prev, i]
                )
              }}
            />
            {i}
          </span>
        )
      })}

      <br />

      <button onClick={solve}>Show results</button>

      <h2>Results:</h2>
      <pre>
        {results.length === 0
          ? 'No possible combinations.'
          : results
              .map((result) => `${result.id}: ${result.values.join(', ')}`)
              .join('\n')}
      </pre>
    </>
  )
}

export default App
