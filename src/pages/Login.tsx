import React from "react";

export default function Login(){
    return(
        <div>
            <form className="d-flex flex-column align-items-center">
                <div className="mb-3 ms-3 w-25">
                    <label htmlFor="exampleInputUsername" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputUsername"
                        
                    />
                </div>
                <div className="mb-3 ms-3 w-25">
                    <label htmlFor="exampleInputPassword" className="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword"
                        
                    />
                </div>
            </form>
        </div>
    )
}