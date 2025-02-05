import React, {useState} from 'react';
import styles from './Main.module.css'
import smile from '../../app/icons/smileFirst.svg'
import point from '../../app/icons/points.svg'
import {AddIcon} from "../../app/icons/AddIcon";
import edit from '../../app/icons/edit.svg'
import swap from '../../app/icons/swap_vert.svg'
import deletes from '../../app/icons/delete.svg'
import duplicate from '../../app/icons/dublicate.svg'
import {v1} from "uuid";
import {Dropdown} from "../dropList/DropdownProvider";
import {Cicle} from "../../app/icons/Cicle";
import {Check} from "../../app/icons/Check";
import {Attach} from "../../app/icons/Attach";
import {Calendar} from "../../app/icons/Calendar";
import {Send} from "../../app/icons/Send";
import {LabelIcon} from "../../app/icons/LabelIcon";


type typeAddNew = {
    id: string,
    title: string,
    details: string,
    image: any,
}

export const Main = () => {

    const [data] = useState([
        {id: 1, title: 'My Tasks', description: '', status: ''}
    ]);

    const [open, setOpen] = useState(false);
    const [changeImage, setChangeImage] = useState(false);

    const openHandler = () => {
        setOpen(true);
    }


    const dropdownItems = [
        {id: 1, label: 'Custom order', onClick: () => console.log('Custom order'), icon: swap},
        {id: 2, label: 'Due date', onClick: () => console.log('Due date')},
        {id: 3, label: 'Alphabetical', onClick: () => console.log('Alphabetical')},
        {id: 4, label: 'Last updated', onClick: () => console.log('Last updated')},
        {id: 5, label: 'Duplicate list', onClick: () => console.log('Duplicate'), icon: duplicate},
        {id: 6, label: 'Rename list', onClick: () => console.log('Rename'), icon: edit},
        {id: 7, label: 'Delete list', onClick: () => console.log('Delete'), icon: deletes},
        // Добавляйте остальные пункты меню по необходимости
    ];

    const [addNew, setAddNew] = useState<typeAddNew[]>([]);
    const [valueTitle, setValueTitle] = useState('');
    const [valueDetails, setValueDetails] = useState('');

    const valueTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueTitle(event.target.value);
    }
    const valueDetailsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueDetails(event.target.value);
    }

    const addNewHandler = () => {
        setAddNew([...addNew, {title: valueTitle, details: valueDetails, id: v1(), image: <Cicle/>}]);
        setValueDetails('')
        setValueTitle('')
        setOpen(false);
    }
    console.log(addNew)
    return (
        <div className={styles.containerMain}>
            <div className={styles.containerSmile}>
                <h3 className={styles.titleBoard}>
                    Main Board
                </h3>
                <img className={styles.imgSmile} src={smile} alt="Smile"/>
            </div>
            <div className={styles.containerMap}>
                {data.map((item, id) => (
                    <div key={id} className={styles.containerTask}>
                        <div className={styles.titleAndPoint}>
                            <div className={styles.titleTask}>
                                {item.title}
                            </div>

                            <Dropdown
                                top={-12}
                                items={dropdownItems}
                                trigger={<div style={{cursor: 'pointer'}}>
                                    <img style={{cursor: 'pointer'}} src={point} alt="point"/>
                                </div>}
                                position="left"
                            />
                        </div>
                        <div className={styles.addTaskContainer}>
                            <div className={`${styles.addIcon} addIcon`}>
                                <AddIcon color={'currentColor'} width={'20'}/>
                            </div>
                            <div>

                            </div>
                            <div onClick={openHandler} className={styles.colorSpanTask}>
                                Add Task
                            </div>
                        </div>
                        {open && <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                            <div className={styles.openStyle}>
                                <div className={`${styles.addIcon} addIcon`}
                                     onMouseEnter={() => setChangeImage(true)}
                                     onMouseLeave={() => setChangeImage(false)}
                                >
                                    {changeImage ? <Check color={'currentColor'}/> : <Cicle/>}

                                </div>
                                <div className={styles.containerInput}>
                                    <input className={styles.inputStyle} value={valueTitle}
                                           onChange={valueTitleHandler} placeholder={'Title'}/>
                                    <input className={styles.inputStyle} value={valueDetails}
                                           onChange={valueDetailsHandler} placeholder={'Details'}/>
                                </div>
                            </div>

                            <div style={{display: 'flex', width: '100%', gap: 20, justifyContent: 'flex-start', height: 20, alignItems: 'center', marginLeft: 40}}>
                                <Calendar/>
                                <LabelIcon/>
                                <Attach/>
                                <div style={{display:'flex', alignItems: 'center', height:20}}>
                                    {valueTitle.length !== 0 && <div style={{width: '20%'}} onClick={addNewHandler}>
                                        <Send/>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        }

                        <div>
                            {addNew.map((item) => (
                                <div key={item.id}>
                                    <div style={{display: 'flex', flexDirection: 'column',gap:5, justifyContent: 'center', alignItems: 'start',marginLeft:3}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                                            <div   onMouseEnter={() => setChangeImage(true)}
                                                   onMouseLeave={() => setChangeImage(false)}>
                                                {changeImage ? <Check color="currentColor" /> : <Cicle />}
                                            </div>
                                            {item.title}
                                        </div>
                                        <div style={{marginLeft: 40,fontSize: 14, }}>
                                            {item.details}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                ))}

            </div>
        </div>
    );
};

