import React from "react";
import '../styles.css'

class AddOptionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
       formValues: [{ optionDesc: "" }]
     };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.optionDesc] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState(({
      formValues: [...this.state.formValues, { optionDesc: "" }]
    }))
  }

  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(this.state.formValues));
  }

  render() {

    return (
        <form  onSubmit={this.handleSubmit}>
          {this.state.formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Options</label>
              <input type="text" optionDesc="optionDesc" value={element.optionDesc || ""} onChange={e => this.handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    );
  }
}
export default AddOptionComponent;