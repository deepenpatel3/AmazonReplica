import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';


class AdminSellers extends Component{
    constructor(props){
        super(props);
        this.state={
            profiles:[],
            paginated_profiles:[],
            status:[],
            inc:[],
            results_per_page:3,
            page_num:0,
            sellers : [],
            particularSellerProducts:[]
        }

        this.handlePageClick= this.handlePageClick.bind(this);
    }

    handlePageClick(data){
        console.log(data.selected);
        var page_number= data.selected;
        var offset= Math.ceil(page_number * this.state.results_per_page)
        this.setState({
            paginated_profiles: this.state.profiles.slice(offset, offset+this.state.results_per_page)
        })
    }


    selectSeller = (event) => {
        console.log("Seller id is: ",event.target.id)
        Axios.defaults.withCredentials = true;
        const data = {
            sellerID:event.target.id
        }
        Axios.post("http://localhost:3001/admin/seller",data)
            .then(response => {
                console.log("After getting particular seller: ",response.data)
                if(response.status === 200){
                    let particularSeller = response.data[0]
                    this.setState({
                        particularSellerProducts:particularSeller["Products"]
                    }, () => {
                        console.log("Products size is: ",this.state.particularSellerProducts.length)
                    })
                }
            })
    }

    async componentDidMount(){

        Axios.post("http://localhost:3001/admin/seller")
            .then( response => {
                console.log(response.data)
                if(response.status === 200){
                    this.setState({
                        sellers : response.data
                    })
                }
            })
        // const getProfileDetails= await fetch('http://localhost:3001/admin/seller',{
        //     method: "POST",
        //     headers: {'Authorization': "" + localStorage.getItem("_id")}
        // }) 
        // const getProfiles = await getProfilesDetails.json();
        // // for pagination
        // const all_profiles = getProfiles.profiles_array
        // const pages = Math.ceil(all_profiles.length/this.state.results_per_page)
        // this.setState({
        //     profiles : all_profiles,
        //     //inc:inc,
        //     pages_num:pages,
        //     paginated_profiles: all_profiles.slice(0,this.state.results_per_page),
        // });

        // console.log("")
        // this.setState({
        //     profiles : getProfiles.profiles_array
        // });
        // var status={},inc={};
        // this.setState({status:status,inc:inc})     
    }

    render(){
        // let allProfiles
        // if(this.state.sellers){
        //     allProfiles = this.state.sellers.map(seller => {
        //         (
        //             <td>Name: seller.Name</td>
        //             <td>Id: seller._id</td>
        //         )
        //     })
        // }
        // if(this.state.profiles.length > 0){
        //     allProfiles = this.state.paginated_profiles.map(profile => {      
        //         console.log(profile);
        //     }
        // }
            return(
            <div>
                <Navbar/>
                <form class="form-inline my-2 my-lg-1" style={{ marginLeft: "35%"}}>
                <div className="form-group">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search Sellers</button>
                </div>
                </form>
                {/* {allProfiles} */}
                <div className="text-center">
                <table>
                    <th>Name of Seller</th>
                    {this.state.sellers.map(seller => (
                        <tr>
                            <td>
                                <a href="#" id={seller._id} onClick={this.selectSeller}>{seller.Name}</a>
                            </td>
                        </tr>
                    ))}
               
                <div className="row">
                    <ReactPaginate
                        previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pages_num}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                    />
                </div>
                </table>
                </div>

            </div>
        )
    }
}

export default AdminSellers;