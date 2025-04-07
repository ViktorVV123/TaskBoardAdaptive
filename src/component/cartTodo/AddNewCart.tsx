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
        <div>
            {addNew.map((item: typeAddNew) => (
                <div key={item.id}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: 3,
                            marginBottom:20
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                            <div onClick={() => toggleTaskCompleted(item.id)} onMouseEnter={() => setChangeImage(true)} onMouseLeave={() => setChangeImage(false)}>
                                {item.completed ? <Check color="currentColor" /> : <Cicle />}
                            </div>
                            {item.title}
                        </div>
                        <div style={{ marginLeft: 40, fontSize: 14 }}>{item.description}</div>
                    </div>

                </div>
            ))}
        </div>
    );
};
