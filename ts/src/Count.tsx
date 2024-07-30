import React from "react";

/**
 * 2 ways to define props
 * - using interface without "="
 * - using type with "=" - custom type
 *
 * const Count = ({ count, setCount }: { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }) => {
 */
// interface ICountProps {
//   count: number;
//   setCount: React.Dispatch<React.SetStateAction<number>>;
// }
type CountProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  total: (num1: number, num2: number) => string;
};

export const Count = ({ count, setCount, total }: CountProps) => {
  console.log(total(1, 2));
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
};
