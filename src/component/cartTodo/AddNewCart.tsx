import React from 'react';
import { Check } from "../../app/icons/Check";
import { Cicle } from "../../app/icons/Cicle";
import { typeAddNew } from "../main/Main";

type AddNewCartProps = {
    addNew: typeAddNew[];
    setChangeImage: (value: boolean) => void;
    changeImage: boolean;
};

export const AddNewCart = ({ addNew, setChangeImage, changeImage }: AddNewCartProps) => {
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
                            <div onMouseEnter={() => setChangeImage(true)} onMouseLeave={() => setChangeImage(false)}>
                                {changeImage ? <Check color="currentColor" /> : <Cicle />}
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
