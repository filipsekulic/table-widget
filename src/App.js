import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';
import data from './dataSource.json';
import './App.css';

function App(props) {
    function positionIdTemplate(props) {
        return (
            <div className='position-id'>
                {props.PositionId}
            </div>
        )
    } 

    function positionFilledByTemplate(props) {
        return(
            <div className='status'>
                <div className={`status-${props.PositionFilledBy}`}>
                    {props.PositionFilledBy}
                </div>
            </div>
        )
    }

    const [filterCriteria, setFilterCriteria] = useState(null);

    useEffect(() => {
        const handleListen = (message) => {
            setFilterCriteria(message.selected);
        };
    
        const subscription = props?.config?.communicationService.subscribeTo("bar_chart_selection", handleListen);
 
        return () => {
            subscription.unsubscribe();
        }
      }, []);

      const filterData = (data, filterCriteria) => {
        if (!filterCriteria) {
            return data; // Return all data if no filterCriteria is set
        }
        return data.filter(item => item.PositionFilledBy === filterCriteria);
    };

    const filteredData = filterData(data, filterCriteria);

    return <GridComponent dataSource={filteredData} allowPaging={true} pageSettings={{ pageSize: 10 }} allowFiltering={true} filterSettings={{ type: 'Menu'}}>
        <ColumnsDirective>
            <ColumnDirective field='PositionId' width='30' textAlign="left" allowFiltering={false} template={positionIdTemplate}/>
            <ColumnDirective field='Description' width='70'/>
            <ColumnDirective field='PositionFilledBy' width='50' headerTextAlign="left" textAlign="center" template={positionFilledByTemplate}/>
            <ColumnDirective field='CreatedTimestamp' width='70' format="C2" textAlign="left"/>
            <ColumnDirective field='Region' width='40' textAlign="left"/>
            <ColumnDirective field='Operator' width='70'textAlign="left" />
        </ColumnsDirective>
        <Inject services={[Page, Filter]}/>
    </GridComponent>
};

export default App;