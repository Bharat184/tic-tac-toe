import React from 'react';

function Icons(props) {
    const {name}=props;
    switch(name)
    {
        case 'circle':
            return <i className="fa fa-circle fa-7x" style={{color:"blue"}}></i>
        case 'cross':
            return <i className="fa fa-times fa-7x" style={{color:"red"}}></i>
        default:
            return <i className="fa fa-pencil fa-7x"></i>   
    }
}

export default Icons;
