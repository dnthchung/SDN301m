import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Count } from "./Count";

//custom type
/**
 * Intersection sẽ được dùng khi bạn muốn kết hợp CÁC type khác nhau lại với nhau để tạo ra type mới
 * - ở type mới như Employee, nó sẽ kế thừa tất cả các thuộc tính của People và thêm các thuộc tính mới
 */
type People = {
  name: string;
  age: number;
  location?: string; //- optional
};
type Relationship = {
  sonName: string;
  daughterName: string;
};

type Employee = People &
  Relationship & {
    jobTitle: string;
    degree: string;
  };
//============================================= ENUM =================================================
/**Có thể gán giá trị cho enum, nhưng nên thống nhất, 1 là gán hết 2 là đ gán ok */
enum Degree {
  BSc,
  MSc,
  PhD = "PhD",
}
//================================================================================================
interface IPeople {
  name: string;
  age: number;
  location?: string; //- optional
}

interface IRelationship {
  sonName: string;
  daughterName: string;
}

interface IEmployee extends IPeople, IRelationship {
  jobTitle: string;
  degree: Degree;
  level?: number | string | Degree; //- optional
}

//============================================= GENERIC TYPE =================================================
// type ApiResponse = {
//   data: {
//     id: number;
//     name: string;
//   };
//   status: "success" | "failure";
// };

// type BookResponse = {
//   data: {
//     id: number;
//     bookName: string;
//   };
//   status: "success" | "failure";
// };
type ApiResponse<DataTypeNe> = {
  data: DataTypeNe;
  status: "success" | "failure";
};

function App() {
  const [count, setCount] = useState<number>(0);
  const [people, setPeople] = useState<People>();

  //Generic type
  //code lặp lại nhiều lần
  // const userResponse: ApiResponse = {
  //   data: {
  //     id: 1,
  //     name: "John Doe",
  //   },
  //   status: "success",
  // };

  // const bookResponse: BookResponse = {
  //   data: {
  //     id: 1,
  //     bookName: "React Note Book",
  //   },
  //   status: "success",
  // };

  //giải pháp
  const userResponse: ApiResponse<{ id: number; name: string }> = {
    data: {
      id: 1,
      name: "John Doe",
    },
    status: "success",
  };
  const bookResponse: ApiResponse<{ id: number; bookName: string }> = {
    data: {
      id: 1,
      bookName: "React Note Book",
    },
    status: "success",
  };

  //type
  const employee1: Employee = {
    name: "John Doe",
    age: 25,
    location: "Nigeria",
    jobTitle: "Software Engineer",
    degree: "BSc",
    sonName: "John Doe Jr",
    daughterName: "Jane Doe",
  };

  //interface
  const employee2: IEmployee = {
    name: "John Doe",
    age: 25,
    location: "Nigeria",
    jobTitle: "Software Engineer",
    degree: Degree.BSc, // trả về số thứ tự của enum - ý là trả về cái index của th cu BSc này trong enum ở index mấy,
    sonName: "John Doe Jr",
    daughterName: "Jane Doe",
  };

  //typeof keyword
  const employee3: typeof employee1 = {
    name: "John Doe",
    age: 25,
    location: "Nigeria",
    jobTitle: "Software Engineer",
    degree: "BSc",
    sonName: "John Doe Jr",
    daughterName: "Jane Doe",
  };

  function total(num1: number, num2: number): string {
    return String(num1 + num2);
  }

  useEffect(() => {
    setPeople({
      name: "John Doe",
      age: 25,
      // location: "Nigeria",
    });
  }, []);

  console.log("people : ", people);
  console.log("employee1 : ", employee1);
  console.log("employee2 : ", employee2);
  console.log("employee3 : ", employee3);
  console.log("userResponse : ", userResponse);
  console.log("bookResponse : ", bookResponse);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Count count={count} setCount={setCount} total={total} />

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
