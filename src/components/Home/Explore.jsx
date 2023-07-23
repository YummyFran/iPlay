import React from 'react'
import { collection, query, where, getDoc } from "firebase/firestore";
import { db } from '../../utils/firebase';

const Explore = () => {

    return (
        <div className='explore'>
            <div className="explore--head">
                <h1>Explore</h1>
                <span>Enable GPS to explore more</span>
            </div>
            <div className="explore--list">
                <div className="explore--user">
                    <div className="profile">
                        <div className="display-picture"></div>
                        <div className="display-name">
                            <h3>Name Here</h3>
                            <span>User's custom bio here</span>
                        </div>
                    </div>
                    <div className="status">Status</div>
                </div>
                <div className="explore--user">
                    <div className="profile">
                        <div className="display-picture"></div>
                        <div className="display-name">
                            <h3>Name Here</h3>
                            <span>This user is new</span>
                        </div>
                    </div>
                    <div className="status">In Voice Room</div>
                </div>
            </div>
        </div>
    )
}

export default Explore