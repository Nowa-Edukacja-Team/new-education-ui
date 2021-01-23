import './styles.scss';

import React, { useState } from 'react';

import { useDetailTabs } from './hooks';
import { DetailTabs, Tab } from './types';
import TabHeader from './header/header';
import { useGridSelectionState } from '../management/hooks';

type NumberOrString = number | string;

interface Props {
    type: string;
    selectedRow: NumberOrString;
    tabs: Tab[];
    initialTab: Tab;
}

const TableDetails = (props: Props) => {
    const { type, selectedRow, tabs, initialTab } = props;
    const [ currentTab, setCurrentTab ] = useState(initialTab);

    return (
        <div className='detail-tabs-container d-flex flex-column w-100 h-100'>
            <div className='detail-tabs-headers h-20 d-flex flex-row'>
                { tabs.map((tab, i) => <TabHeader key={i} tab={tab} isSelected={currentTab.index === tab.index} onClick={setCurrentTab} />) }
            </div>
            <div className='detail-tabs-current flex-grow-1'>
                {
                    currentTab.render(type, selectedRow)
                }
            </div>
        </div>
    )
};

export const withSelection = (BaseComponent: React.ComponentType<Props>) => (props: DetailTabs) => {
    const { type, selectedRows } = useGridSelectionState();
    const [ tabs ] = useDetailTabs(props);

    if(selectedRows.length !== 1 || tabs.length < 0)
        return <div />

    return <TableDetails {...props} type={type} selectedRow={selectedRows[0]} tabs={tabs} initialTab={tabs[0]} />
}

export default withSelection(TableDetails);