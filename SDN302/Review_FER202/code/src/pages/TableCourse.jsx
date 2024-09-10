// import React from "react";

// const TableCourse = ({courses}) => {
//   return (
//     <>
//       {/* Course Table */}
//       <div>
//         <h1 className="text-2xl font-bold mt-8 mb-4">Danh sách khóa học</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">ID</th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">Title</th>
//                 <th className="px-4 py-2 text-left text-gray-700 font-semibold">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course.id} className="odd:bg-white even:bg-gray-50">
//                   <td className="px-4 py-2 border-t">{course.id}</td>
//                   <td className="px-4 py-2 border-t">{course.title}</td>
//                   <td className="px-4 py-2 border-t">{course.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TableCourse;
