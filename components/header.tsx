import React, {FC, useState} from "react";

type Props = {
  openModal:()=>void
}
const Header:FC<Props> = ({openModal}) => {
  return (
      <header className="flex items-center justify-between mt-6 mb-10">
        <h1 className="font-extrabold text-2xl text-gray-900 ">SternX Task Lists </h1>
        <div className="bg-blue-600 text-white py-3 px-12 rounded-lg cursor-pointer hover:bg-blue-700" onClick={openModal}>Add Task</div>
      </header>
  )
}

export default Header