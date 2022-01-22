import React from 'react';

function Icons(props) {
    const {name}=props;
    switch(name)
    {
        case 'circle':
            return <i className="fa fa-circle fa-7" style={{color:"blue"}}></i>
        case 'cross':
            return <i className="fa fa-times fa-7" style={{color:"red"}}></i>
        default:
            return <i className="fa fa-pencil fa-7"></i>   
    }
}

export default Icons;
