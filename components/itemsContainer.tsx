import React, {FC} from "react";
import TaskItem from "@/components/taskItem";
import {Data} from "@/pages";


type Props = {
  data: Data[]
  parentId: number | null
  toggleHandler: (e: React.MouseEvent<HTMLElement>, id: number) => void
  visibleItems: number[]
  openModal:(id:number|null)=>void
}
const ItemsContainer: FC<Props> = ({data, parentId, toggleHandler, visibleItems,openModal}) => {

  return (
      <>
        {data.filter(filterItem => filterItem.parentId === parentId).map((item, index) => {
              const isOpen = visibleItems.find(value => value === item.id)
              const style = ( isOpen ? "max-h-[1000px]" : "max-h-[80px]") + " overflow-hidden transition-all duration-300"
              return (
                  <section key={"TASK_ITEM" + item.id} className={style}
                           onClick={(e) => toggleHandler(e, item.id)}>
                    <TaskItem task={item.title}
                              description={item.description}
                              isOpen={!!isOpen}
                              openModal={()=>openModal(item.id)}
                              haveChild={data.filter(childItem => childItem.parentId === item.id).length > 0}
                    />
                    <section className=" pl-4 my-2">
                      <ItemsContainer data={data} parentId={item.id} visibleItems={visibleItems}
                                      toggleHandler={toggleHandler} openModal={openModal}/>
                    </section>
                  </section>
              )
            }
        )}
      </>
  )
}


export default ItemsContainer