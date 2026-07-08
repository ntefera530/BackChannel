import { useState } from 'react';
import { useChats } from '../../contexts/ChatContext';
import CreateDmHeader from './CreateDmHeader';
import DmOptions from './DmOptions';

const CreateDmContainer = () => {
    return (
        <div className="flex-1 flex flex-col overflow-auto bg-base-100">
            <CreateDmHeader />
            <DmOptions />
        </div>
    );
};

export default CreateDmContainer;