import React from 'react';
import { Check } from "../../app/icons/Check";
import { Cicle } from "../../app/icons/Cicle";
import { typeAddNew } from "../main/Main";

type AddNewCartProps = {
    addNew: typeAddNew[];
    setChangeImage: (value: boolean) => void;
    toggleTaskCompleted: (taskId: string | number) => void;
};

export const AddNewCart = ({ addNew, setChangeImage,toggleTaskCompleted }: AddNewCartProps) => {
    return (
        <div style={{width:'200px'}}>
            {addNew.map((item: typeAddNew) => (
                <div key={item.id}>
                    <div
                        style={{
                            display: 'flex',
                            gap: 5,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-center',
                            marginLeft: 3,
                            marginBottom:20

                        }}
                    >
                            <div style={{width: 35}} onClick={() => toggleTaskCompleted(item.id)} onMouseEnter={() => setChangeImage(true)} onMouseLeave={() => setChangeImage(false)}>
                                {item.completed ? <Check color="currentColor" /> : <Cicle />}
                            </div>
                        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start',gap:10, width:'80%' }}>
                            <div>  {item.title}</div>
                            <div style={{marginLeft: 5, fontSize: 14}}>{item.description}</div>
                        </div>

                    </div>

                </div>
            ))}
        </div>
    );
};
