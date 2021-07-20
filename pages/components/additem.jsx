import { zip } from "lodash";
import React from "react";
import { connect } from "react-redux";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: [{ itemWeight: '', itemPrice: '' }],
      addressDetails: [{city: "", country: "", street1: "", street2: ""}],
      zip:"",
      loading: true,
      edit: false,
      
    }
  }

  render() {
    
    const weightHandler = (number, index) => {
        let temp = this.state.itemDetails;
        temp[index].itemWeight = number
        this.setState({ itemDetails: temp })
    }

    const inputEvent = (event) => {
        const { name, value } = event.target;
    
        setAddressDetails((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
            
          }
        })
    }

    // setAddressDetails((prevValue) => {
    //     return {
    //       ...prevValue,
    //       [name]: value,
          
    //     }
    // })

    const priceHandler = (number, index) => {
        let temp = this.state.itemDetails;
        temp[index].itemPrice = number
        this.setState({ itemDetails: temp })
    }
    
    const newinput = () => {
      let temp = this.state.addressDetails
    //   temp.push({ itemWeight: '', itemPrice: '' })
    //   this.setState({ addressDetails: temp })
    }
    const deleteinput = () => {
      let temp = this.state.addressDetails
    //   temp.pop()
    //   this.setState({ addressDetails: temp })
    }

    return (
        <>
            {
                        
                this.state.addressDetails.map((addressDetails, index) =>
                    <div key={index} class="form-group col-md-12 d-flex flex-wrap m-auto">
                        <div class="form-group col-md-6">
                            <label>Street 1</label>
                            <input type="text" name="street1"  value={this.props.street1} placeholder="Enter Street 1"  class="form-control" 
                            onChange={this.props.onChangeEvent}></input>
                        </div>
                        <div class="form-group col-md-6" style={{ flexDirection: 'row' }}>
                            <label>Street 2</label>
                            <input type="text" name="street2"  value={this.props.street2} placeholder="Enter Street 2"  class="form-control"
                            onChange={this.props.onChangeEvent}
                            ></input>
                        </div>
                        {/* <div className="new-input-style col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.edit==false?
                                <button onClick={newinput} className="btn btn-primary" >
                                    add
                                    
                                </button>:null}
                            {this.state.edit==false?
                                index !== 0 &&
                                <button onClick={deleteinput} className="btn btn-danger mx-3" >Delete</button>:null
                                
                            }
                        </div> */}
                        <div class="form-group col-md-4" style={{ flexDirection: 'row' }}>
                            <label>City</label>
                            <input type="text" name="city"  value={this.props.city} placeholder="Enter City"  class="form-control"
                                onChange={this.props.onChangeEvent}
                            ></input>
                        </div>
                        <div class="form-group col-md-4" style={{ flexDirection: 'row' }}>
                            <label>Country</label>
                            <input type="text" name="country"  value={this.props.country} placeholder="Enter Country"  class="form-control"
                                onChange={this.props.onChangeEvent}
                            ></input>
                        </div>
                        <div class="form-group col-md-4" style={{ flexDirection: 'row' }}>
                            <label>Zip</label>
                            <input type="text" name="zip"  value={this.props.zip} placeholder="Enter Zip code"  class="form-control"
                                onChange={this.props.onChangeEvent}
                            ></input>
                        </div>
                    </div>
                )
            }
        </>
    )

  }
}

const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(set_loading(bol)),
    _getItems: () => dispatch(_getItems()),
  }
}
export default connect(mapDispatch)(AddItem)
