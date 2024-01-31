"use client";

import React, {FormEventHandler, useState} from 'react';
import { ITask } from "@/types/tasks"
import { RiEditLine } from "react-icons/ri";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import Modal from "./Modal";
import router from '@/node_modules/next/router';
import { useRouter } from '@/node_modules/next/navigation';
import { deleteTodo, editTodo } from '@/api';


interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)


  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    })
    // setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh()

  }


    return (
    <tr key={task.id}>
        
    <td className="w-full">{task.text}</td>
    
    <td className= 'flex gap-5'>
    <RiEditLine onClick ={()=> setOpenModalEdit(true)} cursor="pointer" className="text-blue-600" size = {20} />


          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className="font-bold text-large">Edit task</h3>
          <div className="modal-action">
          <input value= {taskToEdit}
          onChange={e =>setTaskToEdit(e.target.value)}
          type="text" placeholder="Type here" className="input input-bordered w-full" />
          <button type="submit" className="btn">Submit</button>

          </div>
        </form>
      </Modal>
    
    
    <PiTrashSimpleDuotone onClick ={() => setOpenModalDeleted(true)} cursor="pointer" className="text-red-600" size = {20} />

    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
      <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
      <div className='modal-action'>
        <button 
        onClick={()=> handleDeleteTask(task.id)}
        className= 'btn'>
          Yes
        </button>
        </div>        
      </Modal>


    </td>
  </tr>

  )
}

export default Task