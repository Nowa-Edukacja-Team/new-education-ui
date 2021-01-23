import './styles.scss';

const TableTitle = ({title}: {title: string}) => {
    return (
        <div className='title-container'>
            <p id="title">{title}</p>
        </div>
    );
};

export default TableTitle;