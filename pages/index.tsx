import Head from 'next/head'
import ItemsContainer from "@/components/itemsContainer";
import React, {useState} from "react";
import Header from "@/components/header";
import {createPortal} from "react-dom";
import Modal from "@/components/ui/modal";
import AddModal from "@/components/addModal";
import {v4 as uuidv4} from 'uuid';

const data = [
  {
    id: 1,
    parentId: null,
    title: 'Task1',
    description: 'Description',
  },
  {
    id: 2,
    parentId: 3,
    title: 'Task2',
    description: 'Description2',
  },
  {
    id: 3,
    parentId: 1,
    title: 'Task3',
    description: 'Description3',
  },
  {
    id: 4,
    parentId: 3,
    title: 'Task4',
    description: 'Description4',
  },
  {

    id: 5,
    parentId: 3,
    title: 'Task5',
    description: 'Description5',
  },
  {
    id: 6,
    parentId: null,
    title: 'Task6',
    description: 'Description6',
  },
  {
    id: 7,
    parentId: 5,
    title: 'Task7',
    description: 'Description7',
  },
  {
    id: 8,
    parentId: 7,
    title: 'Task8',
    description: 'Description8',
  },
];

export type Data = {
  title: string
  description: string
  id: number
  parentId: null | number
}
export default function Home() {
  const [tasks, setTasks] = useState<Array<Data>>(data)
  const [openList, setOpen] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [parent, setParent] = useState<null | number>(null)
  //Toggle Items visibility
  const toggleHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation()
    const visibleIndex = openList.findIndex(item => item === id)
    if (visibleIndex === -1) {
      setOpen(prev => [...prev, id])
    } else {
      let newArr = [...openList]
      newArr.splice(visibleIndex, 1)
      setOpen(newArr)
    }
  }
  //Add Tasks
  const addHandler = (id: null | number, data: { title: string, description: string }) => {
    setTasks(prev => [...prev, {
      ...data,
      id: prev[prev.length - 1].id + 1,
      parentId: id
    }])
    setOpenModal(false)
    setParent(null)
  }
  //Toggling Modal
  const openModalHandler = (id = null) => {
    setOpenModal(prev => !prev);
    setParent(id)
  }
  return (
      <>
        <Head>
          <title>Nested Tasks</title>
          <meta name="description" content="Generated by create next app"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main className="bg-gray-200 min-h-screen p-5">
          <section className="container mx-auto">
          <Header openModal={()=>openModalHandler(null)}/>
          <ItemsContainer data={tasks} parentId={null} toggleHandler={toggleHandler} visibleItems={openList} openModal={openModalHandler}/>
          </section>

          {openModal && createPortal(
              <Modal closeHandler={()=>openModalHandler(null)}>
                <AddModal addHandler={(data) => addHandler(parent, data)}/>
              </Modal>
              , document.body)}
        </main>
      </>
  )
}
