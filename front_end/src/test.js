import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
const Test = (props) => {  
// render() {
    return (
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
        >
            <TextValidator
                onChange={this.handleChange}
                name="email"
                // value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <button type="submit">submit</button>
        </ValidatorForm>
    );
// }
}
export default Test;