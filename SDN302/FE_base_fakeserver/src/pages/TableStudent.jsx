// import React from "react";

// const TableStudent = ({ students }) => {
//   return (
//     <div>
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Danh sách học viên</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                   ID
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                   Name
//                 </th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                   Email
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student.id} className="odd:bg-white even:bg-gray-50">
//                   <td className="px-4 py-2 border-t">{student.id}</td>
//                   <td className="px-4 py-2 border-t">{student.name}</td>
//                   <td className="px-4 py-2 border-t">{student.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableStudent;
