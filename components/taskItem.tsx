import React, {FC} from "react";
import ChevronSVG from "@/svgs/chevronSVG";
import NewFileSVG from "@/svgs/newFileSVG";

type Props = {
  task:string,
  description:string,
  haveChild:boolean,
  isOpen:boolean,
  openModal:()=>void
}
const TaskItem:FC<Props> = ({task, description, haveChild, isOpen,openModal}) => {
  const chevronStyle = isOpen ? "-rotate-90" : "rotate-90"
  const clickHandler = (e:React.MouseEvent) =>{
    e.stopPropagation()
    openModal()
  }
  return (
        <div className={` py-3 px-5 bg-white rounded-lg shadow-sm flex justify-between items-center border-l-4 hover:shadow-md border-gray-200 hover:border-blue-600 ${haveChild?"cursor-pointer":""}`}>
        <div className="flex gap-4 items-center">
          <div className={`w-6 h-6 text-gray-500 transition-all duration-300 ${chevronStyle}`}>{haveChild &&
              <ChevronSVG/>}</div>
          <div>
            <div className="text-gray-800">{task}</div>
            <div className="text-gray-500">{description}</div>

          </div>
        </div>
        <div className="flex items-center gap-10">
          <button onClick={clickHandler} className="flex gap-2 items-center text-gray-500 border border-gray-200 rounded-lg py-2 px-3 md:py-2 md:px-4 hover:bg-gray-100 hover:text-blue-700">
            <div className="w-3 h-3 md:w-5 md:h-5"><NewFileSVG/></div>
            <div className="text-xs md:text-base">Add Sub Task</div>
          </button>
        </div>
      </div>
  )
}

export default TaskItem