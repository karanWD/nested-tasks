import React, {FC, useState} from "react";

type Props = {
  addHandler:(data:{title:string,description:string})=>void
}
const AddModal:FC<Props> = ({addHandler}) =>{
  const [formData,setData]=useState({title:"",description:""})
  const changeHandler = (key:string,value:string) =>{
    setData(prev=>({...prev,[key]:value}))
  }
  const submitHandler = (e:React.FormEvent|React.MouseEvent) =>{
    e.preventDefault()
    if (formData.title && formData.description){
      addHandler(formData)
    }else{
      alert("Title and Description is required, please fill them.")
    }
  }

  return(
      <div className="w-[30vw] rounded-lg bg-white text-gray-800 p-6">
        <h1 className="font-bold mb-5">Add Task</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
          <label className="block mb-1" htmlFor="">Title</label>
          <input className="block bg-gray-200 w-full p-3" type="text" value={formData.title} onChange={(e)=>changeHandler("title",e.target.value)}/>
          </div>
          <div>
          <label className="block mb-1" htmlFor="">Description</label>
          <input className="block bg-gray-200 w-full p-3" type="text" value={formData.description} onChange={(e)=>changeHandler("description",e.target.value)}/>
          </div>
          <button className="mt-5 bg-blue-600 text-white rounded-lg py-4 cursor-pointer hover:bg-blue-700" onClick={submitHandler}>Add Task</button>
        </form>
      </div>
  )
}

export default AddModal