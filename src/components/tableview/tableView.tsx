import React from 'react';
import { useParams } from 'react-router-dom';

interface OwnTableViewProps {

}

type TableViewProps = OwnTableViewProps & any;

const TableView = (props: TableViewProps) => {
    const params = useParams();
    return (
        <div className='w-100 h-100'>
            <p>Params:</p>
            <pre>
                {JSON.stringify(params, null, 2)}
            </pre>
        </div>
    )
};

export default TableView;