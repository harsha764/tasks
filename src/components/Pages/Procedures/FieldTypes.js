import React from 'react';
import {FormGroup, Input } from 'reactstrap';

const Fieldtype = (props) => {
    switch(props.type) {
        case 'text':
            return(
                <FormGroup className="d-inline-block">
                    <h4 htmlFor={props.label}>{props.label}</h4>
                    <Input disabled type={props.type} name={props.label} id={props.label} placeholder={props.label} value={props.value} onChange={props.func}/>
                </FormGroup>
            );
        case 'textarea' :
            return(
                <FormGroup className="d-inline-block">
                    <h4 htmlFor={props.label}>{props.label}</h4>
                    <Input disabled type="textarea" name={props.label} id={props.label} value={props.value} onChange={props.func} />
                </FormGroup>
            );
        case 'radio' :
                return(
                    <FormGroup className="d-inline-block">
                        <h4>{props.label}</h4>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={props.label} id="inlineRadio2" value="Yes" />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={props.label} id="inlineRadio3" value="No" />
                            <label className="form-check-label">No</label>
                        </div>
                    </FormGroup>
                );     
        default:
          return 'foo';
      }
}
export default Fieldtype;