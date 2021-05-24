import React from 'react';
import Header from "@c/Header";
import PitchBlock from "@c/PitchBlock";


const PitchPage = () => {

    return(
        <div className="container">
            <Header/>
            <main>
               <PitchBlock />
            </main>
        </div>
    )
}

export default PitchPage;