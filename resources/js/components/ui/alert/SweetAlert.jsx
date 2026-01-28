import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

export default function SweetAlert() {
    const [swalProps, setSwalProps] = useState({});

    function handleClick() {
        setSwalProps({
            show: true,
            title: "Example",
            text: "Hello World",
        });
    }

    return (
        <div>
            <button onClick={handleClick}>Alert</button>
            <SweetAlert2
                {...swalProps}
                didOpen={() => {
                    // run when swal is opened...
                }}
                didClose={() => {
                    // run when swal is closed...
                }}
                onConfirm={(result) => {
                    // run when clieked in confirm and promise is resolved...
                }}
                onError={(error) => {
                    // run when promise rejected...
                }}
                onResolve={(result) => {
                    // run when promise is resolved...
                }}
            />
        </div>
    );
}
